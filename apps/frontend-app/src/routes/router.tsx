import { createBrowserRouter } from "react-router-dom";
import Layoutv1 from "../layouts/layout.v1";
import CustomErrorPage from "./customErrorPage";
import ProtectedRoute from "./protectedRoute";
import { Signup, Login, Explore, Problems, Solution } from "../pages";

const router = () => createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
        errorElement: <CustomErrorPage />,
    },
    {
        path: '/signup',
        element: <Signup />,
        errorElement: <CustomErrorPage />,
    },
    {
        path: '/',
        element: <Layoutv1 />,
        errorElement: <CustomErrorPage />,
        children: [
            {
                index: true,
                element: <Explore />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: 'problems',
                        element: <Problems />,
                    },
                    {
                        path: 'problems/:problemId',
                        element: <Solution />,
                    },
                ],
            },
        ],
    },
]);

export const routerInstance = router();