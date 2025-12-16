import React from 'react';
// Đã thêm Legend vào import
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// import { CHART_DATA } from '../constants'; // Tạm thời không dùng data cũ
import { DollarSign, Users, BookOpen, TrendingUp } from 'lucide-react';

// --- DỮ LIỆU MẪU MỚI: THEO QUÝ (Gồm cả học viên và giáo viên) ---
const QUARTERLY_DATA = [
  { name: 'Quý 1', students: 1200, teachers: 150 },
  { name: 'Quý 2', students: 1450, teachers: 165 },
  { name: 'Quý 3', students: 1800, teachers: 190 },
  { name: 'Quý 4', students: 2100, teachers: 210 },
];

const StatCard = ({ title, value, change, isPositive, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      <div className={`flex items-center mt-2 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <TrendingUp size={14} className={`mr-1 ${isPositive ? '' : 'rotate-180'}`} />
        <span>{change} so với tháng trước</span>
      </div>
    </div>
    <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
      {icon}
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Tổng quan</h2>
        <select className="bg-white border border-slate-200 text-slate-600 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none">
          <option>Năm nay</option>
          <option>Năm trước</option>
        </select>
      </div>

      {/* Phần StatCard giữ nguyên như bạn đã sửa */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Tổng giáo viên" 
          value="150" 
          change="+12.5%" 
          isPositive={true} 
          icon={<Users size={24} />} 
        />
        <StatCard 
          title="Tổng học viên" 
          value="1,240" 
          change="+8.2%" 
          isPositive={true} 
          icon={<Users size={24} />} 
        />
        <StatCard 
          title="Khóa học hoạt động" 
          value="86" 
          change="-2.4%" 
          isPositive={false} 
          icon={<BookOpen size={24} />} 
        />
        <StatCard 
          title="Tỷ lệ hoàn thành" 
          value="64%" 
          change="+4.1%" 
          isPositive={true} 
          icon={<TrendingUp size={24} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Biểu đồ tổng học viên và giáo viên đăng ký qua các quý</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {/* SỬ DỤNG DATA MỚI */}
              <BarChart data={QUARTERLY_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                
                {/* Tooltip tự động hiện cả 2 thông số khi hover */}
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                
                {/* Legend để chú thích màu sắc */}
                <Legend wrapperStyle={{ paddingTop: '20px' }}/>

                {/* CỘT 1: HỌC VIÊN (Màu xanh tím than cũ) */}
                <Bar 
                  dataKey="students" 
                  name="Tổng học viên" 
                  fill="#6366f1" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30} // Chỉnh độ rộng cột cho vừa mắt
                />

                {/* CỘT 2: GIÁO VIÊN (Màu xanh lá mới) */}
                <Bar 
                  dataKey="teachers" 
                  name="Tổng giáo viên" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Hoạt động gần đây</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start space-x-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500"></div>
                <div>
                  <p className="text-sm text-slate-800 font-medium">Người dùng mới đăng ký</p>
                  <p className="text-xs text-slate-500">2 phút trước</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;