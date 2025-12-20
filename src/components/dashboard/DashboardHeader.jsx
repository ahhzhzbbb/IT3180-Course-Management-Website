import React from 'react';

export default function DashboardHeader({ user, isInstructor }) {
  return (
    <div className="dashboard-header">
      <h1>Welcome back, {user?.name || user?.username}!</h1>
      <p>
        You are logged in as an <strong>{isInstructor ? 'Instructor' : 'Student'}</strong>.
      </p>
    </div>
  );
}