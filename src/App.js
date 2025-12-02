import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/home";
import Course from "./pages/course";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path:"/chapter",
    Component: Course,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
