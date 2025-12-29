import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { PrivateRoute, AdminRoute } from './Guards';

import Navbar from '../components/layout/Navbar';
import CourseEnrollment from '../components/admin/CourseEnrollment'; // <--- Import this

import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import CourseDetail from '../pages/CourseDetail';
import AdminDashboard from '../pages/AdminDashboard';
import LandingPage from '../pages/LandingPage';
import Profile from '../pages/Profile';

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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

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
        
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
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

        <Route path="/admin/course/:courseId/enrollment" element={
          <AdminRoute>
            <CourseEnrollment />
          </AdminRoute>
        } />

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
}