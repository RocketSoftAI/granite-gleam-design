import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ============================================
// GOOGLE ANALYTICS 4 & GTM CONFIGURATION
// ============================================
const GA_MEASUREMENT_ID = 'G-8DEGJZ27W5';
const GTM_ID = 'GTM-TR62NWS4';

// Validation regex for tracking IDs to prevent XSS if IDs ever become configurable
const TRACKING_ID_REGEX = /^(GTM|G|UA)-[A-Z0-9]+$/;

const validateTrackingId = (id: string, type: string): boolean => {
  if (!TRACKING_ID_REGEX.test(id)) {
    console.error(`Invalid ${type} tracking ID format: ${id}`);
    return false;
  }
  return true;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Lazy-loaded Google Analytics 4 component
 * 
 * Features:
 * - Lazy loads GA script after page load (performance optimization)
 * - Uses requestIdleCallback for non-blocking initialization
 * - Tracks page views on route changes
 * - Provides trackEvent function for custom events
 */

let isInitialized = false;

const initializeGTM = () => {
  // Validate GTM ID before use
  if (!validateTrackingId(GTM_ID, 'GTM')) {
    return;
  }

  // Initialize dataLayer before GTM loads
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});

  // Load GTM script via src (safer than innerHTML)
  const gtmScript = document.createElement('script');
  gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  gtmScript.async = true;
  document.head.appendChild(gtmScript);

  // GTM noscript fallback
  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);
};

const initializeGA = () => {
  if (isInitialized) {
    return;
  }

  // Validate GA ID before use
  if (!validateTrackingId(GA_MEASUREMENT_ID, 'GA')) {
    return;
  }

  // Initialize GTM
  initializeGTM();

  // Create GA4 script element (using src is safer than innerHTML)
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll send manually for SPA
  });

  isInitialized = true;
};

// ============================================
// TRACKING FUNCTIONS
// ============================================

export const trackPageView = (path: string, title: string) => {
  if (!isInitialized || typeof window.gtag !== 'function') return;
  
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
  });
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>
) => {
  if (!isInitialized || typeof window.gtag !== 'function') return;
  
  window.gtag('event', eventName, params);
};

// ============================================
// FORM TRACKING HELPERS
// ============================================

export const trackFormSubmit = (formId: string, formName: string) => {
  trackEvent('form_submit', {
    form_id: formId,
    form_name: formName,
  });
};

export const trackHeroFormSubmit = () => {
  trackEvent('generate_lead', {
    form_location: 'hero',
    form_name: 'Hero Quote Form',
  });
};

export const trackQuoteFormSubmit = () => {
  trackEvent('generate_lead', {
    form_location: 'quote_section',
    form_name: 'Quote Form',
  });
};

export const trackContactFormSubmit = () => {
  trackEvent('generate_lead', {
    form_location: 'contact_page',
    form_name: 'Contact Form',
  });
};

export const trackMaterialQuoteForm = (material: string) => {
  trackEvent('generate_lead', {
    form_location: 'material_page',
    form_name: `${material} Quote Form`,
    material: material,
  });
};

// ============================================
// ANALYTICS COMPONENT
// ============================================

const Analytics = () => {
  const location = useLocation();

  // Initialize GA after page is interactive (prioritize FCP/LCP)
  useEffect(() => {
    const init = () => {
      // Use requestIdleCallback for non-blocking initialization
      // Increased timeout to prioritize initial render
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
          .requestIdleCallback(initializeGA, { timeout: 8000 });
      } else {
        // Fallback to setTimeout - increased delay for better FCP
        setTimeout(initializeGA, 6000);
      }
    };

    // Wait for page to be fully interactive before loading analytics
    // This ensures FCP and LCP are not impacted
    if (document.readyState === 'complete') {
      // Additional delay after load to ensure FCP/LCP metrics are captured
      setTimeout(init, 2000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(init, 2000);
      }, { once: true });
    }

    return () => {
      window.removeEventListener('load', init);
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (isInitialized) {
      trackPageView(location.pathname, document.title);
    }
  }, [location.pathname]);

  return null;
};

export default Analytics;
