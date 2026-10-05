import { useState } from 'react'
import AppointmentCard from '../components/AppointmentCard'
import './HomePage.css'

export default function HomePage() {
  // Sample appointment data
  const [appointments] = useState([
    {
      id: 1,
      patientName: 'Stuti',
      doctorName: 'Dr. Keyur Kansagara',
      date: '2026-08-25',
      timeSlot: '10:00 AM',
      status: 'confirmed'
    },
    {
      id: 2,
      patientName: 'Dhrumi',
      doctorName: 'Dr. Sharma',
      date: '2026-08-26',
      timeSlot: '2:00 PM',
      status: 'pending'
    },
    {
      id: 3,
      patientName: 'Princee',
      doctorName: 'Dr. Ardeshna',
      date: '2026-08-27',
      timeSlot: '3:30 PM',
      status: 'cancelled'
    }
  ])

  return (
    <div className="container">
      <div className="page home-page">
        <h1>Welcome to MedCare Plus Hospital</h1>
        <p className="welcome-text">
          Your trusted healthcare provider. Schedule appointments with our experienced doctors.
        </p>

        <h2>Recent Appointments</h2>
        <div className="appointments-grid">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              patientName={appointment.patientName}
              doctorName={appointment.doctorName}
              date={appointment.date}
              timeSlot={appointment.timeSlot}
              status={appointment.status}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
