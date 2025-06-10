import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// Props interface for TypeScript (uncomment if using TypeScript)
// interface ScrollToTopProps {
//   children: React.ReactNode;
//   focusTargetId?: string;
//   excludePaths?: string[];
// }

/**
 * ScrollToTop component resets scroll position on route change with smooth behavior.
 * Supports accessibility, conditional scrolling, and anchor links.
 *
 * @param {React.ReactNode} children - Child components to render.
 * @param {string} [focusTargetId] - ID of element to focus after scroll (e.g., 'main-content').
 * @param {string[]} [excludePaths] - Paths to skip scrolling (e.g., ['/modal']).
 */
const ScrollToTop = ({ children, focusTargetId, excludePaths = [] }) => {
  const { pathname, hash } = useLocation();

  // Debounced scroll function for performance
  const scrollTo = useCallback((options) => {
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        try {
          window.scrollTo(options);
        } catch (error) {
          console.error('ScrollToTop error:', error);
        }
      });
    }
  }, []);

  // Focus element for accessibility
  const focusElement = useCallback((id) => {
    if (id && typeof window !== 'undefined') {
      const element = document.getElementById(id);
      if (element) {
        try {
          element.setAttribute('tabindex', '-1');
          element.focus();
          element.removeAttribute('tabindex');
        } catch (error) {
          console.error('Focus error:', error);
        }
      }
    }
  }, []);

  useEffect(() => {
    // Skip scrolling for excluded paths
    if (excludePaths.includes(pathname)) {
      return;
    }

    // Handle hash-based navigation
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY,
          behavior: 'smooth',
        });
        focusElement(hash.replace('#', ''));
        return;
      }
    }

    // Default: scroll to top
    scrollTo({ top: 0, behavior: 'smooth' });

    // Focus main content for accessibility
    if (focusTargetId) {
      focusElement(focusTargetId);
    }
  }, [pathname, hash, excludePaths, scrollTo, focusTargetId, focusElement]);

  return children || null;
};

// Export for testing
export const scrollTo = (options) => window.scrollTo(options);

export default ScrollToTop;