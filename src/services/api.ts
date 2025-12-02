const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function getHealth(): Promise<{status:string}> {
  const res = await fetch(`${API_BASE}/health`)
  if (!res.ok) throw new Error('API error')
  return res.json()
}

export async function submitStats(payload: any){
  const res = await fetch(`${API_BASE}/stats`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
  if (!res.ok) throw new Error('submit error')
  return res.json()
}
