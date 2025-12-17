import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage"; // File chứa Sidebar
import CourseDetail from "../pages/CourseDetail"; // Import file vừa tạo

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  // THÊM DÒNG NÀY:
  // Khi người dùng vào /admin/course/123 thì hiện trang CourseDetail
  {
    path: "/admin/course/:id", 
    element: <CourseDetail />, 
  }
]);