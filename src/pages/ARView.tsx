import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DESTINATIONS, DestinationId } from "../data/destinations";

async function headOk(url: string) { 
  try { 
    const r = await fetch(url, { method: "HEAD" }); 
    return r.ok; 
  } catch { 
    return false; 
  } 
}

export default function ARView() {
  const { id } = useParams<{ id: DestinationId }>();
  // Gunakan useMemo untuk menstabilkan 'data' agar tidak dibuat ulang di setiap render
  const data = useMemo(() => id ? DESTINATIONS[id] : null, [id]);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [status, setStatus] = useState("Meminta izin kamera...");

  useEffect(() => {
    // Flag untuk menandai proses cleanup sedang berjalan
    let isCleaningUp = false;

    // Keluar lebih awal jika tidak ada data atau ada error
    if (!data) return;
    if (err) return;

    // Fungsi utama untuk setup A-Frame
    const setupARScene = async () => {
      if (!mountRef.current) return;

      // 1. Validasi file aset
      setStatus("Memvalidasi aset...");
      const [okPatt, okGlb] = await Promise.all([ 
        headOk(data.patternUrl), 
        headOk(data.modelUrl) 
      ]);
      
      if (isCleaningUp) return;
      if (!okPatt) { setErr(`File marker tidak ditemukan: ${data.patternUrl}`); return; }
      if (!okGlb) { setErr(`File model 3D tidak ditemukan: ${data.modelUrl}`); return; }

      // 2. Minta izin kamera
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        stream.getTracks().forEach(t => t.stop());
      } catch (e: any) {
        if (isCleaningUp) return;
        const name = e?.name || "UnknownError";
        if (name === "NotAllowedError") setErr("Izin kamera ditolak. Mohon izinkan lalu refresh.");
        else setErr(`Gagal akses kamera: ${name}`);
        return;
      }
      
      if (isCleaningUp) return;
      setStatus("Menyiapkan scene AR...");

      // 3. Buat dan inject HTML A-Frame
      const arAttrs = `sourceType: webcam; detectionMode: mono; maxDetectionRate: 30;`;
      const markerAttrs = `type="pattern" url="${data.patternUrl}" emitevents="true"`;
      
      const html = `
        <a-scene embedded vr-mode-ui="enabled: false" renderer="logarithmicDepthBuffer: false; alpha:true; antialias:true;" arjs="${arAttrs}">
          <a-assets>
            <a-asset-item id="model-asset" src="${data.modelUrl}" crossorigin="anonymous"></a-asset-item>
          </a-assets>
          <a-marker ${markerAttrs}>
            <a-entity 
              id="model" 
              gltf-model="#model-asset" 
              position="${data.position || '0 0 0'}" 
              rotation="${data.rotation || '0 0 0'}" 
              scale="${data.scale || '0.5 0.5 0.5'}" 
              visible="false"
            ></a-entity>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      `;
      
      if (mountRef.current) {
        mountRef.current.innerHTML = html;
      }
      const sceneEl = mountRef.current?.querySelector("a-scene") as any;
      if (!sceneEl) return;

      // 4. Tambahkan event listeners
      const onReady = () => setStatus("Memuat model 3D...");
      const onModelLoaded = () => setStatus("Arahkan kamera ke marker...");
      const onFound = () => {
        setStatus("Marker terdeteksi ✅");
        const model = sceneEl.querySelector("#model");
        if (model) model.setAttribute('visible', true);
      };
      const onLost = () => {
        setStatus("Arahkan kamera ke marker...");
        const model = sceneEl.querySelector("#model");
        if (model) model.setAttribute('visible', false);
      };
      const makeCanvasTransparent = () => { if (sceneEl?.renderer) sceneEl.renderer.setClearColor(0x000000, 0); };
      
      if (sceneEl.hasLoaded) makeCanvasTransparent();
      else sceneEl.addEventListener("loaded", makeCanvasTransparent, { once: true });
      
      sceneEl.addEventListener("ar-init", onReady, { once: true });
      const markerEl = sceneEl.querySelector("a-marker");
      markerEl?.addEventListener("markerfound", onFound);
      markerEl?.addEventListener("markerlost", onLost);
      const modelEl = sceneEl.querySelector("#model");
      modelEl?.addEventListener("model-loaded", onModelLoaded, { once: true });
    };

    setupARScene();

    // Fungsi Cleanup: dijalankan saat komponen dihancurkan atau 'data' berubah
    return () => {
      isCleaningUp = true;
      const video = document.querySelector("#arjs-video") as HTMLVideoElement;
      if (video?.srcObject) {
        (video.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
      if (mountRef.current) {
        mountRef.current.innerHTML = "";
      }
    };
  // Hook ini hanya akan berjalan ulang jika 'data' (dari URL) berubah.
  // Ini adalah kunci untuk menghentikan perulangan.
  }, [data]); 

  if (!data) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Destinasi tidak ditemukan.</p>
        <Link to="/">← Kembali</Link>
      </div>
    );
  }

  return (
    <div className="ar-component-wrapper">
      <div className="overlayTip">{err ? `⚠️ ${err}` : status}</div>
      <Link to="/" className="btn toolbar" style={{ zIndex: 10, textDecoration: 'none' }}>
        ← Kembali
      </Link>
      <div ref={mountRef} className="sceneRoot" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
    </div>
  );
}