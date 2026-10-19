
import { Navigate, Outlet } from 'react-router-dom';
import { obtenerSesion } from '../utils/Auth';

function RutaPrivada() {

    const sesion = obtenerSesion();

    if (!sesion || sesion.rol !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default RutaPrivada;
