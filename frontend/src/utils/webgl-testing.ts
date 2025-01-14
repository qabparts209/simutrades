import { WebGLRenderer } from 'three';

export class WebGLTestHelper {
  private renderer: WebGLRenderer;
  private canvas: HTMLCanvasElement;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.renderer = new WebGLRenderer({ canvas: this.canvas });
  }

  testWebGLCapabilities() {
    const gl = this.canvas.getContext('webgl');
    if (!gl) {
      throw new Error('WebGL not supported');
    }

    return {
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
      vendor: gl.getParameter(gl.VENDOR),
      renderer: gl.getParameter(gl.RENDERER),
    };
  }

  testPerformance() {
    const startTime = performance.now();
    // Perform test renders
    const endTime = performance.now();
    return endTime - startTime;
  }

  cleanup() {
    this.renderer.dispose();
  }
} 