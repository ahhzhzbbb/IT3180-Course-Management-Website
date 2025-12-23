import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
// Language provider removed; use fixed Vietnamese labels
// Theme toggle removed; language toggle removed
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  // Using fixed Vietnamese labels

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const isInstructor = user.roles?.includes('ROLE_INSTRUCTOR');
  const isAdmin = user.roles?.includes('ROLE_ADMIN');
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link to="/dashboard" className={styles.logo}>
            <svg className={styles.logoIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className={styles.logoText}>Học Trực Tuyến</span>
          </Link>
        </div>

        <div className={styles.navLinks}>
          <Link 
            to="/dashboard" 
            className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}
          >
            Trang chủ
          </Link>
          
          {isAdmin && (
            <Link 
              to="/admin" 
              className={`${styles.navLink} ${isActive('/admin') ? styles.active : ''}`}
            >
              Quản trị
            </Link>
          )}
        </div>

        <div className={styles.controls}>
          {/* Language toggle removed */}

          {/* Theme toggle removed */}
        </div>

        <div className={styles.userSection}>
          <button 
            className={styles.userButton}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className={styles.avatar}>
              {(user.name || user.username)?.[0]?.toUpperCase() || 'U'}
            </div>
            <span className={styles.userName}>{user.name || user.username}</span>
          </button>

          {showUserMenu && (
            <div className={styles.userMenu}>
              <div className={styles.userRole}>
                {isAdmin ? 'Quản trị viên' : isInstructor ? 'Giảng viên' : 'Học viên'}
              </div>
              <Link to="/profile" className={styles.profileLink} onClick={() => setShowUserMenu(false)}>
                Hồ sơ
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}