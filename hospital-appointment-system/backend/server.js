const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Task 3: Custom Request Logger Middleware
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${req.method}] ${req.path} [${timestamp}]`;
  console.log(logMessage);
  next();
};

app.use(requestLogger);

// In-memory data storage
let appointments = [
  {
    id: 1,
    patientId: '1',
    doctorId: '1',
    date: '2026-08-25',
    timeSlot: '10:00 AM',
    status: 'confirmed',
    reason: 'Regular checkup'
  },
  {
    id: 2,
    patientId: '2',
    doctorId: '2',
    date: '2026-08-26',
    timeSlot: '2:00 PM',
    status: 'pending',
    reason: 'Consultation'
  }
];

let doctors = [
  {
    id: '1',
    name: 'Dr. Keyur Kansagara',
    email: 'keyur@medcare.com',
    specialisation: 'Cardiology',
    available: true
  },
  {
    id: '2',
    name: 'Dr. Ardeshna',
    email: 'ardeshna@medcare.com',
    specialisation: 'Orthopedics',
    available: true
  },
  {
    id: '3',
    name: 'Dr. Sharma',
    email: 'sharma@medcare.com',
    specialisation: 'Pediatrics',
    available: false
  }
];

// Task 3: GET /api/v1/appointments - Return all appointments
app.get('/api/v1/appointments', (req, res) => {
  res.status(200).json({
    success: true,
    data: appointments
  });
});

// Task 3: POST /api/v1/appointments - Create a new appointment
app.post('/api/v1/appointments', (req, res) => {
  try {
    const { patientId, doctorId, date, timeSlot, status, reason } = req.body;

    // Simple validation
    if (!patientId || !doctorId || !date || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: patientId, doctorId, date, timeSlot'
      });
    }

    const newAppointment = {
      id: appointments.length + 1,
      patientId,
      doctorId,
      date,
      timeSlot,
      status: status || 'pending',
      reason: reason || ''
    };

    appointments.push(newAppointment);

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: newAppointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating appointment',
      error: error.message
    });
  }
});

// Task 3: GET /api/v1/doctors - Return all doctors
app.get('/api/v1/doctors', (req, res) => {
  res.status(200).json({
    success: true,
    data: doctors
  });
});

// Task 3: Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred';

  res.status(statusCode).json({
    success: false,
    message: message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`\nAvailable Endpoints:`);
  console.log(`GET  /api/v1/appointments`);
  console.log(`POST /api/v1/appointments`);
  console.log(`GET  /api/v1/doctors`);
});
