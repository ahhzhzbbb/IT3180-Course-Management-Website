import { createBrowserRouter } from "react-router";
import HomePage from "../pages/home";
import CoursePage from "../pages/course";
import TrangChu from "../pages/trangchu";

export const router = createBrowserRouter([
  { path: "/", Component: TrangChu },
  { path: "/home", Component: HomePage },
  { path: "/course/:courseId", Component: CoursePage }
]);
