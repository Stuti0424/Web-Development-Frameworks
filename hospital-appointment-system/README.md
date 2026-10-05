# Hospital Appointment System

A full-stack web application for managing hospital appointments built with React, Express.js, and MongoDB.

## Project Structure

```
hospital-appointment-system/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/               # Express backend server
│   ├── models/            # Database models (Mongoose schemas)
│   ├── server.js
│   └── package.json
├── .env.example           # Environment variables template
├── .gitignore
└── README.md
```

## Features

### Task 1 - React Component Architecture
- ✅ HomePage with appointment listings
- ✅ DoctorsPage displaying doctor information
- ✅ BookingPage for appointment booking
- ✅ AppointmentCard reusable component with dynamic status styling
- ✅ Navigation component with React Router links

### Task 2 - React Routing and State Management
- ✅ React Router configured with three routes (/, /doctors, /booking)
- ✅ Navigation without full-page reload
- ✅ useState for form data management
- ✅ State-driven UI updates in BookingPage
- ✅ Real-time display of patient name and selected doctor

### Task 3 - Express REST API + Middleware
- ✅ GET /api/v1/appointments - Retrieve all appointments
- ✅ POST /api/v1/appointments - Create new appointment
- ✅ GET /api/v1/doctors - Retrieve all doctors
- ✅ Custom requestLogger middleware
- ✅ Global error handling middleware
- ✅ Proper HTTP status codes (200, 201, 500)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for Task 5)

## Installation

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:
```bash
cp ../.env.example .env
```

### Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

The backend server will run on `http://localhost:5000`

Available endpoints:
- `GET /api/v1/appointments`
- `POST /api/v1/appointments`
- `GET /api/v1/doctors`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## Testing the APIs

You can test the REST APIs using Postman or Thunder Client:

### GET All Appointments
```
GET http://localhost:5000/api/v1/appointments
```

### POST Create Appointment
```
POST http://localhost:5000/api/v1/appointments
Content-Type: application/json

{
  "patientId": "1",
  "doctorId": "1",
  "date": "2026-08-25",
  "timeSlot": "10:00 AM",
  "status": "pending",
  "reason": "Regular checkup"
}
```

### GET All Doctors
```
GET http://localhost:5000/api/v1/doctors
```

## Environment Variables

Required environment variables (see `.env.example`):

```
PORT=5000                                    # Backend server port
NODE_ENV=development                         # Environment
MONGO_URI=mongodb://localhost:27017/...     # MongoDB connection string
```

## Key Components

### Frontend

- **NavBar.jsx** - Navigation component with React Router links
- **HomePage.jsx** - Displays recent appointments
- **DoctorsPage.jsx** - Shows list of available doctors
- **BookingPage.jsx** - Appointment booking form with state management
- **AppointmentCard.jsx** - Reusable component for displaying appointment details

### Backend

- **server.js** - Main Express application with routes and middleware
- **requestLogger** - Middleware that logs all HTTP requests with timestamp
- **errorHandler** - Global error handling middleware

## API Response Format

All API responses follow a consistent JSON structure:

**Success Response:**
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "error": {...}
}
```

## Status Codes

- `200 OK` - Successful GET request
- `201 Created` - Successful POST request
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Route not found
- `500 Internal Server Error` - Server error

## Technologies Used

- **Frontend**: React 18, Vite, React Router DOM, CSS3
- **Backend**: Express.js, Node.js, CORS
- **Database**: MongoDB, Mongoose (for Task 5)
- **Tools**: Postman/Thunder Client (for API testing)

## Author

CHAROTAR UNIVERSITY OF SCIENCE AND TECHNOLOGY
Faculty of Technology and Engineering — CSPIT-IT
ITUE301 — Advanced Web Development Frameworks

## License

Educational Purpose Only
