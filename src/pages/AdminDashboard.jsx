import React, { useState } from 'react';
import styles from './AdminDashboard.module.css'; // Import the new module
import '../styles/global.css';

// Child Components
import AdminTabs from '../components/admin/AdminTabs';
import UserTable from '../components/admin/UserTable';
import CourseTable from '../components/admin/CourseTable';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
      </div>

      <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className={styles.content}>
        {activeTab === 'users' ? <UserTable /> : <CourseTable />}
      </div>
    </div>
  );
}