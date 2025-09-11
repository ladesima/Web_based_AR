import { useEffect, useRef } from 'react'
import * as QRCode from 'qrcode'

type Props = { text: string; size?: number }
export default function QrCanvas({ text, size = 128 }: Props){
  const ref = useRef<HTMLCanvasElement|null>(null)
  useEffect(()=>{
    if(!ref.current) return
    QRCode.toCanvas(ref.current, text, { width: size, margin: 1 }, (err)=>{ if(err) console.error(err) })
  }, [text, size])
  return <canvas className="qr" ref={ref} width={size} height={size} />
}
