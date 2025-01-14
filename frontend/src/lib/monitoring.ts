import * as Sentry from '@sentry/nextjs'

export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  
  private constructor() {
    this.initializeObservers()
  }
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }
  
  private initializeObservers() {
    // Web Vitals
    if (typeof window !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.trackMetric(entry.name, entry.startTime, entry.duration)
        })
      })
      
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
    }
  }
  
  trackMetric(name: string, startTime: number, duration: number) {
    Sentry.addBreadcrumb({
      category: 'performance',
      message: `${name}: ${duration}ms`,
      level: 'info',
      data: {
        startTime,
        duration
      }
    })
    
    // Send to analytics
    if (window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: name,
        value: duration
      })
    }
  }
  
  trackError(error: Error, context?: Record<string, any>) {
    Sentry.captureException(error, {
      extra: context
    })
  }
} 