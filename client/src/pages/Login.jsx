import React, { useState } from 'react'
import { api, setToken } from '../api'

export default function Login({ onDone }){
  const [email, setEmail] = useState('demo@picera.com')
  const [password, setPassword] = useState('demo123')
  const [name, setName] = useState('Demo User')
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  async function submit(e){
    e.preventDefault(); setLoading(true); setMsg('')
    try {
      if(mode==='register'){
        await api.register({ name, email, password, role:'client' })
      }
      const { token } = await api.login({ email, password })
      setToken(token); onDone()
    } catch (e){ setMsg(e.message) } finally { setLoading(false) }
  }

  return (
    <div className="card" style={{maxWidth:420, margin:'40px auto'}}>
      <h2>{mode==='login'?'Login':'Register'}</h2>
      <form className="grid" onSubmit={submit}>
        {mode==='register' && <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>}
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <button className="btn" disabled={loading}>{loading?'Please wait...': (mode==='login'?'Login':'Create account')}</button>
      </form>
      <p style={{marginTop:10}}>
        {mode==='login' ? <>No account? <a href="#" onClick={()=>setMode('register')}>Register</a></> : <>Have an account? <a href="#" onClick={()=>setMode('login')}>Login</a></>}
      </p>
      {msg && <p style={{color:'#ff7b7b'}}>{msg}</p>}
    </div>
  )
}
