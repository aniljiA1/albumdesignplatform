import React, { useState } from 'react'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AlbumEditor from './pages/AlbumEditor.jsx'

export default function App(){
  const [view, setView] = useState(localStorage.getItem('token') ? 'dashboard' : 'login')
  const [album, setAlbum] = useState(null)

  return (
    <>
      <nav className="toolbar">
        <h1>📚 Album Design</h1>
        <div style={{display:'flex', gap:8}}>
          {view!=='login' && <button className="btn" onClick={()=>{localStorage.clear(); location.reload()}}>Logout</button>}
        </div>
      </nav>
      <div className="container">
        {view==='login' && <Login onDone={()=>setView('dashboard')}/>}
        {view==='dashboard' && <Dashboard onOpen={a=>{setAlbum(a); setView('editor')}}/>}
        {view==='editor' && <AlbumEditor album={album} onBack={()=>setView('dashboard')}/>}
      </div>
    </>
  )
}
