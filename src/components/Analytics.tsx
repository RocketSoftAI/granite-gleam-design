import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ============================================
// GOOGLE ANALYTICS 4 & GTM CONFIGURATION
// ============================================
const GA_MEASUREMENT_ID = 'G-8DEGJZ27W5';
const GTM_ID = 'GTM-TR62NWS4';

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
 * - Tracks page views on route changes
 * - Provides trackEvent function for custom events
 * 
 * SETUP:
 * 1. Replace GA_MEASUREMENT_ID above with your GA4 ID
 * 2. The component auto-initializes when included in the app
 */

let isInitialized = false;

const initializeGTM = () => {
  // GTM script
  const gtmScript = document.createElement('script');
  gtmScript.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `;
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

  // Initialize GTM
  initializeGTM();

  // Create GA4 script element
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

  // Initialize GA on first load (lazy)
  useEffect(() => {
    // Delay initialization to not block initial render
    const timer = setTimeout(() => {
      initializeGA();
    }, 2000); // 2 second delay for better LCP

    return () => clearTimeout(timer);
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
