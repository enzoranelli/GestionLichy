import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({children, isAllowed}) {
    if(!isAllowed) {
         return <Navigate to="/" />;
    }
    return children ? children : <Outlet />;
}