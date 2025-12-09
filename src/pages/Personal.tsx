import { useState, useEffect } from 'react'
import BodyGraph from '../components/BodyGraph'
import { getUserWorkouts } from '../services/api'

interface Exercise {
  id: string
  bodyPart: string
  exercise: string
  sets: number
  reps: number
  weight: number
}

interface WorkoutSession {
  sessionTime: number
  exercises: Exercise[]
  totalWeight: number
  timestamp: string
}

export default function Personal() {
  const [tab, setTab] = useState<'levels' | 'stats' | 'history'>('levels')
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load workout history when History tab is selected
    if (tab === 'history') {
      loadWorkoutHistory()
    }
  }, [tab])

  async function loadWorkoutHistory() {
    setLoading(true)
    try {
      // Get current user
      const currentUser = localStorage.getItem('currentUser')
      if (!currentUser) {
        // If not logged in, try localStorage
        const sessions = JSON.parse(localStorage.getItem('workoutSessions') || '[]')
        const sortedSessions = sessions.sort((a: WorkoutSession, b: WorkoutSession) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        setWorkoutHistory(sortedSessions)
        setLoading(false)
        return
      }

      const user = JSON.parse(currentUser)
      
      // Fetch from backend
      const response = await getUserWorkouts(user._id)
      setWorkoutHistory(response.workouts)
    } catch (err) {
      console.error('Failed to load workout history from backend, using localStorage:', err)
      // Fallback to localStorage
      const sessions = JSON.parse(localStorage.getItem('workoutSessions') || '[]')
      const sortedSessions = sessions.sort((a: WorkoutSession, b: WorkoutSession) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      setWorkoutHistory(sortedSessions)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h1>My Stats</h1>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        <button
          type="button"
          onClick={() => setTab('levels')}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: 6,
            border: tab === 'levels' ? '2px solid var(--accent-red)' : '1px solid var(--border-color)',
            background: tab === 'levels' ? 'var(--accent-red)' : 'var(--secondary-bg)',
            color: tab === 'levels' ? '#fff' : 'var(--text-secondary)',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Body Levels
        </button>
        <button
          type="button"
          onClick={() => setTab('stats')}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: 6,
            border: tab === 'stats' ? '2px solid var(--accent-red)' : '1px solid var(--border-color)',
            background: tab === 'stats' ? 'var(--accent-red)' : 'var(--secondary-bg)',
            color: tab === 'stats' ? '#fff' : 'var(--text-secondary)',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Personal Statistics
        </button>
        <button
          type="button"
          onClick={() => setTab('history')}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: 6,
            border: tab === 'history' ? '2px solid var(--accent-red)' : '1px solid var(--border-color)',
            background: tab === 'history' ? 'var(--accent-red)' : 'var(--secondary-bg)',
            color: tab === 'history' ? '#fff' : 'var(--text-secondary)',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Workout History
        </button>
      </div>

      {/* Body Levels Tab */}
      {tab === 'levels' && (
        <div>
          <div className="card">
            <h2>Body Levels</h2>
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              Your strength distribution based on exercises logged in your sessions
            </p>
            <BodyGraph imageUrl="/strive-drawing.jpg" />
          </div>
        </div>
      )}

      {/* Personal Statistics Tab */}
      {tab === 'stats' && (
        <div className="grid-2">
          <div className="card">
            <h2>Totals</h2>
            <ul style={{ listStyle: 'none', marginLeft: 0, padding: 0 }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '0.8rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <span>Total Time in Gym</span>
                <strong style={{ color: 'var(--accent-red)' }}>123 hrs</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '0.8rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <span>Total Weight Lifted</span>
                <strong style={{ color: 'var(--accent-red)' }}>45,000 lbs</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0' }}>
                <span>Personal Best (Bench)</span>
                <strong style={{ color: 'var(--accent-red)' }}>150 lbs</strong>
              </li>
            </ul>
          </div>

          <div className="card">
            <h2>Max Lifts</h2>
            <ul style={{ listStyle: 'none', marginLeft: 0, padding: 0 }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '0.8rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <span>Bench Press</span>
                <strong style={{ color: 'var(--accent-red)' }}>150 lbs</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '0.8rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <span>Squat</span>
                <strong style={{ color: 'var(--accent-red)' }}>200 lbs</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0' }}>
                <span>Deadlift</span>
                <strong style={{ color: 'var(--accent-red)' }}>250 lbs</strong>
              </li>
            </ul>
          </div>

          <div className="card">
            <h2>This Month</h2>
            <ul style={{ listStyle: 'none', marginLeft: 0, padding: 0 }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '0.8rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <span>Workouts Completed</span>
                <strong style={{ color: 'var(--accent-red)' }}>12</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '0.8rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <span>Hours Trained</span>
                <strong style={{ color: 'var(--accent-red)' }}>18 hrs</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0' }}>
                <span>Weight Lifted</span>
                <strong style={{ color: 'var(--accent-red)' }}>5,200 lbs</strong>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Workout History Tab */}
      {tab === 'history' && (
        <div>
          <div className="card">
            <h2>Recent Workouts</h2>
            {loading ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                Loading workouts...
              </p>
            ) : workoutHistory.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                No workouts logged yet. Start tracking your progress!
              </p>
            ) : (
              <div style={{ marginTop: '1.5rem' }}>
                {workoutHistory.map((workout, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '1rem',
                      marginBottom: '0.75rem',
                      backgroundColor: 'var(--tertiary-bg)',
                      borderRadius: '8px',
                      borderLeft: '4px solid var(--accent-red)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.1rem' }}>
                        {new Date(workout.timestamp).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        {workout.sessionTime} min
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                      <span>{workout.exercises.length} exercises</span>
                      <span style={{ color: 'var(--accent-red)', fontWeight: 600 }}>
                        {workout.totalWeight.toLocaleString()} lbs total
                      </span>
                    </div>
                    
                    {/* Exercise breakdown */}
                    <details style={{ marginTop: '0.5rem' }}>
                      <summary style={{ 
                        cursor: 'pointer', 
                        color: 'var(--accent-red)', 
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        padding: '0.25rem 0'
                      }}>
                        View exercises
                      </summary>
                      <div style={{ 
                        marginTop: '0.5rem', 
                        paddingTop: '0.5rem', 
                        borderTop: '1px solid var(--border-color)' 
                      }}>
                        {workout.exercises.map((ex, exIdx) => (
                          <div 
                            key={exIdx} 
                            style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              padding: '0.4rem 0',
                              fontSize: '0.9rem',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            <span>{ex.bodyPart} - {ex.exercise}</span>
                            <span style={{ color: 'var(--text-primary)' }}>
                              {ex.sets} × {ex.reps} @ {ex.weight} lbs
                            </span>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}