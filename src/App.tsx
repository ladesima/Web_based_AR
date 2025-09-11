import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Model3D from './pages/Model3D'
import ARView from './pages/ARView'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/model/:id" element={<Model3D/>}/>
      <Route path="/ar/:id" element={<ARView/>}/>
    </Routes>
  )
}
