import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/RegisterPage";
import Authlayout from "./layouts/Authlayout";
import DashbaordLayout from "./layouts/DashboardLayout";
import ProductPage from "./pages/products/ProductsPage";
import App from "./App";
import AddProduct from "./pages/products/AddProduct";

export const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <HomePage />,
  //   },
  //   {
  //     path: "/login",
  //     element: <LoginPage />,
  //   },
  //   {
  //     path: "/register",
  //     element: <RegisterPage />,
  //   },

  {
    path: "/auth",
    element: <Authlayout />,
    children: [
      {
        path: "/auth",
        element: <Navigate to={"/auth/login"} replace />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashbaordLayout />,

    children: [
      {
        path: "dashboard",
        element: <Navigate to={"/dashboard/products"} replace />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "add-products",
        element: <AddProduct />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <h1>Page not found</h1>,
  },
]);

export default router;
