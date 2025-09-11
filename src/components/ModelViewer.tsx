import React from 'react'

type MVProps = React.HTMLAttributes<HTMLElement> & {
  src?: string
  alt?: string
  ar?: boolean
  ['ar-modes']?: string
  ['camera-controls']?: boolean
  ['auto-rotate']?: boolean
  exposure?: number | string
  ['shadow-intensity']?: number | string
  ['environment-image']?: string
  poster?: string
  loading?: 'eager' | 'lazy'
}

/**
 * Wrapper supaya tidak perlu deklarasi custom element di TS.
 * Ini akan membuat <model-viewer> via React.createElement.
 */
export default function ModelViewer(props: MVProps) {
  // @ts-ignore — biarkan string tag custom
  return React.createElement('model-viewer', props)
}
