import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageProvider';
import api from '../api/axiosConfig';
import styles from './Login.module.css'; // reuse the same styles to keep look consistent

export default function Register() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
    name: '',
    phoneNumber: '',
    birth: '',
    gender: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Keep phone as-is (no client-side validation); backend will handle persistence
      // Build payload - do not include roles so backend will assign default student role
      const payload = {
        username: form.username,
        password: form.password,
        name: form.name,
        phoneNumber: form.phoneNumber,
        birth: form.birth,
        gender: form.gender === 'male' ? true : form.gender === 'female' ? false : null
      };

      await api.post('/auth/signup', payload);

      setSuccess(t('register.success'));

      // Redirect to login after a short delay so user sees success message
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      const msg = err?.response?.data?.message || t('register.error.general');
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('register.title')}</h1>
          <p className={styles.subtitle}>{t('register.subtitle')}</p>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {success && (
          <div style={{ padding: 12, background: '#e6ffed', border: '1px solid #c6f3d1', borderRadius: 8, marginBottom: 18 }}>
            {success} <Link to="/login" style={{ marginLeft: 8 }}>{t('login.signin')}</Link>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>{t('modal.fullName')}</label>
            <input
              type="text"
              required
              className={styles.input}
              placeholder={t('register.placeholder.name')}
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{t('login.username')}</label>
            <input
              type="text"
              required
              className={styles.input}
              placeholder={t('login.placeholder.username')}
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{t('modal.password')}</label>
            <input
              type="password"
              required
              className={styles.input}
              placeholder={t('login.placeholder.password')}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{t('register.phone')}</label>
            <input
              type="text"
              required
              className={styles.input}
              placeholder={t('register.placeholder.phone')}
              value={form.phoneNumber}
              onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{t('register.birth')}</label>
            <input
              type="date"
              required
              className={styles.input}
              value={form.birth}
              onChange={e => setForm({ ...form, birth: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{t('register.gender')}</label>
            <select
              className={styles.input}
              value={form.gender}
              onChange={e => setForm({ ...form, gender: e.target.value })}
              disabled={isLoading}
            >
              <option value="">{t('register.genderPlaceholder')}</option>
              <option value="male">{t('register.male')}</option>
              <option value="female">{t('register.female')}</option>
            </select>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? <span className={styles.loadingSpinner}>{t('register.submit')}...</span> : t('register.submit')}
          </button>
        </form>

        <div className={styles.divider}>
          <span>{t('login.or')}</span>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            {t('register.alreadyAccount')} <Link to="/login">{t('login.signin')}</Link>
          </p>
        </div>
      </div>

      <div className={styles.illustration}>
        <div className={styles.illustrationContent}>
          <h2>Start Learning Today</h2>
          <p>Access thousands of courses and expand your knowledge</p>
        </div>
      </div>
    </div>
  );
}
