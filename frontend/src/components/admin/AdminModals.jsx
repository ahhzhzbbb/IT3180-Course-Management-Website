import React from 'react';
import styles from './AdminModals.module.css';

// We reuse the global "modal-overlay" and "modal-content" classes 
// for the outer shell, but use local styles for the form internals.

export function UserModal({ isOpen, onClose, onSave, form, setForm, isEdit, onRoleChange }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>{isEdit ? 'Edit User' : 'Create User'}</h3>

        <form onSubmit={onSave} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Username</label>
              <input
                className={styles.input}
                required
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <input
                className={styles.input}
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Password {isEdit && <small style={{ fontWeight: 'normal', color: '#666' }}>(Blank to keep)</small>}
            </label>
            <input
              className={styles.input}
              type="password"
              value={form.password}
              required={!isEdit}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {!isEdit && (
            <>
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone</label>
                  <input
                    className={styles.input}
                    required
                    value={form.phoneNumber}
                    onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Birth Date</label>
                  <input
                    className={styles.input}
                    type="date"
                    required
                    value={form.birth}
                    onChange={e => setForm({ ...form, birth: e.target.value })}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input
                  className={styles.input}
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>Roles</label>
            <div className={styles.rolesContainer}>
              {['ROLE_USER', 'ROLE_INSTRUCTOR', 'ROLE_ADMIN'].map(r => (
                <label key={r} className={styles.roleLabel}>
                  <input
                    type="checkbox"
                    checked={form.roles.includes(r)}
                    onChange={() => onRoleChange(r)}
                  />
                  {r.replace('ROLE_', '')}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <div className={styles.saveBtnWrapper}>
              <button type="submit" className="btn-primary">Save</button>
            </div>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
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

        <form onSubmit={onSave} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Course Title</label>
            <input
              className={styles.input}
              required
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              rows={5}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className={styles.actions}>
            <div className={styles.saveBtnWrapper}>
              <button type="submit" className="btn-primary">
                {isEdit ? 'Update' : 'Create'}
              </button>
            </div>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}