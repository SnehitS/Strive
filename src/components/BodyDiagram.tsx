export default function BodyDiagram(){
  // Placeholder body diagram — color coding by level can be added later
  const parts = ['Chest','Back','Legs','Arms','Shoulders','Core']
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
      {parts.map(p=> (
        <div key={p} style={{padding:10,background:'#f3f4f6',borderRadius:6}}>
          <strong>{p}</strong>
          <div style={{height:8,background:'#e5e7eb',borderRadius:4,marginTop:8}}>
            <div style={{width:Math.floor(Math.random()*100)+'%',height:'100%',background:'#0ea5e9',borderRadius:4}} />
          </div>
        </div>
      ))}
    </div>
  )
}
