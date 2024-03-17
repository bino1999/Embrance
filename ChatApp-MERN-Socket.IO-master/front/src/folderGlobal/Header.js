import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

function Header({ theme, toggleTheme }) {
  return (
    <header style={{ backgroundColor: theme === 'light' ? '#f8f9fa' : '#343a40' }}>
      <nav className={`navbar navbar-expand-md navbar-${theme === 'light' ? 'light' : 'dark'} fixed-top bg-${theme === 'light' ? 'light' : 'dark'}`}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ color: theme === 'light' ? '#000' : '#fff' }}>
            Embrance
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" style={{ color: theme === 'light' ? '#000' : '#fff' }}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" style={{ color: theme === 'light' ? '#000' : '#fff' }}>
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true" style={{ color: theme === 'light' ? '#868e96' : '#6c757d' }}>
                  Disabled
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ backgroundColor: theme === 'light' ? '#fff' : '#343a40', color: theme === 'light' ? '#000' : '#fff' }}
              />
              
            <LogoutButton/>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
