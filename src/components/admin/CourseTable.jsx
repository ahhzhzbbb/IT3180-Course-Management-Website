import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import { CourseModal } from './AdminModals';
import EnrollmentModal from './EnrollmentModal';
import styles from './Tables.module.css';

export default function CourseTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({ title: '', description: '' });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollmentData, setEnrollmentData] = useState({ students: [], instructors: [], allUsers: [] });
  const [studentIdToAdd, setStudentIdToAdd] = useState('');
  const [instructorIdToAdd, setInstructorIdToAdd] = useState('');

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/courses');
      setCourses(res.data.courses || res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleOpenCreate = () => { setEditingCourse(null); setCourseForm({ title: '', description: '' }); setIsModalOpen(true); };
  const handleOpenEdit = (course) => { setEditingCourse(course); setCourseForm({ title: course.title || '', description: course.description || '' }); setIsModalOpen(true); };
  const handleSave = async (e) => { e.preventDefault(); try { if (editingCourse) await api.put(`/courses/${editingCourse.id}`, courseForm); else await api.post('/courses', courseForm); setIsModalOpen(false); fetchCourses(); } catch (err) { alert("Failed to save course."); } };
  const handleDelete = async (id) => { if (!window.confirm("Delete course?")) return; try { await api.delete(`/courses/${id}`); fetchCourses(); } catch (err) { alert("Failed to delete"); } };

  const handleOpenEnrollment = async (course) => {
    setSelectedCourse(course);
    try {
      const [all, stu, inst] = await Promise.all([
        api.get('/users'), api.get(`/courses/${course.id}/students`), api.get(`/courses/${course.id}/instructors`)
      ]);
      setEnrollmentData({ allUsers: all.data.users || [], students: stu.data.users || [], instructors: inst.data.users || [] });
    } catch (e) { console.error(e); }
  };

  const handleAddPerson = async (type, id) => { if (!id) return; const endpoint = type === 'student' ? 'students' : 'instructors'; try { await api.post(`/courses/${selectedCourse.id}/${endpoint}/${id}`); handleOpenEnrollment(selectedCourse); if (type === 'student') setStudentIdToAdd(''); else setInstructorIdToAdd(''); } catch (err) { alert("Failed to add user"); } };
  const handleRemovePerson = async (type, id) => { const endpoint = type === 'student' ? 'students' : 'instructors'; try { await api.delete(`/courses/${selectedCourse.id}/${endpoint}/${id}`); setEnrollmentData(prev => ({ ...prev, [type === 'student' ? 'students' : 'instructors']: prev[type === 'student' ? 'students' : 'instructors'].filter(u => u.id !== id) })); } catch (err) { alert("Failed to remove user"); } };

  if (loading) return <div>Loading Courses...</div>;

  return (
    <>
      <div className={styles.header}>
        <button className="btn-primary" onClick={handleOpenCreate}>+ New Course</button>
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
                <button className="btn-icon btn-edit" onClick={() => handleOpenEdit(c)}>✏️</button>
                <button className="btn-icon btn-delete" onClick={() => handleDelete(c.id)}>🗑️</button>
                <button className="btn-icon" onClick={() => handleOpenEnrollment(c)} style={{ fontSize: '0.9rem' }}>👥</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CourseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} form={courseForm} setForm={setCourseForm} isEdit={!!editingCourse} />
      {selectedCourse && (
        <EnrollmentModal
          course={selectedCourse} onClose={() => setSelectedCourse(null)}
          instructors={enrollmentData.instructors} students={enrollmentData.students} allUsers={enrollmentData.allUsers}
          instructorIdToAdd={instructorIdToAdd} setInstructorIdToAdd={setInstructorIdToAdd}
          studentIdToAdd={studentIdToAdd} setStudentIdToAdd={setStudentIdToAdd}
          onAddInstructor={() => handleAddPerson('instructor', instructorIdToAdd)}
          onRemoveInstructor={(id) => handleRemovePerson('instructor', id)}
          onAddStudent={() => handleAddPerson('student', studentIdToAdd)}
          onRemoveStudent={(id) => handleRemovePerson('student', id)}
          getUserLabel={(u) => `${u.name || u.username} (ID: ${u.id})`}
        />
      )}
    </>
  );
}