import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { AdminPage } from "./source/admin";
import { LandingPage } from "./source/landing-page";
import { NotFoundPage } from "./components/not-found";
import { ProductPage } from "./source/product-page";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/products",
    element: <ProductPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
