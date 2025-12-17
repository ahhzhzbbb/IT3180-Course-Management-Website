// src/components/UserManager.jsx
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MOCK_USERS } from './constants'; // Đảm bảo file constants.js đã có dữ liệu
import { Search, UserPlus, MoreVertical, Shield, Mail, Calendar, X, AlertCircle, Trash2, Ban, CheckCircle } from 'lucide-react';

const UserManager = () => {
  // Tự động đổi 'Inactive' thành 'Banned' khi khởi tạo
  const [users, setUsers] = useState(MOCK_USERS.map(user => ({
    ...user,
    status: user.status === 'Inactive' ? 'Banned' : user.status
  })));

  const [filterRole, setFilterRole] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const ROLE_NAMES = {
    'All': 'Tất cả',
    'Admin': 'Admin',
    'Instructor': 'Giáo viên',
    'Student': 'Học viên'
  };

  // Click ra ngoài thì đóng menu
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    if (openMenuId) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [openMenuId]);

  // Logic lọc user
  const filteredUsers = users.filter(user => {
    const matchRole = filterRole === 'All' ? true : user.role === filterRole;
    const searchLower = searchTerm.toLowerCase();
    const matchSearch = 
      user.name.toLowerCase().includes(searchLower) || 
      user.email.toLowerCase().includes(searchLower);
    return matchRole && matchSearch;
  });

  const handleCloseModal = () => {
    setShowAddModal(false);
    setFormData({ email: '', username: '', password: '' });
    setError('');
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.username || !formData.password) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email không hợp lệ (phải có @ và .com)');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.username,
      email: formData.email,
      role: 'Instructor',
      status: 'Active',
      joinDate: new Date().toISOString(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.username)}&background=random`
    };

    setUsers([newUser, ...users]);
    handleCloseModal();
  };

  const handleDelete = (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleBan = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'Banned' } : u));
  };

  const handleActive = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'Active' } : u));
  };

  // Modal Content
  const modalContent = showAddModal && (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative z-10" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-lg text-slate-800">Thêm Giáo viên mới</h3>
          <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 transition-colors rounded-full p-1 hover:bg-slate-200">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" value={formData.email} onChange={(e) => { setFormData({...formData, email: e.target.value}); setError(''); }}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="vidu@educore.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tên tài khoản</label>
            <input 
              type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="Nhập tên hiển thị"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
            <input 
              type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <div className="flex items-center text-red-500 text-sm bg-red-50 p-2 rounded-lg">
              <AlertCircle size={16} className="mr-2" />
              {error}
            </div>
          )}
          <div className="pt-2">
            <button onClick={handleSubmit} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors shadow-md active:scale-[0.98]">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Quản lý người dùng</h2>
          <p className="text-slate-500 text-sm mt-1">Kiểm soát truy cập và thông tin người dùng</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm active:scale-[0.98]">
          <UserPlus size={18} />
          <span>Thêm Giáo viên</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            {['All', 'Admin', 'Instructor', 'Student'].map((role) => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  filterRole === role ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {ROLE_NAMES[role]}
              </button>
            ))}
          </div>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Tìm theo tên hoặc email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm" 
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => {
              // --- FIX LỖI DROPDOWN BỊ MẤT Ở CUỐI ---
              // Dòng mới: Chỉ mở lên nếu danh sách > 2 VÀ đang ở cuối
              const isLastRow = filteredUsers.length > 2 && index >= filteredUsers.length - 2;

              return (
                <div key={user.id} className="p-4 flex flex-col sm:flex-row items-center justify-between hover:bg-slate-50 transition-colors gap-4">
                  <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                    <div>
                      <h4 className="font-semibold text-slate-800">{user.name}</h4>
                      <div className="flex items-center text-slate-500 text-sm">
                        <Mail size={12} className="mr-1" />
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-8 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center text-sm text-slate-500 min-w-[120px]">
                      <Shield size={14} className="mr-1.5 text-slate-400" />
                      <span className={`font-medium ${
                        user.role === 'Admin' ? 'text-purple-600' :
                        user.role === 'Instructor' ? 'text-blue-600' : 'text-slate-600'
                      }`}>{ROLE_NAMES[user.role]}</span>
                    </div>

                    <div className="flex items-center text-sm text-slate-500 min-w-[120px]">
                      <Calendar size={14} className="mr-1.5 text-slate-400" />
                      <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>

                    <div className="min-w-[80px]">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        user.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>{user.status}</span>
                    </div>

                    <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === user.id ? null : user.id);
                        }}
                        className={`text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors ${openMenuId === user.id ? 'bg-slate-100 text-slate-600' : ''}`}
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenuId === user.id && (
                        // --- ÁP DỤNG LOGIC isLastRow ---
                        <div className={`absolute right-0 w-36 bg-white rounded-lg shadow-xl border border-slate-100 z-20 overflow-hidden animate-fade-in
                          ${isLastRow ? 'bottom-full mb-2 origin-bottom' : 'top-full mt-2 origin-top'}
                        `}>
                          <div className="py-1">
                            <button 
                              onClick={() => handleActive(user.id)}
                              className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2"
                            >
                              <CheckCircle size={14} />
                              <span>Active</span>
                            </button>
                            <button 
                              onClick={() => handleBan(user.id)}
                              className="w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50 flex items-center gap-2"
                            >
                              <Ban size={14} />
                              <span>Banned</span>
                            </button>
                            <button 
                              onClick={() => handleDelete(user.id)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 size={14} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500">
              Không tìm thấy người dùng nào phù hợp.
            </div>
          )}
        </div>
      </div>
      {showAddModal && createPortal(modalContent, document.body)}
    </div>
  );
};

export default UserManager;