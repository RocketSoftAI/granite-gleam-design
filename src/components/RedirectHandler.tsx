import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { findRedirect } from '@/config/redirects';

/**
 * Client-side redirect handler
 * 
 * NOTE: This provides client-side redirects only.
 * For true 301 redirects (SEO-friendly), configure redirects at your hosting layer.
 * See src/config/redirects.ts for export functions.
 */
const RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = findRedirect(location.pathname);
    if (redirect) {
      // Use replace to avoid adding to browser history
      navigate(redirect.to, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};

export default RedirectHandler;
