import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import { UserModal } from './AdminModals';
import styles from './Tables.module.css';

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [page, setPage] = useState(0); // Backend starts at 0
  const [pageSize, setPageSize] = useState(5); // Adjust default as needed
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({
    username: '', password: '', name: '', email: '',
    phoneNumber: '', birth: '', gender: true, roles: ['ROLE_USER']
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Updated to match UserController @RequestParam(name = "pageNumber")
      const res = await api.get(`/users?pageNumber=${page}&pageSize=${pageSize}`);

      // Match UserResponse.java structure
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch whenever page or pageSize changes
  useEffect(() => {
    fetchUsers();
  }, [page, pageSize]);

  const handleOpenCreate = () => {
    setEditingUser(null);
    setUserForm({ username: '', password: '', name: '', email: '', phoneNumber: '', birth: '', gender: true, roles: ['ROLE_USER'] });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setUserForm({
      username: user.username || '', password: '', name: user.name || '', email: user.email || '',
      phoneNumber: user.phoneNumber || '', birth: user.birth || '', gender: user.gender !== undefined ? user.gender : true,
      roles: user.roles || ['ROLE_USER']
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const cleanRoles = userForm.roles.map(r => r.replace('ROLE_', '').toLowerCase());
      if (editingUser) {
        const payload = { username: userForm.username, name: userForm.name, roles: cleanRoles };
        if (userForm.password) payload.password = userForm.password;
        await api.put(`/users/${editingUser.id}`, payload);
      } else {
        const payload = { ...userForm, roles: cleanRoles, gender: userForm.gender === 'true' };
        await api.post('/users', payload);
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      alert("Failed to save user.");
    }
  };

  const handleRoleChange = (role) => {
    setUserForm(prev => ({
      ...prev,
      roles: prev.roles.includes(role) ? prev.roles.filter(r => r !== role) : [...prev.roles, role]
    }));
  };

  // Pagination Handlers
  const handlePrevPage = () => {
    if (page > 0) setPage(p => p - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(p => p + 1);
  };

  const getRoleClass = (r) => {
    if (r === 'ROLE_ADMIN') return styles.admin;
    if (r === 'ROLE_INSTRUCTOR') return styles.instructor;
    return styles.user;
  };

  if (loading && page === 0 && users.length === 0) return <div>Loading Users...</div>;

  return (
    <>
      <div className={styles.header}>
        <button className="btn-primary" onClick={handleOpenCreate}>+ Add User</button>
        <div className={styles.stats}>
          <span>Total Users: {totalElements}</span>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr><th>ID</th><th>Username</th><th>Name</th><th>Roles</th><th className={styles.actions}>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td><strong>{u.username}</strong></td>
              <td>{u.name || '-'}</td>
              <td>
                {u.roles?.map(r => (
                  <span key={r} className={`${styles.roleTag} ${getRoleClass(r)}`}>
                    {r.replace('ROLE_', '')}
                  </span>
                ))}
              </td>
              <td className={styles.actions}>
                <button className="btn-icon btn-edit" onClick={() => handleOpenEdit(u)}>✏️</button>
                <button className="btn-icon btn-delete" onClick={() => handleDelete(u.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Footer */}
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
          <button
            onClick={handlePrevPage}
            disabled={page === 0}
            className="btn-secondary"
          >
            Previous
          </button>

          <span className={styles.pageInfo}>
            Page {page + 1} of {totalPages === 0 ? 1 : totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={page >= totalPages - 1}
            className="btn-secondary"
          >
            Next
          </button>
        </div>
      </div>

      <UserModal
        isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave}
        form={userForm} setForm={setUserForm} isEdit={!!editingUser} onRoleChange={handleRoleChange}
      />
    </>
  );
}