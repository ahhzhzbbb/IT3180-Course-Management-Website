import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // If not logged in, don't show the navbar (or show a simplified one)
  if (!user) return null;

  const isInstructor = user.roles?.includes('ROLE_INSTRUCTOR');
  const isAdmin = user.roles?.includes('ROLE_ADMIN');

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white' }}>
          📚 LMS App
        </Link>
      </div>

      <div className="navbar-links">
        {/* Navigation Links */}
        <Link to="/dashboard">Dashboard</Link>
        {isAdmin && <Link to="/admin">Admin Panel</Link>}

        {/* User Info & Logout */}
        <div className="user-info">
          <span>{user.name || user.username} ({isAdmin ? 'Admin' : isInstructor ? 'Instructor' : 'Student'})</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </div>
    </nav>
  );
}