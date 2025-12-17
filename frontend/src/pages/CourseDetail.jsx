// src/pages/CourseDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, DollarSign, BookOpen, Star, Calendar } from 'lucide-react';
// Bro nhớ import MOCK_COURSES từ đúng chỗ bro để file constants nhé
import { MOCK_COURSES } from '../components/constants'; 

const CourseDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();

  // Tìm khóa học tương ứng với ID
  // Lưu ý: id trên URL là chuỗi, id trong data là số nên cần ép kiểu
  const course = MOCK_COURSES.find(c => c.id.toString() === id);

  if (!course) {
    return <div className="p-8 text-center text-red-500">Không tìm thấy khóa học!</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto animate-fade-in">
      {/* Nút Quay lại */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Quay lại danh sách
      </button>

      {/* Header thông tin */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
            <div className="absolute -bottom-10 left-8">
                {course.thumbnail ? (
                    <img src={course.thumbnail} alt="" className="w-24 h-24 rounded-xl border-4 border-white shadow-md object-cover" />
                ) : (
                    <div className="w-24 h-24 rounded-xl border-4 border-white shadow-md bg-white flex items-center justify-center text-indigo-600">
                        <BookOpen size={40} />
                    </div>
                )}
            </div>
        </div>
        
        <div className="pt-14 px-8 pb-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">{course.title}</h1>
                    <p className="text-slate-500 mt-2 flex items-center gap-2">
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                            {course.category || 'General'}
                        </span>
                        <span className="text-sm">• {course.students} học viên</span>
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price < 1000 ? course.price * 25000 : course.price)}
                    </div>
                    <div className="mt-2 flex items-center justify-end text-amber-500 font-medium">
                        <span className="mr-1">{course.rating || 0}</span>
                        <Star size={18} fill="currentColor" />
                    </div>
                </div>
            </div>

            {/* Grid thông tin chi tiết */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <User size={20} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Giảng viên</p>
                        <p className="font-semibold text-slate-800">{course.instructor}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Ngày tạo</p>
                        <p className="font-semibold text-slate-800">{new Date().toLocaleDateString('vi-VN')}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <BookOpen size={20} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Trạng thái</p>
                        <span className={`font-semibold ${course.status === 'Published' ? 'text-green-600' : 'text-yellow-600'}`}>
                            {course.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;