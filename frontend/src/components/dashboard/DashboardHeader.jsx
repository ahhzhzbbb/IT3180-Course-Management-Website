import React from 'react';
import { useLanguage } from '../../context/LanguageProvider';
import styles from './DashboardHeader.module.css';

export default function DashboardHeader({ user, isInstructor }) {
  const { t } = useLanguage();
  
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        {t('dashboard.welcome', { name: user?.name || user?.username })}
      </h1>
    </div>
  );
}