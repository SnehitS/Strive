import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <section style={{padding:20}}>
      <h1>Welcome to Strive</h1>
      <p>Compete with friends and track your gym progress.</p>
      <ul>
        <li>Track time in the gym</li>
        <li>Track reps, sets, and total weight</li>
        <li>Track max lifts</li>
      </ul>
      <p>
        <Link to="/submit">Start tracking</Link> or <Link to="/me">view your personal page</Link>
      </p>
    </section>
  )
}
