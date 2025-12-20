import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import styles from './Login.module.css'; // Import the CSS Module

export default function Login() {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const userData = await login(creds.username, creds.password);

    if (userData) {
      if (userData.roles && userData.roles.includes('ROLE_ADMIN')) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Sign In</h2>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              required
              className={styles.input}
              value={creds.username}
              onChange={e => setCreds({ ...creds, username: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              required
              className={styles.input}
              value={creds.password}
              onChange={e => setCreds({ ...creds, password: e.target.value })}
            />
          </div>

          {/* Using global 'btn-primary' combined with local spacing class if needed */}
          <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}