import React, { useRef } from 'react'

export default function Uploader({ onFiles }){
  const ref = useRef()
  return (
    <div>
      <input type="file" multiple ref={ref} onChange={e=>onFiles(e.target.files)} />
    </div>
  )
}
