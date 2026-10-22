import { Navigate, Outlet } from 'react-router-dom';
import { obtenerSesion } from '../utils/Auth';

function RutaPrivada() {

    const sesion = obtenerSesion();

    if (!sesion) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default RutaPrivada;
