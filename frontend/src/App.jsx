import { createBrowserRouter, RouterProvider } from "react-router";
import {router} from "./routes/index.jsx";
import './index.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
