import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthProvider';
import { useLanguage } from '../context/LanguageProvider';
import styles from './Dashboard.module.css';

// Child Components
import DashboardHeader from '../components/dashboard/DashboardHeader';
import CourseList from '../components/dashboard/CourseList';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [myCourses, setMyCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const isInstructor = user?.roles?.includes('ROLE_INSTRUCTOR');
  const isAdmin = user?.roles?.includes('ROLE_ADMIN');

  useEffect(() => {
    // Fetch user's enrolled courses
    const fetchMyCourses = async () => {
      if (!user?.id) return;
      try {
        const res = await api.get(`/students/${user.id}/courses`);
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
    // Fetch all available courses
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

  // Filter out enrolled courses from all courses
  const availableCourses = allCourses.filter(
    course => !myCourses.some(mc => mc.id === course.id)
  );

  return (
    <div className={styles.container}>
      {/* Welcome Banner */}
      <DashboardHeader user={user} isInstructor={isInstructor} />

      {/* My Courses Section */}
      {myCourses.length > 0 && (
        <>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('dashboard.myLearning')}</h2>
            {isInstructor && (
              <button
                className="btn-primary"
                onClick={() => alert("Please use the Admin Panel to create courses.")}
              >
                {t('admin.newCourse')}
              </button>
            )}
          </div>
          <CourseList courses={myCourses} loading={loading} />
        </>
      )}

      {/* All Courses Section */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {myCourses.length > 0 ? t('dashboard.discoverMore') : t('dashboard.allCourses')}
        </h2>
      </div>
      <CourseList courses={availableCourses} loading={loading} emptyMessage={t('dashboard.noCourses')} />
    </div>
  );
}