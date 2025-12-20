import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { PrivateRoute, AdminRoute } from './Guards';

// Layout & Components
import Navbar from '../components/layout/Navbar';

// Pages
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import CourseDetail from '../pages/CourseDetail';
import AdminDashboard from '../pages/AdminDashboard';

// Layout Wrapper
const Layout = () => (
  <>
    <Navbar />
    <div className="main-content">
      <Outlet />
    </div>
  </>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path="/course/:courseId" element={
          <PrivateRoute>
            <CourseDetail />
          </PrivateRoute>
        } />

        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
}