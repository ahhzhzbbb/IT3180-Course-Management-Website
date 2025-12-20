import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider'; // Note the path change if you moved the file
import styles from './Navbar.module.css'; // Import the module

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // If not logged in, don't show the navbar
  if (!user) return null;

  const isInstructor = user.roles?.includes('ROLE_INSTRUCTOR');
  const isAdmin = user.roles?.includes('ROLE_ADMIN');

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <Link to="/dashboard">📚 LMS App</Link>
      </div>

      <div className={styles.links}>
        {/* Navigation Links */}
        <Link to="/dashboard" className={styles.link}>Dashboard</Link>
        {isAdmin && <Link to="/admin" className={styles.link}>Admin Panel</Link>}

        {/* User Info & Logout */}
        <div className={styles.userInfo}>
          <span>{user.name || user.username} ({isAdmin ? 'Admin' : isInstructor ? 'Instructor' : 'Student'})</span>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>
      </div>
    </nav>
  );
}