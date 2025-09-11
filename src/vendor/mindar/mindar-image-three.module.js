// src/vendor/mindar/mindar-image-three.module.js
// Wrapper ESM yang mengembalikan instance MINDAR.IMAGE.MindARThree (global dari UMD).
export class MindARThree {
  getCamera() {
    throw new Error('Method not implemented.');
  }
  getScene() {
    throw new Error('Method not implemented.');
  }
  getRenderer() {
    throw new Error('Method not implemented.');
  }
  start(arg0) {
    throw new Error('Method not implemented.');
  }
  addAnchor(arg0) {
    throw new Error('Method not implemented.');
  }
  constructor(options) {
    const g = typeof window !== 'undefined' ? window : {};
    const Impl = g.MINDAR && g.MINDAR.IMAGE && g.MINDAR.IMAGE.MindARThree;
    if (!Impl) {
      throw new Error(
        '[MindAR wrapper] MINDAR.IMAGE.MindARThree tidak ditemukan. ' +
        'Pastikan <script src="/vendor/mindar-image-three.prod.js"></script> sudah dimuat di index.html.'
      );
    }
    return new Impl(options);
  }
}
