import React from 'react';

export default function UserTable({ users, onEdit, onDelete, onCreate }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
        <button className="btn-primary" onClick={onCreate}>+ Add User</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th><th>Username</th><th>Name</th><th>Roles</th><th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td><strong>{u.username}</strong></td>
              <td>{u.name || '-'}</td>
              <td>
                {u.roles?.map(r => (
                  <span key={r} style={{
                    fontSize: '0.75rem',
                    background: r === 'ROLE_ADMIN' ? '#fee2e2' : r === 'ROLE_INSTRUCTOR' ? '#fef3c7' : '#dbeafe',
                    color: r === 'ROLE_ADMIN' ? '#991b1b' : r === 'ROLE_INSTRUCTOR' ? '#92400e' : '#1e40af',
                    padding: '2px 8px', borderRadius: '4px', marginRight: '5px'
                  }}>
                    {r.replace('ROLE_', '')}
                  </span>
                ))}
              </td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn-icon btn-edit" onClick={() => onEdit(u)}>✏️</button>
                <button className="btn-icon btn-delete" onClick={() => onDelete(u.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}