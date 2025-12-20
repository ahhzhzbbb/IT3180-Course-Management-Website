import React from 'react';

export default function EnrollmentModal({
  course, onClose,
  instructors, students, allUsers,
  instructorIdToAdd, setInstructorIdToAdd, onAddInstructor, onRemoveInstructor,
  studentIdToAdd, setStudentIdToAdd, onAddStudent, onRemoveStudent,
  getUserLabel
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: '800px', maxWidth: '95%' }}>
        <h3>Manage: {course.title}</h3>
        <div className="enrollment-panel">
          {/* Instructor Column */}
          <div className="enrollment-column">
            <h4 style={{ marginTop: 0 }}>Instructors</h4>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <select value={instructorIdToAdd} onChange={e => setInstructorIdToAdd(e.target.value)} style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}>
                <option value="">Select Instructor...</option>
                {allUsers.filter(u => u.roles.includes('ROLE_INSTRUCTOR') && !instructors.find(i => i.id === u.id)).map(u => (
                  <option key={u.id} value={u.id}>{getUserLabel(u)}</option>
                ))}
              </select>
              <button className="btn-primary" style={{ padding: '6px 12px' }} onClick={onAddInstructor}>Add</button>
            </div>
            {instructors.map(u => (
              <div key={u.id} className="user-tag">
                <span>{getUserLabel(u)}</span>
                <button className="btn-icon btn-delete" onClick={() => onRemoveInstructor(u.id)}>✖</button>
              </div>
            ))}
          </div>

          {/* Student Column */}
          <div className="enrollment-column">
            <h4 style={{ marginTop: 0 }}>Students</h4>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <select value={studentIdToAdd} onChange={e => setStudentIdToAdd(e.target.value)} style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}>
                <option value="">Select Student...</option>
                {allUsers.filter(u => !students.find(s => s.id === u.id)).map(u => (
                  <option key={u.id} value={u.id}>{getUserLabel(u)}</option>
                ))}
              </select>
              <button className="btn-primary" style={{ padding: '6px 12px' }} onClick={onAddStudent}>Add</button>
            </div>
            {students.map(u => (
              <div key={u.id} className="user-tag">
                <span>{getUserLabel(u)}</span>
                <button className="btn-icon btn-delete" onClick={() => onRemoveStudent(u.id)}>✖</button>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'right', marginTop: 20 }}>
          <button onClick={onClose} style={{ padding: '8px 16px', background: '#e5e7eb', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Done</button>
        </div>
      </div>
    </div>
  );
}