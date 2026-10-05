import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <header className="top-nav">
      {/*<div className="brand">STUDENT PORTFOLIO</div>*/}
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          Home
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          Projects
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          Contact
        </NavLink>
      </nav>
    </header>
  );
}

export default NavBar;