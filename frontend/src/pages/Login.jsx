import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useLanguage } from '../context/LanguageProvider';
import styles from './Login.module.css';

export default function Login() {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userData = await login(creds.username, creds.password);

      if (userData) {
        if (userData.roles && userData.roles.includes('ROLE_ADMIN')) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(t('login.error.invalid'));
      }
    } catch (err) {
      setError(t('login.error.general'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('login.title')}</h1>
          <p className={styles.subtitle}>{t('login.subtitle')}</p>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>{t('login.username')}</label>
            <input
              type="text"
              required
              className={styles.input}
              placeholder={t('login.placeholder.username')}
              value={creds.username}
              onChange={e => setCreds({ ...creds, username: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{t('login.password')}</label>
            <input
              type="password"
              required
              className={styles.input}
              placeholder={t('login.placeholder.password')}
              value={creds.password}
              onChange={e => setCreds({ ...creds, password: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loadingSpinner}>{t('login.signin')}...</span>
            ) : (
              t('login.signin')
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span>{t('login.or')}</span>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            {t('login.noAccount')}
          </p>
        </div>
      </div>

      <div className={styles.illustration}>
        <div className={styles.illustrationContent}>
          <h2>Start Learning Today</h2>
          <p>Access thousands of courses and expand your knowledge</p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <svg className={styles.featureIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Expert Instructors</span>
            </div>
            <div className={styles.feature}>
              <svg className={styles.featureIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Lifetime Access</span>
            </div>
            <div className={styles.feature}>
              <svg className={styles.featureIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Learn at Your Pace</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}