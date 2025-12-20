import React from 'react';
import styles from './DashboardHeader.module.css';

export default function DashboardHeader({ user, isInstructor }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Welcome back, {user?.name || user?.username}!</h1>
      <p className={styles.subtitle}>
        You are logged in as an <strong>{isInstructor ? 'Instructor' : 'Student'}</strong>.
      </p>
    </div>
  );
}