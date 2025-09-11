declare global {
  interface Window {
    MindAR: any;
    THREE: typeof import('three');
  }
}
export {};
