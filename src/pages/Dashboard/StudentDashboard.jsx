import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axiosConfig';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        console.log("1. Sending request to /me/courses..."); // DEBUG
        const response = await api.get('/me/courses');

        console.log("2. Raw Response:", response); // DEBUG
        console.log("3. Data received:", response.data); // DEBUG

        // Ensure we are accessing the array correctly
        if (response.data && response.data.courses) {
          setMyCourses(response.data.courses);
          console.log("4. State updated with:", response.data.courses); // DEBUG
        } else {
          console.warn("5. 'courses' key missing in response!", response.data);
        }

      } catch (error) {
        console.error("X. Request Failed:", error);
        // If error is 401, your token is invalid or missing
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []); // Removed 'user' dependency since the token handles identity

  if (loading) return <div>Loading your courses...</div>;

  return (
    <div className="dashboard">
      <h1>My Learning Dashboard</h1>
      {myCourses.length === 0 ? (
        <div className="empty-state">
          <p>You are not enrolled in any courses yet.</p>
        </div>
      ) : (
        <div className="course-grid">
          {myCourses.map(course => (
            <div key={course.id} className="card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button>Continue Learning</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;