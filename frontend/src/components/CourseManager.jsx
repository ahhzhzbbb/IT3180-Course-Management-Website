import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import hook chuyển trang
import { MOCK_COURSES } from './constants';
import { Search, Plus, Filter, Trash2, Star, X, Type, User, BookOpen } from 'lucide-react';

const CourseManager = () => {
  const navigate = useNavigate(); // Khai báo hook điều hướng
  const [searchTerm, setSearchTerm] = useState('');
  
  // Tự động xử lý dữ liệu: Đổi giá từ USD (nhỏ) sang VNĐ (lớn)
  const [courses, setCourses] = useState(MOCK_COURSES.map(course => ({
    ...course,
    price: course.price < 1000 ? course.price * 25000 : course.price
  })));

  // State cho Modal thêm mới
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    price: ''
  });

  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số lượng hiển thị mỗi trang

  // Logic lọc tìm kiếm
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset về trang 1 khi người dùng tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Logic cắt trang (Pagination)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  // Hàm xóa khóa học
  const handleDeleteCourse = (courseId) => {
    // Ngăn chặn sự kiện click lan ra ngoài (để không bị kích hoạt navigate nhầm)
    if (window.confirm('Bạn có chắc chắn muốn xóa khóa học này không?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  // Hàm thêm khóa học mới
  const handleAddCourse = () => {
    if (!formData.title || !formData.instructor || !formData.price) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newCourse = {
      id: Date.now(),
      title: formData.title,
      instructor: formData.instructor,
      price: parseFloat(formData.price),
      status: "Draft",
      rating: 0,
      students: 0,
      category: "General",
      // Tạo ảnh đại diện ngẫu nhiên
      thumbnail: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.title)}&background=random&size=128`
    };

    setCourses([newCourse, ...courses]);
    setShowAddModal(false);
    setFormData({ title: '', instructor: '', price: '' });
  };

  // Hàm format tiền Việt
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Quản lý khóa học</h2>
          <p className="text-slate-500 text-sm mt-1">Quản lý tất cả khóa học và nội dung đào tạo</p>
        </div>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm active:scale-[0.98]"
        >
          <Plus size={18} />
          <span>Thêm khóa học</span>
        </button>
      </div>

      {/* MAIN CONTENT CARD */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px] flex flex-col">
        {/* Toolbar: Tìm kiếm & Filter */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Tìm kiếm khóa học..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center space-x-2 px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm">
            <Filter size={16} />
            <span>Bộ lọc</span>
          </button>
        </div>

        {/* BẢNG DỮ LIỆU */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold">
                <th className="px-6 py-4">Khóa học</th>
                <th className="px-6 py-4">Giảng viên</th>
                <th className="px-6 py-4">Học phí</th>
                <th className="px-6 py-4 text-center">Đánh giá</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentCourses.length > 0 ? (
                currentCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50 transition-colors group">
                    {/* Cột Tên Khóa Học - BẤM VÀO ĐỂ CHUYỂN TRANG */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {course.thumbnail ? (
                           <img src={course.thumbnail} alt="" className="w-12 h-12 object-cover rounded shadow-sm" />
                        ) : (
                           <div className="w-12 h-12 bg-indigo-100 rounded flex items-center justify-center text-indigo-600">
                              <BookOpen size={20} />
                           </div>
                        )}
                        <div>
                          <div 
                            onClick={() => navigate(`/admin/course/${course.id}`)}
                            className="font-medium text-slate-900 cursor-pointer hover:text-indigo-600 hover:underline transition-all"
                          >
                            {course.title}
                          </div>
                          <div className="text-xs text-slate-500">{course.category || 'General'} • {course.students} học viên</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-700">{course.instructor}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-indigo-600">
                        {formatCurrency(course.price)}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-1 text-amber-400">
                        <span className="text-sm font-medium text-slate-600 mr-1">{course.rating > 0 ? course.rating : '-'}</span>
                        {course.rating > 0 && <Star size={14} fill="currentColor" />}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // Chặn click xuyên qua làm chuyển trang
                            handleDeleteCourse(course.id);
                          }}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors" 
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    Không tìm thấy khóa học nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* PHÂN TRANG (Pagination Buttons) */}
        {filteredCourses.length > 0 && (
          <div className="p-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
            <span>
              Hiển thị {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredCourses.length)} trên {filteredCourses.length} khóa học
            </span>
            <div className="flex space-x-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Trước
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`px-3 py-1 border rounded transition-colors ${
                    currentPage === number 
                      ? 'bg-indigo-50 text-indigo-600 border-indigo-200 font-medium' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {number}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Tiếp
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL THÊM KHÓA HỌC */}
      {showAddModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
            {/* Header Modal */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">Thêm khóa học mới</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors rounded-full p-1 hover:bg-slate-200">
                <X size={20} />
              </button>
            </div>
            
            {/* Body Modal */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tên khóa học</label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="Ví dụ: Lập trình ReactJS..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Giảng viên</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" value={formData.instructor} onChange={(e) => setFormData({...formData, instructor: e.target.value})} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="Tên giảng viên..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Học phí (VNĐ)</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₫</div>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="Ví dụ: 500000" />
                </div>
              </div>

              <div className="pt-4">
                <button onClick={handleAddCourse} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors shadow-md active:scale-[0.98] flex justify-center items-center gap-2">
                  <Plus size={18} /><span>Tạo khóa học</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManager;