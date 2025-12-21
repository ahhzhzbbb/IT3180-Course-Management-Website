import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { useTheme } from '../../context/ThemeProvider';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

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
            <span className={styles.logoText}>{t('nav.learnhub')}</span>
          </Link>
        </div>

        <div className={styles.navLinks}>
          <Link 
            to="/dashboard" 
            className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}
          >
            {t('nav.dashboard')}
          </Link>
          
          {isAdmin && (
            <Link 
              to="/admin" 
              className={`${styles.navLink} ${isActive('/admin') ? styles.active : ''}`}
            >
              {t('nav.admin')}
            </Link>
          )}
        </div>

        <div className={styles.controls}>
          {/* Language Toggle */}
          <button 
            className={styles.controlBtn}
            onClick={toggleLanguage}
            title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
          >
            <span className={styles.langIcon}>
              {language === 'vi' ? '🇻🇳' : '🇬🇧'}
            </span>
          </button>

          {/* Theme Toggle */}
          <button 
            className={styles.controlBtn}
            onClick={toggleTheme}
            title={theme === 'light' ? t('theme.dark') : t('theme.light')}
          >
            {theme === 'light' ? (
              <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
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
                {isAdmin ? t('role.admin') : isInstructor ? t('role.instructor') : t('role.student')}
              </div>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                {t('nav.logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}