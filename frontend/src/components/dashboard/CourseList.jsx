import React from 'react';
import CourseCard from './CourseCard';
import styles from './CourseList.module.css';

export default function CourseList({ courses, loading }) {
  if (loading) {
    return <div className={styles.loading}>Loading courses...</div>;
  }

  if (courses.length === 0) {
    return (
      <div className={styles.grid}>
        <div className={styles.emptyState}>
          <p>You haven't enrolled in any courses yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}