import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/home";
import CoursePage from "./pages/course";
import TrangChu from "./pages/trangchu";

const router = createBrowserRouter([
  { path: "/", Component: TrangChu },
  { path: "/home", Component: HomePage },
  { path: "/course/:courseId", Component: CoursePage }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
