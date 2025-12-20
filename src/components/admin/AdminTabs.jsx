import React from 'react';

export default function AdminTabs({ activeTab, setActiveTab }) {
  return (
    <div className="admin-tabs">
      <button
        className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
        onClick={() => setActiveTab('courses')}
      >
        Courses
      </button>
      <button
        className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
        onClick={() => setActiveTab('users')}
      >
        Users
      </button>
    </div>
  );
}