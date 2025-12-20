import React from 'react';

export default function CourseTable({ courses, onEdit, onDelete, onManage, onCreate }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
        <button className="btn-primary" onClick={onCreate}>+ New Course</button>
      </div>
      <table className="data-table">
        <thead>
          <tr><th>ID</th><th>Title</th><th style={{ textAlign: 'right' }}>Actions</th></tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td style={{ fontWeight: '500' }}>{c.title}</td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn-icon btn-edit" onClick={() => onEdit(c)} title="Edit Metadata">✏️</button>
                <button className="btn-icon btn-delete" onClick={() => onDelete(c.id)} title="Delete Course">🗑️</button>
                <button
                  onClick={() => onManage(c)}
                  style={{ marginLeft: 10, fontSize: '0.85rem', padding: '4px 10px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}
                >
                  👥 Manage People
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}