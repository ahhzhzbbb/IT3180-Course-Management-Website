import React from 'react';
import styles from './AdminTabs.module.css';

export default function AdminTabs({ activeTab, setActiveTab }) {
  
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.btn} ${activeTab === 'courses' ? styles.active : ''}`}
        onClick={() => setActiveTab('courses')}
      >
        Khóa Học
      </button>
      <button
        className={`${styles.btn} ${activeTab === 'users' ? styles.active : ''}`}
        onClick={() => setActiveTab('users')}
      >
        Người Dùng
      </button>
      <button
        className={`${styles.btn} ${activeTab === 'settings' ? styles.active : ''}`}
      >
        Khôi phục
      </button>
    </div>
  );
}