import React from 'react';
import styles from './EnrollmentModal.module.css';

export default function EnrollmentModal({
  course, onClose, instructors, students, allUsers,
  instructorIdToAdd, setInstructorIdToAdd, onAddInstructor, onRemoveInstructor,
  studentIdToAdd, setStudentIdToAdd, onAddStudent, onRemoveStudent, getUserLabel
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: '800px', maxWidth: '95%' }}>
        <h3>Quản lý: {course.title}</h3>
        <div className={styles.panel}>
          <div className={styles.column}>
            <h4>Giáo viên</h4>
            <div className={styles.controlRow}>
              <select className={styles.select} value={instructorIdToAdd} onChange={e => setInstructorIdToAdd(e.target.value)}>
                <option value="">Phân công giáo viên ...</option>
                {allUsers.filter(u => u.roles.includes('ROLE_INSTRUCTOR') && !instructors.find(i => i.id === u.id)).map(u => (
                  <option key={u.id} value={u.id}>{getUserLabel(u)}</option>
                ))}
              </select>
              <button className="btn-primary" style={{ padding: '6px 12px' }} onClick={onAddInstructor}>Thêm</button>
            </div>
            {instructors.map(u => (
              <div key={u.id} className={styles.tag}>
                <span>{getUserLabel(u)}</span>
                <button className="btn-icon btn-delete" onClick={() => onRemoveInstructor(u.id)}>✖</button>
              </div>
            ))}
          </div>
          {/* Student Column */}
          <div className={styles.column}>
            <h4>Học viên</h4>
            <div className={styles.controlRow}>
              <select className={styles.select} value={studentIdToAdd} onChange={e => setStudentIdToAdd(e.target.value)}>
                <option value="">Thêm học viên...</option>
                {allUsers.filter(u => !students.find(s => s.id === u.id)).map(u => (
                  <option key={u.id} value={u.id}>{getUserLabel(u)}</option>
                ))}
              </select>
              <button className="btn-primary" style={{ padding: '6px 12px' }} onClick={onAddStudent}>Thêm</button>
            </div>
            {students.map(u => (
              <div key={u.id} className={styles.tag}>
                <span>{getUserLabel(u)}</span>
                <button className="btn-icon btn-delete" onClick={() => onRemoveStudent(u.id)}>✖</button>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <button className={styles.doneBtn} onClick={onClose}>Lưu</button>
        </div>
      </div>
    </div>
  );
}