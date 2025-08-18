import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function CommentPanel({ albumId, currentPage }){
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')

  async function load(){ setComments(await api.getComments(albumId)) }
  useEffect(()=>{ load() }, [albumId])

  async function add(){
    if(!text) return;
    await api.addComment(albumId, { pageIndex: currentPage, text })
    setText(''); load()
  }

  return (
    <div className="sidebar">
      <h3>Feedback</h3>
      <div style={{maxHeight:260, overflow:'auto', marginBottom:8}}>
        {comments.map(c => (
          <div key={c._id} className="card" style={{background:'#0f1115', marginBottom:8}}>
            <small>Page {c.pageIndex+1}</small>
            <div>{c.text}</div>
          </div>
        ))}
        {comments.length===0 && <p>No comments yet.</p>}
      </div>
      <textarea rows={3} value={text} onChange={e=>setText(e.target.value)} placeholder="Leave a comment..."/>
      <div style={{marginTop:6}}><button className="btn" onClick={add}>Comment</button></div>
    </div>
  )
}
