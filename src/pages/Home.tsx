import { Link } from 'react-router-dom'
import QrCanvas from '../components/QRCanvas'
import { DESTINATIONS } from '../data/destinations'

export default function Home(){
  const base = window.location.origin
  return (
    <>
      <div className="hero">
        <div className="container">
          <h1 style={{margin:'0 0 8px',fontSize:40,fontWeight:800,letterSpacing:.2}}>
            Wisata Kolaka Utara 3D
          </h1>
          <p style={{maxWidth:820,color:'var(--muted)',fontSize:18,margin:'0 0 18px'}}>
            Jelajahi objek wisata unggulan dalam tampilan 3D interaktif atau dengan Augmented Reality.
            <br/>Scan QR di bawah atau buka langsung untuk melihat, zoom in/out, dan putar 360°.
          </p>
          <div className="toolbar">
            <a className="btn" href="#destinasi">Jelajahi Destinasi</a>
            <span className="badge">Web-based • Works on laptop & phone</span>
          </div>
        </div>
      </div>

      <div id="destinasi" className="container">
        <div className="grid">
          {Object.values(DESTINATIONS).map(d => (
            <div key={d.id} className="card">
              <h3>{d.title}</h3>
              <p>{d.subtitle}</p>
              <img src={d.cover} alt={d.title}/>
              <div className="qrBox">
                <QrCanvas text={`${base}/model/${d.id}`} />
                <div>
                  <p className="footerNote">Scan untuk membuka model 3D</p>
                  <div className="row">
                    <Link to={`/model/${d.id}`} className="btn">
                      <span>👁️</span> Lihat 3D
                    </Link>
                    <Link to={`/ar/${d.id}`} className="btn secondary">
                      <span>📷</span> AR View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="footerNote" style={{marginTop:24}}>
          Tips: Jika kamera laptop tidak muncul, pastikan izin kamera sudah “Allow”, tutup aplikasi lain yang memakai kamera,
          lalu refresh. Kamu bisa ganti kamera di halaman AR View.
        </p>
      </div>
    </>
  )
}
