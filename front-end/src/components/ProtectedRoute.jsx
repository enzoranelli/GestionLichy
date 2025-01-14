import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({children, isAllowed, roles}) {
    if(!isAllowed) {
         return <Navigate to="/" />;
    }
    if (roles.length > 0 && !roles.includes(isAllowed.tipoUsuario)) {
        return <Navigate to="/" />;
    }
    return children ? children : <Outlet />;
}