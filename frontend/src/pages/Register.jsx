import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import styles from './Login.module.css';

export default function Register() {
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
      const payload = {
        username: form.username,
        password: form.password,
        name: form.name,
        phoneNumber: form.phoneNumber,
        birth: form.birth,
        gender: form.gender === 'male' ? true : form.gender === 'female' ? false : null
      };

      await api.post('/auth/signup', payload);

      setSuccess('Đăng ký thành công! Đang chuyển tới trang đăng nhập...');

      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Tạo Tài Khoản</h1>
          <p className={styles.subtitle}>Tạo tài khoản mới để bắt đầu học tập</p>
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
            {success} <Link to="/login" style={{ marginLeft: 8 }}>Đăng Nhập</Link>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Họ Tên</label>
            <input
              type="text"
              required
              className={styles.input}
              placeholder={'Nhập họ tên'}
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Tên đăng nhập</label>
            <input
              type="text"
              required
              className={styles.input}
              placeholder={'Nhập tên đăng nhập'}
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Mật Khẩu</label>
            <input
              type="password"
              required
              className={styles.input}
              placeholder={'Nhập mật khẩu'}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Số điện thoại</label>
            <input
              type="text"
              required
              className={styles.input}
              placeholder={'Nhập số điện thoại (10 chữ số)'}
              value={form.phoneNumber}
              onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Ngày sinh</label>
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
            <label className={styles.label}>Giới tính</label>
            <select
              className={styles.input}
              value={form.gender}
              onChange={e => setForm({ ...form, gender: e.target.value })}
              disabled={isLoading}
            >
              <option value="">Chọn giới tính...</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? <span className={styles.loadingSpinner}>Đăng Ký...</span> : 'Đăng Ký'}
          </button>
        </form>

        <div className={styles.divider}>
          <span>hoặc</span>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Đã có tài khoản? <Link to="/login">Đăng Nhập</Link>
          </p>
        </div>
      </div>

      <div className={styles.illustration}>
        <div className={styles.illustrationContent}>
          <h2>Bắt Đầu Học Ngay Hôm Nay</h2>
          <p>Truy cập hàng ngàn khóa học và mở rộng kiến thức của bạn</p>
        </div>
      </div>
    </div>
  );
}
