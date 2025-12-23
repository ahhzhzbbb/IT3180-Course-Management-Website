import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { PrivateRoute, AdminRoute } from './Guards';

// Components
import Navbar from '../components/layout/Navbar';
import CourseEnrollment from '../components/admin/CourseEnrollment'; // <--- Import this

// Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import CourseDetail from '../pages/CourseDetail';
import AdminDashboard from '../pages/AdminDashboard';
import LandingPage from '../pages/LandingPage';

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
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path="/" element={
          <PrivateRoute>
            <LandingPage />
          </PrivateRoute>
        } />

        <Route path="/course/:courseId" element={
          <PrivateRoute>
            <CourseDetail />
          </PrivateRoute>
        } />

        {/* --- Admin Routes --- */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />

        {/* NEW: Dedicated Enrollment Page */}
        <Route path="/admin/course/:courseId/enrollment" element={
          <AdminRoute>
            <CourseEnrollment />
          </AdminRoute>
        } />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
}