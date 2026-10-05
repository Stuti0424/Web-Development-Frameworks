import { useState } from 'react'
import './BookingPage.css'

export default function BookingPage() {
  // Task 2: useState for form data and selected doctor
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    date: '',
    timeSlot: ''
  })

  const [selectedDoctor, setSelectedDoctor] = useState('')

  const doctors = [
    'Dr. Keyur Kansagara',
    'Dr. Ardeshna',
    'Dr. Sharma'
  ]

  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM'
  ]

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle doctor selection
  const handleDoctorChange = (e) => {
    const doctor = e.target.value
    setSelectedDoctor(doctor)
    setFormData(prev => ({
      ...prev,
      doctorName: doctor
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Appointment booked!\n\nPatient: ${formData.patientName}\nDoctor: ${formData.doctorName}\nDate: ${formData.date}\nTime: ${formData.timeSlot}`)
    // Reset form
    setFormData({
      patientName: '',
      doctorName: '',
      date: '',
      timeSlot: ''
    })
    setSelectedDoctor('')
  }

  return (
    <div className="container">
      <div className="page booking-page">
        <h1>Book an Appointment</h1>

        <div className="booking-container">
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="patientName">Patient Name *</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="doctorName">Select Doctor *</label>
              <select
                id="doctorName"
                value={selectedDoctor}
                onChange={handleDoctorChange}
                required
              >
                <option value="">-- Choose a Doctor --</option>
                {doctors.map((doctor, index) => (
                  <option key={index} value={doctor}>
                    {doctor}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Appointment Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="timeSlot">Time Slot *</label>
              <select
                id="timeSlot"
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Select Time --</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="submit-btn">Book Appointment</button>
          </form>

          {/* Display state changes (Task 2 requirement) */}
          <div className="summary">
            <h3>Booking Summary</h3>
            <div className="summary-item">
              <strong>Patient Name:</strong>
              <p>{formData.patientName || 'Not entered'}</p>
            </div>
            <div className="summary-item">
              <strong>Selected Doctor:</strong>
              <p>{selectedDoctor || 'Not selected'}</p>
            </div>
            <div className="summary-item">
              <strong>Date:</strong>
              <p>{formData.date || 'Not selected'}</p>
            </div>
            <div className="summary-item">
              <strong>Time Slot:</strong>
              <p>{formData.timeSlot || 'Not selected'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
