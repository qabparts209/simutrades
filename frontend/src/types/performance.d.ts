interface Performance {
  memory?: {
    jsHeapSizeLimit: number
    totalJSHeapSize: number
    usedJSHeapSize: number
  }
}

interface Window {
  gtag?: (command: string, action: string, params: any) => void
} 