import Stats from 'stats.js';

export class CanvasPerformanceMonitor {
  private stats: Stats;
  private isMonitoring: boolean = false;

  constructor() {
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb
    this.stats.dom.style.position = 'absolute';
    this.stats.dom.style.top = '0px';
    this.stats.dom.style.left = '0px';
  }

  start() {
    if (!this.isMonitoring) {
      document.body.appendChild(this.stats.dom);
      this.isMonitoring = true;
      this.animate();
    }
  }

  stop() {
    if (this.isMonitoring) {
      document.body.removeChild(this.stats.dom);
      this.isMonitoring = false;
    }
  }

  private animate = () => {
    if (this.isMonitoring) {
      this.stats.begin();
      // Your render/animation code here
      this.stats.end();
      requestAnimationFrame(this.animate);
    }
  };
} 