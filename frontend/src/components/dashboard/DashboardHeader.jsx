import React from 'react';
import styles from './DashboardHeader.module.css';

export default function DashboardHeader({ user, isInstructor }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        {`Chào mừng trở lại, ${user?.name || user?.username}!`}
      </h1>
    </div>
  );
}