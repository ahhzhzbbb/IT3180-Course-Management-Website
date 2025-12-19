import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../../api/endpoints';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getAll();
        // Check if response.data.courses exists, otherwise default to empty array
        setCourses(response.data.courses || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load courses. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h1>Available Courses</h1>

      {courses.length === 0 ? (
        <p>No courses found. Check your database!</p>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <div key={course.id} className="card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <Link to={`/courses/${course.id}`}>View Course</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;