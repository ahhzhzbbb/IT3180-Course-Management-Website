import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import api from '../api/axiosConfig';
import styles from './Profile.module.css';

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [form, setForm] = useState({
    name: '',
    username: '',
    phoneNumber: '',
    birth: '',
    gender: '',
    state: ''
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await api.get('/auth/user');
        if (!mounted) return;
        const u = res.data;
        setForm({
          name: u.name || '',
          username: u.username || '',
          phoneNumber: u.phoneNumber || '',
          birth: u.birth || '',
          gender: u.gender === null ? '' : String(u.gender),
          state: u.state || ''
        });
      } catch (e) {
        console.error(e);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        phoneNumber: form.phoneNumber,
        birth: form.birth || null,
        gender: form.gender === '' ? null : form.gender === 'true',
        state: form.state
      };
      await api.put('/users/me', payload);
      setMessage({ type: 'success', text: 'Profile updated' });
      if (refreshUser) await refreshUser();
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed' });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Profile</h2>
      {message && (
        <div role="alert" aria-live="polite" className={message.type === 'success' ? styles.success : styles.error}>{message.text}</div>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} />
        </label>

        <label>
          Username
          <input name="username" value={form.username} readOnly />
        </label>

        <label>
          Phone
          <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
        </label> 
        <label>
          Birth
          <input name="birth" type="date" value={form.birth ? form.birth : ''} onChange={handleChange} />
        </label>

        <label>
          Gender
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">--</option>
            <option value="true">Male</option>
            <option value="false">Female</option>
          </select>
        </label>

        <label>
          State
          <input name="state" value={form.state} onChange={handleChange} />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
