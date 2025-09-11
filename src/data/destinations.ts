// Definisikan tipe ID yang valid
export type DestinationId = 'pantai' | 'danau' | 'airterjun';

// Definisikan bentuk (shape) dari data untuk satu destinasi
export type DestinationData = {
  scale: string;
  rotation: string;
  position: string;
  id: DestinationId;
  title: string;
  subtitle: string;
  cover: string;
  modelUrl: string;
  patternUrl: string; // Menggunakan .patt untuk AR.js
  description: string;
};

export const DESTINATIONS: Record<DestinationId, DestinationData> = {
  pantai: {
    id: 'pantai',
    title: 'Pantai Berova(Lasusua)',
    subtitle: 'Pantai Berova dikenal dengan hamparan pasir putih dan pemandangan matahari terbenam yang menawan. Fasilitasnya lengkap, mulai dari kolam renang, gazebo, musala, kafe, hingga area kemping. Spot ikonik di sini adalah Dermaga Cinta, tempat favorit wisatawan untuk berfoto dengan latar sunset.',
    cover: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop',
    modelUrl: '/models/pantai.glb',
    // PASTIKAN FILE INI ADA DAN BEREKSTENSI .patt
    patternUrl: '/targets/pantai.patt',
    description: 'Scan target/QR untuk membuka model pantai.',
    scale: "",
    rotation: "",
    position: ""
  },
  danau: {
    id: 'danau',
    title: 'Danau Biru',
    subtitle: 'Danau Biru memikat wisatawan dengan kejernihan airnya yang berwarna biru alami, dikelilingi tebing kokoh, bukit, dan pepohonan hijau. Selain panorama indah, danau ini juga memiliki nilai sejarah serta legenda lokal, menjadikannya destinasi unik untuk berfoto dan berwisata.',
    cover: 'https://images.unsplash.com/photo-1465146633011-14f8e0781093?q=80&w=1600&auto=format&fit=crop',
    modelUrl: '/models/danau.glb',
    // PASTIKAN FILE INI ADA DAN BEREKSTENSI .patt
    patternUrl: '/targets/danau.patt',
    description: 'Scan target/QR untuk membuka model danau.',
    scale: "",
    rotation: "",
    position: ""
  },
  airterjun: {
    id: 'airterjun',
    title: 'Air Terjun Pelangi',
    subtitle: 'Air Terjun Tinuna menawarkan suasana alami dengan aliran air jernih dan suhu dingin yang menyegarkan. Kawasan ini cocok untuk berenang, outbound, camping, maupun kegiatan pramuka. Dengan area parkir luas dan akses mudah, Air Terjun Tinuna menjadi destinasi populer bagi pecinta wisata alam.',
    cover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop',
    // Perbaikan typo dari 'waterffall.glb'
    modelUrl: '/models/waterffall.glb',
    // PASTIKAN FILE INI ADA DAN BEREKSTENSI .patt
    patternUrl: '/targets/airterjun.patt',
    description: 'Scan target/QR untuk membuka model air terjun.',
    scale: "",
    rotation: "",
    position: ""
  },
};