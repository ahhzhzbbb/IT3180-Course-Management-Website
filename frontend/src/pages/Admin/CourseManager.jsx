import React, { useState } from 'react';
import { MOCK_COURSES } from './constants';
import { Search, Plus, Filter, MoreHorizontal, Star, Edit2, Trash2 } from 'lucide-react';

const CourseManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses] = useState(MOCK_COURSES);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Quản lý khóa học</h2>
          <p className="text-slate-500 text-sm mt-1">Quản lý tất cả khóa học và nội dung đào tạo</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm">
          <Plus size={18} />
          <span>Thêm khóa học</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold">
                <th className="px-6 py-4">Khóa học</th>
                <th className="px-6 py-4">Giảng viên</th>
                <th className="px-6 py-4">Giá</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-center">Đánh giá</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={course.thumbnail} alt="" className="w-12 h-8 object-cover rounded shadow-sm" />
                      <div>
                        <div className="font-medium text-slate-900">{course.title}</div>
                        <div className="text-xs text-slate-500">{course.category} • {course.students} học viên</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-700">{course.instructor}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900">${course.price}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      course.status === 'Published' ? 'bg-green-50 text-green-700 border-green-200' :
                      course.status === 'Draft' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-1 text-amber-400">
                      <span className="text-sm font-medium text-slate-600 mr-1">{course.rating > 0 ? course.rating : '-'}</span>
                      {course.rating > 0 && <Star size={14} fill="currentColor" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="Chỉnh sửa">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Xóa">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (Static) */}
        <div className="p-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
          <span>Hiển thị 1-5 trên {filteredCourses.length} khóa học</span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">Trước</button>
            <button className="px-3 py-1 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded font-medium">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">2</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Tiếp</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseManager;