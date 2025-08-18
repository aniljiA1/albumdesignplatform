import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function Dashboard({ onOpen }){
  const [list, setList] = useState([])
  const [title, setTitle] = useState('My Wedding Album')
  const [pages, setPages] = useState(18)

  async function load(){ setList(await api.listAlbums()) }
  useEffect(()=>{ load() }, [])

  async function createAlbum(){
    const a = await api.createAlbum({ title, pages })
    setTitle('My Wedding Album'); setPages(18)
    await load()
  }

  return (
    <div className="grid">
      <div className="card">
        <div className="toolbar">
          <h2>Create new album</h2>
        </div>
        <div className="grid grid-2">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Album title"/>
          <select value={pages} onChange={e=>setPages(Number(e.target.value))}>
            <option value={18}>16 + 2 cover pages</option>
            <option value={22}>20 + 2 cover pages</option>
            <option value={32}>30 + 2 cover pages</option>
            <option value={42}>40 + 2 cover pages</option>
          </select>
        </div>
        <div style={{marginTop:10}}>
          <button className="btn" onClick={createAlbum}>Create</button>
        </div>
      </div>

      <div className="card">
        <h2>Your albums</h2>
        <div className="grid">
          {list.map(a => (
            <div key={a._id} className="card" style={{background:'#0f1115'}}>
              <h3>{a.title}</h3>
              <p>Mode: {a.mode} • Status: {a.status}</p>
              <button className="btn" onClick={()=>onOpen(a)}>Open</button>
            </div>
          ))}
          {list.length===0 && <p>No albums yet.</p>}
        </div>
      </div>
    </div>
  )
}
