import { useEffect, useState } from 'react'
import './DoctorsPage.css'

export default function DoctorsPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await fetch('/api/v1/doctors')

        if (!response.ok) {
          throw new Error('Could not load doctors')
        }

        const result = await response.json()
        setData(result.data)
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setLoading(false)
      }
    }

    getDoctors()
  }, [])

  return (
    <div className="container">
      <div className="page doctors-page">
        <h1>Our Doctors</h1>
        <p className="intro-text">Meet our experienced healthcare professionals</p>

        {loading && <p>Loading doctors...</p>}
        {error && <p className="error-message">Error: {error}</p>}

        {!loading && !error && (
          <div className="doctors-grid">
            {data.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <h3>{doctor.name}</h3>
                <p className="specialisation">{doctor.specialisation}</p>
                <p className={`availability ${doctor.available ? 'available' : 'unavailable'}`}>
                  {doctor.available ? '✓ Available' : '✗ Not Available'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
