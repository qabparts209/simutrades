import 'jest-webgl-canvas-mock';
import { WebGLRenderer } from 'three';

export const setupWebGLContext = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl');
  
  if (!gl) {
    throw new Error('WebGL not supported');
  }
  
  return gl;
};

export const createMockRenderer = () => {
  return new WebGLRenderer({
    canvas: document.createElement('canvas'),
    antialias: true,
  });
}; 