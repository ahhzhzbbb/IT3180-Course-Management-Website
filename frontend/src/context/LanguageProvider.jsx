import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  vi: {
    // Navigation
    'nav.learnhub': 'Học Trực Tuyến',
    'nav.dashboard': 'Trang chủ',
    'nav.admin': 'Quản trị',
    'nav.logout': 'Đăng xuất',
    
    // Login
    'login.title': 'Chào Mừng Trở Lại',
    'login.subtitle': 'Đăng nhập để tiếp tục hành trình học tập của bạn',
    'login.username': 'Tên đăng nhập',
    'login.password': 'Mật khẩu',
    'login.signin': 'Đăng Nhập',
    'login.or': 'hoặc',
    'login.noAccount': 'Chưa có tài khoản?',
    'login.registerLink': 'Đăng ký ngay',
    'login.error.invalid': 'Tên đăng nhập hoặc mật khẩu không đúng',
    'login.error.general': 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.',
    'login.placeholder.username': 'Nhập tên đăng nhập',
    'login.placeholder.password': 'Nhập mật khẩu',

    // Register
    'register.title': 'Tạo Tài Khoản',
    'register.subtitle': 'Tạo tài khoản mới để bắt đầu học tập',
    'register.phone': 'Số điện thoại',
    'register.birth': 'Ngày sinh',
    'register.gender': 'Giới tính',
    'register.genderPlaceholder': 'Chọn giới tính...',
    'register.male': 'Nam',
    'register.female': 'Nữ',
    'register.placeholder.name': 'Nhập họ tên',
    'register.placeholder.phone': 'Nhập số điện thoại (10 chữ số)',
    'register.submit': 'Đăng Ký',
    'register.success': 'Đăng ký thành công! Đang chuyển tới trang đăng nhập...',
    'register.error.general': 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.',
    'register.alreadyAccount': 'Đã có tài khoản?',
    
    // Dashboard
    'dashboard.welcome': 'Chào mừng trở lại, {name}!',
    'dashboard.loggedAs': 'Bạn đang đăng nhập với vai trò',
    'dashboard.myLearning': 'Khóa Học Của Tôi',
    'dashboard.discoverMore': 'Khám Phá Thêm',
    'dashboard.allCourses': 'Tất Cả Khóa Học',
    'dashboard.loading': 'Đang tải khóa học...',
    'dashboard.noCourses': 'Không có khóa học nào',
    'dashboard.noCoursesEnrolled': 'Bạn chưa đăng ký khóa học nào.',
    'dashboard.noCoursesAvailable': 'Không có khóa học khả dụng.',
    
    // Roles
    'role.student': 'Học viên',
    'role.instructor': 'Giảng viên',
    'role.admin': 'Quản trị viên',
    'role.user': 'Người dùng',
    
    // Course Card
    'course.by': 'Bởi',
    'course.chapters': 'chương',
    'course.students': 'học viên',
    
    // Admin Dashboard
    'admin.title': 'Bảng Điều Khiển Quản Trị',
    'admin.courses': 'Khóa Học',
    'admin.users': 'Người Dùng',
    'admin.newCourse': '+ Tạo Khóa Học',
    'admin.addUser': '+ Thêm Người Dùng',
    
    // Course Table
    'table.id': 'ID',
    'table.title': 'Tiêu Đề',
    'table.username': 'Tên Đăng Nhập',
    'table.name': 'Tên',
    'table.roles': 'Vai Trò',
    'table.actions': 'Hành Động',
    
    // Modals
    'modal.createCourse': 'Tạo Khóa Học Mới',
    'modal.editCourse': 'Chỉnh Sửa Khóa Học',
    'modal.courseTitle': 'Tiêu Đề Khóa Học',
    'modal.description': 'Mô Tả',
    'modal.create': 'Tạo',
    'modal.update': 'Cập Nhật',
    'modal.cancel': 'Hủy',
    'modal.save': 'Lưu',
    'modal.done': 'Hoàn Tất',
    
    'modal.editUser': 'Chỉnh Sửa Người Dùng',
    'modal.addUser': 'Thêm Người Dùng',
    'modal.username': 'Tên Đăng Nhập',
    'modal.fullName': 'Họ Tên',
    'modal.password': 'Mật Khẩu',
    'modal.passwordKeep': 'Mật khẩu (Để trống để giữ nguyên)',
    'modal.roles': 'Vai Trò',
    
    'modal.manageCourse': 'Quản Lý: {title}',
    'modal.instructors': 'Giảng Viên',
    'modal.students': 'Học Viên',
    'modal.selectInstructor': 'Chọn Giảng Viên...',
    'modal.selectStudent': 'Chọn Học Viên...',
    'modal.add': 'Thêm',
    
    // Course Detail
    'courseDetail.notFound': 'Không tìm thấy khóa học',
    'courseDetail.overview': 'Tổng Quan',
    'courseDetail.comments': 'Bình Luận',
    'courseDetail.exercises': 'Bài Tập',
    
    // Comments
    'comments.writeComment': 'Viết bình luận...',
    'comments.post': 'Đăng',
    'comments.reply': 'Trả lời',
    'comments.edit': 'Sửa',
    'comments.delete': 'Xóa',
    'comments.cancel': 'Hủy',
    
    // Theme
    'theme.light': 'Sáng',
    'theme.dark': 'Tối',

    // Illustration
    'illustration.title': 'Bắt Đầu Học Ngay Hôm Nay',
    'illustration.subtitle': 'Truy cập hàng ngàn khóa học và mở rộng kiến thức của bạn',
    'illustration.feature1': 'Giảng viên chuyên nghiệp',
    'illustration.feature2': 'Truy cập trọn đời',
    'illustration.feature3': 'Học theo tiến độ của bạn',
  },
  
  en: {
    // Navigation
    'nav.learnhub': 'LearnHub',
    'nav.dashboard': 'Dashboard',
    'nav.admin': 'Admin',
    'nav.logout': 'Logout',
    
    // Login
    'login.title': 'Welcome Back',
    'login.subtitle': 'Sign in to continue your learning journey',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.signin': 'Sign In',
    'login.or': 'or',
    'login.noAccount': "Don't have an account?",
    'login.registerLink': 'Register now',
    'login.error.invalid': 'Invalid username or password',
    'login.error.general': 'An error occurred during login. Please try again.',
    'login.placeholder.username': 'Enter your username',
    'login.placeholder.password': 'Enter your password',

    // Register
    'register.title': 'Create Account',
    'register.subtitle': 'Create a new account to start learning',
    'register.phone': 'Phone Number',
    'register.birth': 'Birth Date',
    'register.gender': 'Gender',
    'register.genderPlaceholder': 'Select gender...',
    'register.male': 'Male',
    'register.female': 'Female',
    'register.placeholder.name': 'Enter your full name',
    'register.placeholder.phone': 'Enter phone number (10 digits)',
    'register.submit': 'Register',
    'register.success': 'Registration successful! Redirecting to login...',
    'register.error.general': 'An error occurred during registration. Please try again.',
    'register.alreadyAccount': 'Already have an account?',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back, {name}!',
    'dashboard.loggedAs': 'You are logged in as an',
    'dashboard.myLearning': 'My Learning',
    'dashboard.discoverMore': 'Discover More',
    'dashboard.allCourses': 'All Courses',
    'dashboard.loading': 'Loading courses...',
    'dashboard.noCourses': 'No courses available',
    'dashboard.noCoursesEnrolled': 'You are not enrolled in any courses yet.',
    'dashboard.noCoursesAvailable': 'No courses available at the moment.',
    
    // Roles
    'role.student': 'Student',
    'role.instructor': 'Instructor',
    'role.admin': 'Admin',
    'role.user': 'User',
    
    // Course Card
    'course.by': 'By',
    'course.chapters': 'chapters',
    'course.students': 'students',
    
    // Admin Dashboard
    'admin.title': 'Admin Dashboard',
    'admin.courses': 'Courses',
    'admin.users': 'Users',
    'admin.newCourse': '+ New Course',
    'admin.addUser': '+ Add User',
    
    // Course Table
    'table.id': 'ID',
    'table.title': 'Title',
    'table.username': 'Username',
    'table.name': 'Name',
    'table.roles': 'Roles',
    'table.actions': 'Actions',
    
    // Modals
    'modal.createCourse': 'Create New Course',
    'modal.editCourse': 'Edit Course',
    'modal.courseTitle': 'Course Title',
    'modal.description': 'Description',
    'modal.create': 'Create',
    'modal.update': 'Update',
    'modal.cancel': 'Cancel',
    'modal.save': 'Save',
    'modal.done': 'Done',
    
    'modal.editUser': 'Edit User',
    'modal.addUser': 'Add User',
    'modal.username': 'Username',
    'modal.fullName': 'Full Name',
    'modal.password': 'Password',
    'modal.passwordKeep': 'Password (Blank to keep)',
    'modal.roles': 'Roles',
    
    'modal.manageCourse': 'Manage: {title}',
    'modal.instructors': 'Instructors',
    'modal.students': 'Students',
    'modal.selectInstructor': 'Select Instructor...',
    'modal.selectStudent': 'Select Student...',
    'modal.add': 'Add',
    
    // Course Detail
    'courseDetail.notFound': 'Course not found',
    'courseDetail.overview': 'Overview',
    'courseDetail.comments': 'Comments',
    'courseDetail.exercises': 'Exercises',
    
    // Comments
    'comments.writeComment': 'Write a comment...',
    'comments.post': 'Post',
    'comments.reply': 'Reply',
    'comments.edit': 'Edit',
    'comments.delete': 'Delete',
    'comments.cancel': 'Cancel',
    
    // Theme
    'theme.light': 'Light',
    'theme.dark': 'Dark',

    // Illustration
    'illustration.title': 'Start Learning Today',
    'illustration.subtitle': 'Access thousands of courses and expand your knowledge',
    'illustration.feature1': 'Expert Instructors',
    'illustration.feature2': 'Lifetime Access',
    'illustration.feature3': 'Learn at Your Pace',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'vi';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key, params = {}) => {
    let text = translations[language]?.[key] || key;
    
    // Replace parameters like {name}
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    
    return text;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'vi' ? 'en' : 'vi');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
