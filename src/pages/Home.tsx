import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    // Check if user is logged in by checking for stored user data
    // Replace 'currentUser' with whatever key your app uses
    const storedUser = sessionStorage.getItem('currentUser')
    if (storedUser) {
      setIsLoggedIn(true)
      setUsername(storedUser)
    }
  }, [])

  return (
    <section>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Welcome to Strive</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>
          Compete with friends and track your gym progress
        </p>
        {isLoggedIn && (
          <p style={{ fontSize: '1.1rem', color: '#ef4444', fontWeight: 600, marginTop: '1rem' }}>
            Welcome back, {username}! 💪
          </p>
        )}
      </div>

      {isLoggedIn ? (
        <>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              padding: '2rem',
              backgroundColor: '#f9fafb',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Track Your Progress</h2>
              <ul style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
                <li>Time spent in the gym</li>
                <li>Reps, sets, and total weight lifted</li>
                <li>Maximum lifts by exercise</li>
                <li>Body part-specific metrics</li>
              </ul>
              <Link to="/submit">
                <button 
                  style={{ 
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                >
                  Start Tracking
                </button>
              </Link>
            </div>

            <div style={{
              padding: '2rem',
              backgroundColor: '#f9fafb',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Compete with Friends</h2>
              <ul style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
                <li>Real-time leaderboards</li>
                <li>Compare strength levels</li>
                <li>Track your rank</li>
                <li>Challenge your friends</li>
              </ul>
              <Link to="/leaderboards">
                <button 
                  style={{ 
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                >
                  View Leaderboards
                </button>
              </Link>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
              Ready to get started? <Link to="/me" style={{ color: '#ef4444', textDecoration: 'none', fontWeight: 600 }}>View your personal stats</Link> or <Link to="/submit" style={{ color: '#ef4444', textDecoration: 'none', fontWeight: 600 }}>submit your workout</Link>.
            </p>
          </div>
        </>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            padding: '2rem',
            backgroundColor: '#f9fafb',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Track Your Progress</h2>
            <ul style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
              <li>Time spent in the gym</li>
              <li>Reps, sets, and total weight lifted</li>
              <li>Maximum lifts by exercise</li>
              <li>Body part-specific metrics</li>
            </ul>
          </div>

          <div style={{
            padding: '2rem',
            backgroundColor: '#f9fafb',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Compete with Friends</h2>
            <ul style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
              <li>Real-time leaderboards</li>
              <li>Compare strength levels</li>
              <li>Track your rank</li>
              <li>Challenge your friends</li>
            </ul>
          </div>

          <div style={{
            padding: '2rem',
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            borderRadius: '12px',
            border: '2px solid #ef4444',
            gridColumn: 'span 2',
            textAlign: 'center'
          }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: '#ef4444' }}>🔒 Login Required</h2>
            <p style={{ marginBottom: '1.5rem', color: '#6b7280', fontSize: '1.1rem' }}>
              Log in to start tracking your workouts and competing with friends
            </p>
            <Link to="/login">
              <button 
                style={{ 
                  padding: '0.75rem 2rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
              >
                Log In
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
