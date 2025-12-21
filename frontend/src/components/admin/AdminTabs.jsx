import React from 'react';
import { useLanguage } from '../../context/LanguageProvider';
import styles from './AdminTabs.module.css';

export default function AdminTabs({ activeTab, setActiveTab }) {
  const { t } = useLanguage();
  
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.btn} ${activeTab === 'courses' ? styles.active : ''}`}
        onClick={() => setActiveTab('courses')}
      >
        {t('admin.courses')}
      </button>
      <button
        className={`${styles.btn} ${activeTab === 'users' ? styles.active : ''}`}
        onClick={() => setActiveTab('users')}
      >
        {t('admin.users')}
      </button>
    </div>
  );
}