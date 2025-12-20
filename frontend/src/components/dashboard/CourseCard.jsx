import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CourseCard.module.css';

export default function CourseCard({ course }) {
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.description}>
          {course.description || "No description provided."}
        </p>
      </div>
      <div className={styles.actions}>
        <Link to={`/course/${course.id}`} style={{ textDecoration: 'none' }}>
          {/* Reusing global 'btn-primary' but adding local width utility */}
          <button className={`btn-primary ${styles.btnFull}`}>
            Go to Course →
          </button>
        </Link>
      </div>
    </div>
  );
}