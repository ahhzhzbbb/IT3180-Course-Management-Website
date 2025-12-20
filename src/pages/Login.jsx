import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import '../styles/global.css';

export default function Login() {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <div className="modal-content" style={{ width: '400px', animation: 'fadeIn 0.5s ease' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#111827' }}>Sign In</h2>

        {error && <div style={{ color: '#ef4444', textAlign: 'center', marginBottom: '10px' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#374151' }}>Username</label>
            <input
              type="text"
              required
              style={{ width: '100%' }}
              value={creds.username}
              onChange={e => setCreds({ ...creds, username: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#374151' }}>Password</label>
            <input
              type="password"
              required
              style={{ width: '100%' }}
              value={creds.password}
              onChange={e => setCreds({ ...creds, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Login</button>
        </form>
      </div>
    </div>
  );
}