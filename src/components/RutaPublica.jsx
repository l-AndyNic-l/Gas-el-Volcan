import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/isAuthenticated";

export default function RutaPublica({ redirectTo = "/" }) {
    if (isAuthenticated()) {
        return <Navigate to={redirectTo} replace />;
    }
    return <Outlet />;
}