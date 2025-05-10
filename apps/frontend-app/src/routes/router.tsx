import { createBrowserRouter } from "react-router-dom";
import Layoutv1 from "../layouts/layout.v1";
import CustomErrorPage from "./customErrorPage";
import ProtectedRoute from "./protectedRoute";
import { Signup, Login, Explore, Problems, Solution } from "../pages";

const router = () => createBrowserRouter([
    {
        path: '/',
        element: <Layoutv1 />,
        errorElement: <CustomErrorPage />,
        children: [
            { path: '/', element: <Explore /> },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <Signup /> },
            {
                path: '/',
                element: <ProtectedRoute />,
                children: [
                    { path: '/problems', element: <Problems /> },
                    { path: '/problems/:problemId', element: <Solution /> },
                ]
            }
        ]
    }
]);

export const routerInstance = router();