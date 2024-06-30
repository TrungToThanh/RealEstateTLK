import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { AdminPage } from "./source/admin";
import { LandingPage } from "./source/landing-page";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
