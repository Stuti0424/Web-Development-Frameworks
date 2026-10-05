import './AppointmentCard.css'

export default function AppointmentCard({ patientName, doctorName, date, timeSlot, status }) {
  // Dynamic class based on status
  const getStatusClass = (status) => {
    return `status status-${status}`
  }

  return (
    <div className="appointment-card">
      <div className="card-content">
        <h3>Appointment Details</h3>
        
        <div className="detail-row">
          <strong>Patient:</strong>
          <span>{patientName}</span>
        </div>

        <div className="detail-row">
          <strong>Doctor:</strong>
          <span>{doctorName}</span>
        </div>

        <div className="detail-row">
          <strong>Date:</strong>
          <span>{date}</span>
        </div>

        <div className="detail-row">
          <strong>Time Slot:</strong>
          <span>{timeSlot}</span>
        </div>

        <div className="detail-row">
          <strong>Status:</strong>
          <span className={getStatusClass(status)}>{status.toUpperCase()}</span>
        </div>
      </div>
    </div>
  )
}
