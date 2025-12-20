import React from 'react';

export function UserModal({ isOpen, onClose, onSave, form, setForm, isEdit, onRoleChange }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>{isEdit ? 'Edit User' : 'Create User'}</h3>
        <form onSubmit={onSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div><label>Username</label><input style={{ width: '100%', padding: 8, marginTop: 5, borderRadius: 6, border: '1px solid #ddd' }} required value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} /></div>
            <div><label>Full Name</label><input style={{ width: '100%', padding: 8, marginTop: 5, borderRadius: 6, border: '1px solid #ddd' }} required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
          </div>
          <div><label>Password {isEdit && <small>(Blank to keep)</small>}</label>
            <input style={{ width: '100%', padding: 8, marginTop: 5, borderRadius: 6, border: '1px solid #ddd' }} type="password" value={form.password} required={!isEdit} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          {!isEdit && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div><label>Phone</label><input style={{ width: '100%', padding: 8, marginTop: 5, borderRadius: 6, border: '1px solid #ddd' }} required value={form.phoneNumber} onChange={e => setForm({ ...form, phoneNumber: e.target.value })} /></div>
              <div><label>Birth Date</label><input style={{ width: '100%', padding: 8, marginTop: 5, borderRadius: 6, border: '1px solid #ddd' }} type="date" required value={form.birth} onChange={e => setForm({ ...form, birth: e.target.value })} /></div>
            </div>
          )}
          {!isEdit && (
            <div><label>Email</label><input style={{ width: '100%', padding: 8, marginTop: 5, borderRadius: 6, border: '1px solid #ddd' }} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
          )}
          <div><label>Roles</label>
            <div style={{ display: 'flex', gap: '15px', marginTop: '5px', padding: '10px', background: '#f9fafb', borderRadius: '6px' }}>
              {['ROLE_USER', 'ROLE_INSTRUCTOR', 'ROLE_ADMIN'].map(r => (
                <label key={r} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={form.roles.includes(r)} onChange={() => onRoleChange(r)} />
                  {r.replace('ROLE_', '')}
                </label>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>Save</button>
            <button type="button" onClick={onClose} style={{ flex: 1, background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CourseModal({ isOpen, onClose, onSave, form, setForm, isEdit }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>{isEdit ? 'Edit Course' : 'Create New Course'}</h3>
        <form onSubmit={onSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div><label>Course Title</label><input style={{ width: '100%', padding: 8, marginTop: 5, borderRadius: 6, border: '1px solid #ddd' }} required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
          <div><label>Description</label><textarea style={{ width: '100%', padding: 8, marginTop: 5, borderRadius: 6, border: '1px solid #ddd' }} rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>{isEdit ? 'Update' : 'Create'}</button>
            <button type="button" onClick={onClose} style={{ flex: 1, background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}