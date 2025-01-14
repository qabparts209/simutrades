export class CanvasDebugger {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private debugOverlay: HTMLDivElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.setupDebugOverlay();
  }

  private setupDebugOverlay() {
    this.debugOverlay = document.createElement('div');
    this.debugOverlay.style.position = 'absolute';
    this.debugOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
    this.debugOverlay.style.color = 'white';
    this.debugOverlay.style.padding = '10px';
    this.canvas.parentElement?.appendChild(this.debugOverlay);
  }

  inspectDrawCalls(drawFunction: () => void) {
    const originalDrawImage = this.ctx.drawImage;
    let drawCount = 0;

    this.ctx.drawImage = (...args) => {
      drawCount++;
      originalDrawImage.apply(this.ctx, args);
    };

    drawFunction();

    this.debugOverlay.textContent = `Draw calls: ${drawCount}`;
    this.ctx.drawImage = originalDrawImage;
  }

  showBoundingBoxes() {
    const originalStroke = this.ctx.stroke;
    this.ctx.stroke = () => {
      this.ctx.save();
      this.ctx.strokeStyle = 'red';
      originalStroke.call(this.ctx);
      this.ctx.restore();
    };
  }

  cleanup() {
    this.debugOverlay.remove();
  }
} 