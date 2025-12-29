import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthProvider';
import styles from './Dashboard.module.css';

import DashboardHeader from '../components/dashboard/DashboardHeader';
import CourseList from '../components/dashboard/CourseList';

export default function Dashboard() {
  const { user } = useAuth();
  const [myCourses, setMyCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const isInstructor = user?.roles?.includes('ROLE_INSTRUCTOR');
  const isAdmin = user?.roles?.includes('ROLE_ADMIN');

  useEffect(() => {
    const fetchMyCourses = async () => {
      if (!user?.id) return;
      try {
        const res = await api.get(`/me/courses`);
        const courseList = res.data?.courses || res.data || [];
        setMyCourses(Array.isArray(courseList) ? courseList : []);
      } catch (err) {
        console.error('Error fetching my courses:', err);
        setMyCourses([]);
      }
    };

    fetchMyCourses();
  }, [user]);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await api.get('/courses');
        const courseList = res.data?.courses || res.data || [];
        setAllCourses(Array.isArray(courseList) ? courseList : []);
      } catch (err) {
        console.error('Error fetching all courses:', err);
        setAllCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCourses();
  }, []);

  const availableCourses = allCourses.filter(
    course => !myCourses.some(mc => mc.id === course.id)
  );

  return (
    <div className={styles.container}>
      <DashboardHeader user={user} isInstructor={isInstructor} />

      {myCourses.length > 0 && (
        <>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Khóa Học Của Tôi</h2>
          </div>
          <CourseList courses={myCourses} loading={loading} />
        </>
      )}

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {myCourses.length > 0 ? 'Khám Phá Thêm' : 'Tất Cả Khóa Học'}
        </h2>
      </div>
      <CourseList courses={availableCourses} loading={loading} emptyMessage={'Không có khóa học nào'} />
    </div>
  );
}