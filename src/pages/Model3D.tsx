import { useParams, Link } from 'react-router-dom'
import { DESTINATIONS, DestinationId } from '../data/destinations'
import ModelViewer from '../components/ModelViewer'

export default function Model3D(){
  const { id } = useParams<{id: DestinationId}>()
  const data = id ? DESTINATIONS[id] : null
  if(!data){
    return <div className="center"><p>Destinasi tidak ditemukan.</p></div>
  }

  return (
    <div className="container">
      <div className="row" style={{justifyContent:'space-between', marginBottom:12}}>
        <h2 style={{margin:0}}>{data.title} — Model 3D</h2>
        <Link to="/" className="btn secondary">← Kembali</Link>
      </div>

      <ModelViewer
        style={{
          width: '100%',
          height: '70vh',
          background: '#000',
          borderRadius: 16,
          border: '1px solid #243056',
        }}
        src={data.modelUrl}
        camera-controls
        auto-rotate
        exposure={0.9}
        shadow-intensity={1}
        ar
        ar-modes="webxr scene-viewer quick-look"
        alt={`Model 3D ${data.title}`}
      />

      <p className="footerNote">
        Geser untuk memutar, scroll untuk zoom. Jika perangkat mendukung, tombol “AR” akan muncul.
      </p>
    </div>
  )
}
