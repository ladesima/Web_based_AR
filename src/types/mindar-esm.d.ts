declare module '../vendor/mindar/mindar-image-three.module.js' {
  export class MindARThree {
    constructor(options: any);
    renderer: any; scene: any; camera: any;
    start(opts?: any): Promise<void>;
    stop(): Promise<void>;
    addAnchor(index: number): any;
  }
}
declare module 'three/examples/jsm/loaders/GLTFLoader' {
  export class GLTFLoader {
    load(url: string, onLoad:(g:any)=>void, onProgress?:(e:any)=>void, onError?:(e:any)=>void): void;
  }
}
