import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(creds.username, creds.password);
    if (success) {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={creds.username}
          onChange={e => setCreds({ ...creds, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={creds.password}
          onChange={e => setCreds({ ...creds, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}