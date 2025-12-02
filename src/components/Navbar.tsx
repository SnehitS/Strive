import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-brand">Strive</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/me">My Stats</Link></li>
        <li><Link to="/submit">Submit</Link></li>
        <li><Link to="/leaderboards">Leaderboards</Link></li>
      </ul>
    </nav>
  )
}
