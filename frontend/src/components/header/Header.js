import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../logo.png';

export default function Header() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); 
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary-subtle shadow">
        <div className="container-fluid">
          {/* Logo */}
          <NavLink className="navbar-brand d-flex align-items-center" to="/home">
            <img src={logo} alt="logo" width={50} height={50} className="me-2" />
          </NavLink>

          {/* Toggler for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item m-1">
                <NavLink className="nav-link btn btn-outline-light fw-bold" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item m-1">
                <NavLink className="nav-link btn btn-outline-light fw-bold" to="/employees">
                  Employees
                </NavLink>
              </li>
            </ul>

            {/* User Info and Logout */}
             {username ? (
              <div className="d-flex align-items-center">
                <h5 className="me-3 mb-0 text-dark">{username} - </h5>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <NavLink className="btn btn-outline-primary" to="/">
                Log In
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
