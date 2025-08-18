import React, { useEffect, useState } from 'react'
import { api } from '../api'
import Uploader from '../components/Uploader.jsx'
import FlipViewer from '../components/FlipViewer.jsx'
import CommentPanel from '../components/CommentPanel.jsx'

export default function AlbumEditor({ album: initial, onBack }){
  const [album, setAlbum] = useState(initial)
  const [images, setImages] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  useEffect(()=>setAlbum(initial), [initial])

  async function handleFiles(files){
    const { files: urls } = await api.uploadImages(album._id, files)
    setImages(prev => [...prev, ...urls])
  }

  async function runAuto(){
    const a = await api.autoLayout(album._id, { images, pagesTotal: 18 })
    setAlbum(a)
  }

  async function manualAdd(layout){
    const page = { layout, images: images.slice(0, layout==='one'?1:layout==='two'?2:layout==='three'?3:4).map(u=>({url:u})) }
    const a = await api.updatePage(album._id, currentPage, page)
    setAlbum(a)
  }

  async function approve(){
    const a = await api.approve(album._id)
    setAlbum(a)
  }

  return (
    <div className="grid">
      <div className="toolbar">
        <button className="btn" onClick={onBack}>← Back</button>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" onClick={runAuto}>🤖 Auto Layout</button>
          <button className="btn" onClick={approve}>✅ Approve</button>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2>{album.title}</h2>
          <Uploader onFiles={handleFiles} />
          <div className="toolbar">
            <span>Manual place on page {currentPage+1}</span>
            <div style={{display:'flex', gap:8}}>
              <button className="btn" onClick={()=>manualAdd('one')}>1-up</button>
              <button className="btn" onClick={()=>manualAdd('two')}>2-up</button>
              <button className="btn" onClick={()=>manualAdd('three')}>3-up</button>
              <button className="btn" onClick={()=>manualAdd('four')}>4-up</button>
            </div>
          </div>
          <FlipViewer pages={album.pages || []} />
          <div className="toolbar">
            <button className="btn" onClick={()=>setCurrentPage(Math.max(0, currentPage-1))}>Prev</button>
            <button className="btn" onClick={()=>setCurrentPage(currentPage+1)}>Next</button>
          </div>
        </div>

        <div className="card">
          <CommentPanel albumId={album._id} currentPage={currentPage} />
        </div>
      </div>
    </div>
  )
}
