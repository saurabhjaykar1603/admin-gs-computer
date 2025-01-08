import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";

export const router = new createBrowserRouter([

    {
        path : '/',
        element : <HomePage/>
    },
    {
        path : '/login',
        element : <LoginPage/>
    },
    {
        path : '/register',
        element : <RegisterPage/>
    }
]);

export default router;