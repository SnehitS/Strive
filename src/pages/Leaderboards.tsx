export default function Leaderboards(){
  return (
    <section style={{padding:20}}>
      <h1>Leaderboards</h1>
      <p>Leaderboards for time, max lifts, and totals will be shown here.</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginTop:16}}>
        <div style={{padding:12,background:'#fff',borderRadius:8}}>
          <h3>Time in Gym</h3>
          <ol>
            <li>Alice — 120 hrs</li>
            <li>Bob — 95 hrs</li>
            <li>Charlie — 80 hrs</li>
          </ol>
        </div>
        <div style={{padding:12,background:'#fff',borderRadius:8}}>
          <h3>Max Bench</h3>
          <ol>
            <li>Bob — 200 kg</li>
            <li>Alice — 160 kg</li>
            <li>Charlie — 150 kg</li>
          </ol>
        </div>
      </div>
    </section>
  )
}
