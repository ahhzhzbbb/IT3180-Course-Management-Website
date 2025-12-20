import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div>
        <h3>{course.title}</h3>
        <p>{course.description || "No description provided."}</p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Link to={`/course/${course.id}`} style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ width: '100%' }}>
            Go to Course →
          </button>
        </Link>
      </div>
    </div>
  );
}