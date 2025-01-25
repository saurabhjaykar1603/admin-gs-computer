import { createBrowserRouter, Navigate } from "react-router-dom";
import Authlayout from "./layouts/Authlayout";
import DashbaordLayout from "./layouts/DashboardLayout";
import ProductPage from "./pages/products/ProductsPage";
import App from "./App";
import AddProduct from "./pages/products/AddProduct";
import Category from "./pages/category/Category";
import ProductDetails from "./features/Products/ProductDetails";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

export const router = createBrowserRouter([
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
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
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
        path: "product-details/:productId",
        element: <ProductDetails />,
      },
      {
        path: "add-products",
        element: <AddProduct />,
      },
      {
        path: "category",
        element: <Category />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
