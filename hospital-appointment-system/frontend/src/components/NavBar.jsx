import { Link } from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">🏥 MedCare Plus</div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/doctors" className="nav-link">Doctors</Link>
          </li>
          <li className="nav-item">
            <Link to="/booking" className="nav-link">Book Appointment</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
