import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import styles from './CourseEnrollment.module.css';

export default function CourseEnrollment() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('student'); // 'student' or 'instructor'

  // -- LEFT SIDE: Enrolled Users --
  const [enrolled, setEnrolled] = useState([]);
  const [enrolledPage, setEnrolledPage] = useState(0);
  const [enrolledTotal, setEnrolledTotal] = useState(0);

  // -- RIGHT SIDE: Available Users --
  const [available, setAvailable] = useState([]);
  const [availablePage, setAvailablePage] = useState(0);
  const [availableTotal, setAvailableTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Fetch Basic Course Info
  useEffect(() => {
    api.get(`/courses/${courseId}`)
      .then(res => setCourse(res.data))
      .catch(err => console.error("Error fetching course:", err));
  }, [courseId]);

  // 2. Fetch Enrolled Users (Paginated)
  const fetchEnrolled = useCallback(async () => {
    try {
      const endpoint = activeTab === 'student' ? 'students' : 'instructors';
      const res = await api.get(`/courses/${courseId}/${endpoint}?pageNumber=${enrolledPage}&pageSize=10`);

      // Handle response structure
      const data = res.data.users ? res.data : { users: res.data, totalPages: 1 };

      setEnrolled(data.users || []);
      setEnrolledTotal(data.totalPages || 0);
    } catch (err) { console.error(err); }
  }, [courseId, activeTab, enrolledPage]);

  // 3. Fetch Available Users (Paginated)
  // Ideally, backend should support filtering "NOT IN Course". 
  // For now, we fetch users and filter purely visually on client side or just show all.
  const fetchAvailable = useCallback(async () => {
    try {
      // Backend should ideally support searching by name/email
      // e.g. /users?role=ROLE_USER&search=${searchTerm}
      const res = await api.get(`/users?pageNumber=${availablePage}&pageSize=10`);

      const data = res.data.users ? res.data : { users: res.data, totalPages: 1 };

      // Simple client-side role filter for display
      const targetRole = activeTab === 'student' ? 'ROLE_USER' : 'ROLE_INSTRUCTOR';
      const filtered = (data.users || []).filter(u => u.roles.includes(targetRole));

      // Filter by search term if provided (client side for now)
      const searched = searchTerm
        ? filtered.filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()))
        : filtered;

      setAvailable(searched);
      setAvailableTotal(data.totalPages || 0);
    } catch (err) { console.error(err); }
  }, [availablePage, activeTab, searchTerm]);

  useEffect(() => { fetchEnrolled(); }, [fetchEnrolled]);
  useEffect(() => { fetchAvailable(); }, [fetchAvailable]);

  // Actions
  const handleAdd = async (userId) => {
    try {
      const endpoint = activeTab === 'student' ? 'students' : 'instructors';
      await api.post(`/courses/${courseId}/${endpoint}/${userId}`);
      fetchEnrolled(); // Refresh list immediately
    } catch (err) { alert("Failed to enroll user. They might already be added."); }
  };

  const handleRemove = async (userId) => {
    if (!window.confirm("Remove user from course?")) return;
    try {
      const endpoint = activeTab === 'student' ? 'students' : 'instructors';
      await api.delete(`/courses/${courseId}/${endpoint}/${userId}`);
      fetchEnrolled();
    } catch (err) { alert("Failed to remove user"); }
  };

  if (!course) return <div className={styles.loading}>Loading Course Data...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className="btn-secondary" onClick={() => navigate('/admin')}>&larr; Back</button>
        <div className={styles.headerInfo}>
          <h2>{course.title}</h2>
          <span className={styles.subtitle}>Quản lý đăng ký</span>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={activeTab === 'student' ? styles.activeTab : ''}
          onClick={() => { setActiveTab('student'); setEnrolledPage(0); }}
        >
          Quản lý học sinh
        </button>
        <button
          className={activeTab === 'instructor' ? styles.activeTab : ''}
          onClick={() => { setActiveTab('instructor'); setEnrolledPage(0); }}
        >
          Quản lý giáo viên
        </button>
      </div>

      <div className={styles.splitView}>
        {/* LEFT: ENROLLED USERS */}
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>
            Hiện tại đã đăng ký ({activeTab}s)
          </h3>
          <div className={styles.tableWrapper}>
            <table className={styles.miniTable}>
              <tbody>
                {enrolled.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div className={styles.userInfo}>
                        <span className={styles.userName}>{u.username}</span>
                        <span className={styles.userEmail}>{u.email}</span>
                      </div>
                    </td>
                    <td align="right">
                      <button className="btn-icon btn-delete" onClick={() => handleRemove(u.id)}>✖</button>
                    </td>
                  </tr>
                ))}
                {enrolled.length === 0 && <tr><td className={styles.empty}>No users enrolled yet.</td></tr>}
              </tbody>
            </table>
          </div>
          <div className={styles.pagination}>
            <button disabled={enrolledPage === 0} onClick={() => setEnrolledPage(p => p - 1)}>&lt;</button>
            <span>Page {enrolledPage + 1}</span>
            <button disabled={enrolledPage >= enrolledTotal - 1} onClick={() => setEnrolledPage(p => p + 1)}>&gt;</button>
          </div>
        </div>

        {/* RIGHT: AVAILABLE USERS */}
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Thêm mới {activeTab}</h3>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên..."
            className={styles.searchBar}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className={styles.tableWrapper}>
            <table className={styles.miniTable}>
              <tbody>
                {available.map(u => {
                  const isAlreadyEnrolled = enrolled.some(e => e.id === u.id);
                  return (
                    <tr key={u.id} className={isAlreadyEnrolled ? styles.disabledRow : ''}>
                      <td>
                        <div className={styles.userInfo}>
                          <span className={styles.userName}>{u.username}</span>
                          <small>{u.email}</small>
                        </div>
                      </td>
                      <td align="right">
                        {isAlreadyEnrolled ? (
                          <span className={styles.badge}>Added</span>
                        ) : (
                          <button className="btn-primary" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={() => handleAdd(u.id)}>
                            Add +
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={styles.pagination}>
            <button disabled={availablePage === 0} onClick={() => setAvailablePage(p => p - 1)}>&lt;</button>
            <span>Page {availablePage + 1}</span>
            <button disabled={availablePage >= availableTotal - 1} onClick={() => setAvailablePage(p => p + 1)}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}