import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthProvider';
import styles from './Dashboard.module.css';

// Child Components
import DashboardHeader from '../components/dashboard/DashboardHeader';
import CourseList from '../components/dashboard/CourseList';

export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const isInstructor = user?.roles?.includes('ROLE_INSTRUCTOR');

  useEffect(() => {
    setLoading(true);
    api.get('/me/courses')
      .then(res => {
        let courseList = [];
        if (res.data && Array.isArray(res.data.courses)) {
          courseList = res.data.courses;
        } else if (Array.isArray(res.data)) {
          courseList = res.data;
        }
        setCourses(courseList);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.container}>

      {/* 1. Welcome Banner */}
      <DashboardHeader user={user} isInstructor={isInstructor} />

      {/* 2. Section Title & Actions */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>My Courses</h2>

        {isInstructor && (
          <button
            className="btn-primary"
            onClick={() => alert("To create a course, please go to the Admin Panel.")}
          >
            + Create New Course
          </button>
        )}
      </div>

      {/* 3. Course Grid */}
      <CourseList courses={courses} loading={loading} />

    </div>
  );
}