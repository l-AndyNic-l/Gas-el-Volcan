import { Navigate, Outlet } from 'react-router-dom';
import Error404Page from '../views/Error404Page';

export default function RutaAdmin() {
    const token = localStorage.getItem('token');
    const sesion = JSON.parse(localStorage.getItem('sesion') || 'null');
                         

    if (!token || !sesion) {
        return <Navigate to="/login" replace />;
    }

    if (sesion.rol !== 'Admin') {
        return <Error404Page />;
    }

    return <Outlet />;
}