import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional, if you want to style the navbar

function Navbar() {
  const isLoggedIn = localStorage.getItem('token');
  
  return (
    <nav className="navbar">
      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            <Link to="/cars" className="navbar-link">Cars</Link> {/* Display Cars link */}
            <Link to="/cars/create" className="navbar-link">Create Car</Link> {/* Option to create new car */}
            <button
              className="navbar-logout"
              onClick={() => { 
                localStorage.removeItem('token'); 
                window.location.href = '/login'; 
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link> {/* Show Login link if not logged in */}
            <Link to="/signup" className="navbar-link">Signup</Link> {/* Show Signup link if not logged in */}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
