import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import '../styles/Navbar.css';

function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🔍 TheTracer
        </Link>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <FiMenu />
        </div>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-link" onClick={() => setMenuOpen(false)}>
              Search
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link logout-btn" onClick={handleLogout}>
                  <FiLogOut /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link nav-link-signup" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
