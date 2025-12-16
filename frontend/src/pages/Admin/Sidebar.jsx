import React from 'react';
import { LayoutDashboard, BookOpen, Users, LogOut, Settings } from 'lucide-react';

// SỬA 1: Đổi tên props để khớp với AdminPage (activeTab, setActiveTab)
const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Quản lý khóa học', icon: BookOpen },
    { id: 'users', label: 'Quản lý người dùng', icon: Users },
  ];

  return (
    // SỬA 2: Bỏ 'fixed left-0 top-0 z-10', thêm 'flex-shrink-0'
    // Việc này giúp sidebar nằm gọn bên trái, đẩy nội dung sang phải chứ không đè lên.
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col transition-all duration-300 flex-shrink-0">
      
      {/* Logo */}
      <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/30">
          7
        </div>
        <span className="text-xl font-bold tracking-wide">NHÓM 7</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // SỬA 3: So sánh bằng activeTab
          const isActive = activeTab === item.id; 
          
          return (
            <button
              key={item.id}
              // SỬA 4: Gọi hàm setActiveTab khi click
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20 translate-x-1'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <Settings size={20} />
          <span className="font-medium">Cài đặt</span>
        </button>
        
        {/* SỬA 5: Thêm chức năng đăng xuất quay về trang chủ */}
        <button 
          onClick={() => window.location.href = '/'}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;