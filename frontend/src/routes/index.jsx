import { createBrowserRouter } from "react-router";
import HomePage from "../pages/home";
import HomePageStudent from "../pages/student/home";
import CoursePage from "../pages/course";
import CoursePageStudent from "../pages/student/course";
import TrangChu from "../pages/trangchu";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
  { path: "/", Component: TrangChu },
  { path: "/home", Component: HomePage },
  { path: "/course/:courseId", Component: CoursePage },
  { path:  "/auth/login", Component: LoginPage},
  { path: "/student/home", Component: HomePageStudent },
  { path: "/student/course/:courseId", Component: CoursePageStudent }
]);
