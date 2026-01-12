/**
 * Performance monitoring utilities for the portfolio
 */

interface PerformanceMetrics {
  fp: number; // First Paint
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  domContentLoaded: number;
  loadComplete: number;
}

const metrics: Partial<PerformanceMetrics> = {};

/**
 * Initialize performance monitoring
 */
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Track Navigation Timing
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      metrics.ttfb = perfData.responseStart - perfData.navigationStart;
      metrics.domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;
      metrics.loadComplete = perfData.loadEventEnd - perfData.navigationStart;

      if (process.env.NODE_ENV === 'development') {
        console.log('Performance Metrics:', {
          'Time to First Byte': `${metrics.ttfb}ms`,
          'DOM Content Loaded': `${metrics.domContentLoaded}ms`,
          'Load Complete': `${metrics.loadComplete}ms`,
        });
      }
    });
  }

  // Track Web Vitals
  if ('PerformanceObserver' in window) {
    // First Contentful Paint
    try {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            metrics.fcp = Math.round(entry.startTime);
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      // PerformanceObserver not supported
    }

    // Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        metrics.lcp = Math.round(lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // LCP observer not supported
    }

    // First Input Delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          metrics.fid = Math.round(entry.processingDuration);
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // FID observer not supported
    }

    // Cumulative Layout Shift
    try {
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        metrics.cls = Math.round(clsValue * 1000) / 1000;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // CLS observer not supported
    }
  }
};

/**
 * Get performance metrics
 */
export const getPerformanceMetrics = (): Partial<PerformanceMetrics> => {
  return { ...metrics };
};

/**
 * Report performance metrics
 */
export const reportPerformanceMetrics = (metricsData?: Partial<PerformanceMetrics>) => {
  const data = metricsData || metrics;

  if (process.env.NODE_ENV === 'development') {
    console.table({
      'First Contentful Paint': `${data.fcp}ms`,
      'Largest Contentful Paint': `${data.lcp}ms`,
      'First Input Delay': `${data.fid}ms`,
      'Cumulative Layout Shift': data.cls,
      'Time to First Byte': `${data.ttfb}ms`,
    });
  }

  // Here you could send metrics to an analytics service
  // e.g., Google Analytics, Sentry, DataDog, etc.
  if (window.gtag && process.env.NODE_ENV === 'production') {
    try {
      window.gtag('event', 'page_view', {
        'page_path': window.location.pathname,
        'page_title': document.title,
        'fcp': data.fcp,
        'lcp': data.lcp,
        'fid': data.fid,
        'cls': data.cls,
        'ttfb': data.ttfb,
      });
    } catch (e) {
      // GA not available
    }
  }
};

/**
 * Debounce function for performance-sensitive operations
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for high-frequency events
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Lazy load images
 */
export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img.lazy').forEach((img) => {
      imageObserver.observe(img);
    });
  }
};

/**
 * Prefetch resources
 */
export const prefetchResource = (url: string, as: 'script' | 'style' | 'image' = 'script') => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  link.as = as;
  document.head.appendChild(link);
};

/**
 * Preload critical resources
 */
export const preloadResource = (url: string, as: 'script' | 'style' | 'image' = 'script') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.as = as;
  document.head.appendChild(link);
};
