import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../../api/axiosConfig';
import { CourseModal } from './AdminModals';
import styles from './Tables.module.css';

export default function CourseTable() {
  const navigate = useNavigate(); 

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({ title: '', description: '' });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/courses?pageNumber=${page}&pageSize=${pageSize}`);

      if (res.data.courses) {
        setCourses(res.data.courses);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
      } else {
        setCourses(res.data);
        setTotalElements(res.data.length);
        setTotalPages(1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [page, pageSize]);

  const handleOpenCreate = () => {
    setEditingCourse(null);
    setCourseForm({ title: '', description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setCourseForm({ title: course.title || '', description: course.description || '' });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) await api.put(`/courses/${editingCourse.id}`, courseForm);
      else await api.post('/courses', courseForm);
      setIsModalOpen(false);
      fetchCourses();
    } catch (err) {
      alert("Failed to save course.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete course?")) return;
    try {
      await api.delete(`/courses/${id}`);
      fetchCourses();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const handleManageEnrollment = (courseId) => {
    navigate(`/admin/course/${courseId}/enrollment`);
  };

  const handlePrevPage = () => { if (page > 0) setPage(p => p - 1); };
  const handleNextPage = () => { if (page < totalPages - 1) setPage(p => p + 1); };

  if (loading && page === 0 && courses.length === 0) return <div>Loading Courses...</div>;

  return (
    <>
      <div className={styles.header}>
        <button className="btn-primary" onClick={handleOpenCreate}>+ New Course</button>
        <div className={styles.stats}>
          <span>Total Courses: {totalElements}</span>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr><th>ID</th><th>Title</th><th className={styles.actions}>Actions</th></tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td style={{ fontWeight: '500' }}>{c.title}</td>
              <td className={styles.actions}>
                <button className="btn-icon btn-edit" onClick={() => handleOpenEdit(c)} title="Edit">✏️</button>
                <button className="btn-icon btn-delete" onClick={() => handleDelete(c.id)} title="Delete">🗑️</button>

                <button
                  className="btn-icon"
                  onClick={() => handleManageEnrollment(c.id)}
                  title="Manage Students & Instructors"
                  style={{ fontSize: '0.9rem' }}
                >
                  👥
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <div className={styles.rowsPerPage}>
          <label>Rows per page:</label>
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(0); }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className={styles.pageControls}>
          <button onClick={handlePrevPage} disabled={page === 0} className="btn-secondary">
            Previous
          </button>
          <span className={styles.pageInfo}>
            Page {page + 1} of {totalPages === 0 ? 1 : totalPages}
          </span>
          <button onClick={handleNextPage} disabled={page >= totalPages - 1} className="btn-secondary">
            Next
          </button>
        </div>
      </div>

      <CourseModal
        isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave}
        form={courseForm} setForm={setCourseForm} isEdit={!!editingCourse}
      />

    </>
  );
}