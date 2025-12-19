import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axiosConfig';

const InstructorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [createdCourses, setCreatedCourses] = useState([]);

  useEffect(() => {
    const fetchCreatedCourses = async () => {
      try {
        // GET /api/instructors/{instructorId}/courses
        const response = await api.get(`/instructors/${user.id}/courses`);
        setCreatedCourses(response.data.courses || []);
      } catch (error) {
        console.error("Failed to fetch instructor courses", error);
      }
    };

    if (user?.id) fetchCreatedCourses();
  }, [user]);

  return (
    <div>
      <h1>Instructor Panel: {user?.name}</h1>
      <button style={{ marginBottom: '20px' }}>+ Create New Course</button>

      <div className="course-grid">
        {createdCourses.map(course => (
          <div key={course.id} className="card">
            <h3>{course.title}</h3>
            <p>Students Enrolled: {course.studentCount || 0}</p>
            <button>Edit Course</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorDashboard;