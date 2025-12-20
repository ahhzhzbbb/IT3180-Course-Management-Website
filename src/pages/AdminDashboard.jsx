import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import '../styles/global.css';

// Child Components
import AdminTabs from '../components/admin/AdminTabs';
import UserTable from '../components/admin/UserTable';
import CourseTable from '../components/admin/CourseTable';
import { UserModal, CourseModal } from '../components/admin/AdminModals';
import EnrollmentModal from '../components/admin/EnrollmentModal';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('courses');
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- MODAL STATES ---
  const [selectedCourse, setSelectedCourse] = useState(null); // For enrollment
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [assignedInstructors, setAssignedInstructors] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [studentIdToAdd, setStudentIdToAdd] = useState('');
  const [instructorIdToAdd, setInstructorIdToAdd] = useState('');

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({ username: '', password: '', name: '', email: '', phoneNumber: '', birth: '', gender: true, roles: ['ROLE_USER'] });

  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({ title: '', description: '' });

  // --- FETCH DATA ---
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        const res = await api.get('/users');
        setUsers(res.data.users || res.data);
      } else {
        const res = await api.get('/courses');
        setCourses(res.data.courses || res.data);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  // --- HANDLERS: USERS ---
  const openCreateUserModal = () => {
    setEditingUser(null);
    setUserForm({ username: '', password: '', name: '', email: '', phoneNumber: '', birth: '', gender: true, roles: ['ROLE_USER'] });
    setIsUserModalOpen(true);
  };

  const openEditUserModal = (user) => {
    setEditingUser(user);
    setUserForm({
      username: user.username || '', password: '', name: user.name || '', email: user.email || '',
      phoneNumber: user.phoneNumber || '', birth: user.birth || '', gender: user.gender !== undefined ? user.gender : true,
      roles: user.roles || ['ROLE_USER']
    });
    setIsUserModalOpen(true);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    try {
      const cleanRoles = userForm.roles.map(r => r.replace('ROLE_', '').toLowerCase());
      if (editingUser) {
        const payload = { username: userForm.username, name: userForm.name, roles: cleanRoles };
        if (userForm.password && userForm.password.trim() !== "") payload.password = userForm.password;
        await api.put(`/users/${editingUser.id}`, payload);
        alert("User updated successfully!");
      } else {
        const payload = { ...userForm, roles: cleanRoles, gender: userForm.gender === 'true' || userForm.gender === true };
        await api.post('/users', payload);
        alert("User created successfully!");
      }
      setIsUserModalOpen(false);
      fetchData();
    } catch (err) { console.error(err); alert("Failed to save user."); }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await api.delete(`/users/${id}`).then(fetchData);
  };

  const handleRoleChange = (role) => {
    setUserForm(prev => ({
      ...prev,
      roles: prev.roles.includes(role) ? prev.roles.filter(r => r !== role) : [...prev.roles, role]
    }));
  };

  // --- HANDLERS: COURSES ---
  const openCreateCourseModal = () => {
    setEditingCourse(null);
    setCourseForm({ title: '', description: '' });
    setIsCourseModalOpen(true);
  };

  const openEditCourseModal = (course) => {
    setEditingCourse(course);
    setCourseForm({ title: course.title || '', description: course.description || '' });
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await api.put(`/courses/${editingCourse.id}`, courseForm);
        alert("Course updated!");
      } else {
        await api.post('/courses', courseForm);
        alert("Course created!");
      }
      setIsCourseModalOpen(false);
      fetchData();
    } catch (err) { console.error(err); alert("Failed to save course."); }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try { await api.delete(`/courses/${id}`); fetchData(); } catch (err) { alert("Failed to delete course"); }
  };

  // --- HANDLERS: ENROLLMENT ---
  const openEnrollmentModal = async (course) => {
    setSelectedCourse(course);
    try {
      const [all, stu, inst] = await Promise.all([
        api.get('/users'), api.get(`/courses/${course.id}/students`), api.get(`/courses/${course.id}/instructors`)
      ]);
      setAllUsers(all.data.users || []);
      setEnrolledStudents(stu.data.users || []);
      setAssignedInstructors(inst.data.users || []);
    } catch (e) { console.error(e); }
  };

  const handleAddStudent = async () => {
    if (!studentIdToAdd) return;
    await api.post(`/courses/${selectedCourse.id}/students/${studentIdToAdd}`).then(() => openEnrollmentModal(selectedCourse));
    setStudentIdToAdd('');
  };
  const handleRemoveStudent = async (id) => {
    await api.delete(`/courses/${selectedCourse.id}/students/${id}`);
    setEnrolledStudents(prev => prev.filter(u => u.id !== id));
  };
  const handleAddInstructor = async () => {
    if (!instructorIdToAdd) return;
    await api.post(`/courses/${selectedCourse.id}/instructors/${instructorIdToAdd}`).then(() => openEnrollmentModal(selectedCourse));
    setInstructorIdToAdd('');
  };
  const handleRemoveInstructor = async (id) => {
    await api.delete(`/courses/${selectedCourse.id}/instructors/${id}`);
    setAssignedInstructors(prev => prev.filter(u => u.id !== id));
  };

  const getUserLabel = (u) => `${u.name ? u.name : u.username} (ID: ${u.id})`;

  // --- RENDER ---
  return (
    <div className="admin-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2rem' }}>Admin Dashboard</h1>
      </div>

      <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {loading && <div style={{ padding: 20 }}>Loading data...</div>}

      {!loading && activeTab === 'users' && (
        <UserTable
          users={users}
          onCreate={openCreateUserModal}
          onEdit={openEditUserModal}
          onDelete={handleDeleteUser}
        />
      )}

      {!loading && activeTab === 'courses' && (
        <CourseTable
          courses={courses}
          onCreate={openCreateCourseModal}
          onEdit={openEditCourseModal}
          onDelete={handleDeleteCourse}
          onManage={openEnrollmentModal}
        />
      )}

      {/* MODALS */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleSaveUser}
        form={userForm} setForm={setUserForm}
        isEdit={editingUser !== null}
        onRoleChange={handleRoleChange}
      />

      <CourseModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onSave={handleSaveCourse}
        form={courseForm} setForm={setCourseForm}
        isEdit={editingCourse !== null}
      />

      {selectedCourse && (
        <EnrollmentModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          instructors={assignedInstructors}
          students={enrolledStudents}
          allUsers={allUsers}
          instructorIdToAdd={instructorIdToAdd} setInstructorIdToAdd={setInstructorIdToAdd}
          onAddInstructor={handleAddInstructor} onRemoveInstructor={handleRemoveInstructor}
          studentIdToAdd={studentIdToAdd} setStudentIdToAdd={setStudentIdToAdd}
          onAddStudent={handleAddStudent} onRemoveStudent={handleRemoveStudent}
          getUserLabel={getUserLabel}
        />
      )}
    </div>
  );
}