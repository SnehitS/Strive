import { useState } from 'react'
import { submitStats } from '../services/api'

export default function SubmitStats(){
  const [loading,setLoading] = useState(false)
  const [msg,setMsg] = useState<string | null>(null)
  const [form,setForm] = useState({time:60,reps:10,sets:3,weight:100,exercise:'Bench'})

  async function onSubmit(e:any){
    e.preventDefault()
    setLoading(true); setMsg(null)
    try{
      await submitStats(form)
      setMsg('Saved!')
    }catch(err){
      setMsg('Error saving')
    }finally{setLoading(false)}
  }

  return (
    <section style={{padding:20}}>
      <h1>Submit Stats</h1>
      <form onSubmit={onSubmit} style={{display:'grid',gap:8,maxWidth:400}}>
        <label>
          Exercise
          <input value={form.exercise} onChange={e=>setForm({...form,exercise:e.target.value})} />
        </label>
        <label>
          Time (minutes)
          <input type="number" value={form.time} onChange={e=>setForm({...form,time:Number(e.target.value)})} />
        </label>
        <label>
          Reps
          <input type="number" value={form.reps} onChange={e=>setForm({...form,reps:Number(e.target.value)})} />
        </label>
        <label>
          Sets
          <input type="number" value={form.sets} onChange={e=>setForm({...form,sets:Number(e.target.value)})} />
        </label>
        <label>
          Weight (kg)
          <input type="number" value={form.weight} onChange={e=>setForm({...form,weight:Number(e.target.value)})} />
        </label>
        <button type="submit" disabled={loading}>{loading? 'Saving...':'Save'}</button>
        {msg && <p>{msg}</p>}
      </form>
    </section>
  )
}
