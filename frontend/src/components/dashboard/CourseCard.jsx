import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CourseCard.module.css';
import api from '../../api/axiosConfig';

export default function CourseCard({ course }) {
  const fallbackImage = 'https://hinhnen4k.com/wp-content/uploads/2023/06/hinh-nen-hoc-tap-30.jpg';
  const initialCount = course.studentsCount ?? (course.students ? course.students.length : undefined) ?? course.enrolled ?? course.enrollmentCount ?? null;
  const [studentCount, setStudentCount] = useState(initialCount ?? null);

  useEffect(() => {
    let cancelled = false;
    if (studentCount === null && course?.id) {
      api
        .get(`/courses/${course.id}/numberOfStudents`)
        .then((res) => {
          if (!cancelled && typeof res?.data === 'number') {
            setStudentCount(res.data);
          }
        })
        .catch(() => {
        });
    }
    return () => {
      cancelled = true;
    };
  }, [course?.id]);

  return (
    <Link to={`/course/${course.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img 
            src={course.imageUrl || fallbackImage} 
            alt={course.title}
            className={styles.courseImage}
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          />
          {course.badge && (
            <div className={styles.badge}>{course.badge}</div>
          )}
        </div>
        
        <div className={styles.content}>
          <h3 className={styles.title}>{course.title}</h3>
          <p className={styles.description}>
            {course.description || "Chưa có mô tả"}
          </p>
          
          <div className={styles.footer}>
            <div className={styles.meta}>
              {course.instructor && (
                <span className={styles.instructor}>
                  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {course.instructor}
                </span>
              )}
              {course.chapters?.length > 0 && (
                <span className={styles.lessons}>
                  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {course.chapters.length} chương
                </span>
              )}

              {studentCount !== null && (
                <span className={styles.students}>
                  <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 12a4 4 0 100-8 4 4 0 000 8z" />
                  </svg>
                  {studentCount} học viên
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}