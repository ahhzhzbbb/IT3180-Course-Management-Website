// src/pages/Admin/AdminPage.jsx
import React, { useState } from 'react';
// Dấu .. nghĩa là thoát ra khỏi thư mục pages, rồi đi vào components
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import UserManager from "../components/UserManager";
import CourseManager from "../components/CourseManager";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'users': return <UserManager />;
      case 'courses': return <CourseManager />;
      default: return <Dashboard />;
    }
  };

  return (
    // THÊM 'w-full' VÀO DÒNG DƯỚI ĐÂY:
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10 flex-shrink-0">
           <h2 className="text-xl font-bold text-slate-800">Quản trị hệ thống</h2>
           <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600">Admin User</span>
              <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 relative">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;