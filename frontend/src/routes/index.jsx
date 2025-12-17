import { createBrowserRouter } from "react-router";
import HomePage from "../pages/home";
import CoursePage from "../pages/course";
import TrangChu from "../pages/trangchu";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
  { path: "/", Component: TrangChu },
  { path: "/home", Component: HomePage },
  { path: "/course/:courseId", Component: CoursePage },
  { path:  "/auth/login", Component: LoginPage}
]);
