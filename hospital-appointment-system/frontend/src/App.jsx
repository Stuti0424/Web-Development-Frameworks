import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import DoctorsPage from './pages/DoctorsPage'
import BookingPage from './pages/BookingPage'
import './App.css'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </Router>
  )
}

export default App
