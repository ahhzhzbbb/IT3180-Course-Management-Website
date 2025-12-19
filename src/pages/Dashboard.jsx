import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth(); // Get logout function
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // For redirection

  // --- LOGOUT HANDLER ---
  const handleLogout = () => {
    logout();            // 1. Clear context and local storage
    navigate('/login');  // 2. Redirect to login page
  };

  useEffect(() => {
    // ... your existing fetch logic ...
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
      .catch(err => console.error(err));
  }, []);

  const isInstructor = user?.roles?.includes('ROLE_INSTRUCTOR');

  return (
    <div className="dashboard">
      {/* HEADER SECTION */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #ddd'
      }}>
        <div>
          <h1>Welcome, {user?.name || user?.username}</h1>
          <p style={{ color: '#666' }}>Role: {isInstructor ? 'Instructor' : 'Student'}</p>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#ff4d4d',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '5px'
          }}
        >
          Logout
        </button>
      </header>

      <section style={{ padding: '20px' }}>
        <h2>Your Courses</h2>
        {/* ... rest of your course grid ... */}
        {isInstructor && <button>+ Create New Course</button>}

        <div className="course-grid">
          {courses.length > 0 ? (
            courses.map(course => (
              <div key={course.id} className="course-card" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <Link to={`/course/${course.id}`}>
                  <button>View Course</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No courses found.</p>
          )}
        </div>
      </section>
    </div>
  );
}