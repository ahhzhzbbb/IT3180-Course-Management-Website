import React from 'react';
import CourseCard from './CourseCard';

export default function CourseList({ courses, loading }) {
  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
        Loading courses...
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="course-grid">
        <div className="empty-state">
          <p>You haven't enrolled in any courses yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="course-grid">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}