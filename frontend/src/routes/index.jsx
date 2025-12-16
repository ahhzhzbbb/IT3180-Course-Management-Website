import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashBoard from "../pages/testPage";

// 1. IMPORT TRANG ADMIN
// (Lưu ý: Đảm bảo bro đã tạo file AdminPage.jsx trong thư mục src/pages/Admin/ như hướng dẫn trước)
import AdminPage from "../pages/Admin/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/dashboard",
    element: <DashBoard />
  },
  
  // 2. THÊM ROUTE ADMIN
  {
    path: "/admin",
    element: <AdminPage />
  }
]);