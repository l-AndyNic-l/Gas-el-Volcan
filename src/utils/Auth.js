import UsuarioService from "../api/UsuarioService";

export async function iniciarSesion(correo, clave) {
    const correoNormalizado = correo.trim().toLowerCase();

    try {
        const token = await UsuarioService.login(correoNormalizado, clave);
        const partes = token.split('.');

        if (partes.length !== 3) {
            return false;
        }

        const payload = JSON.parse(atob(partes[1]));
        localStorage.setItem('token', token);

        const usuario = await UsuarioService.getUsuarioById(payload.userId);

        const sesion = {
            correo: payload.sub,
            userId: payload.userId,
            rol: payload.tipoUsuario,
            nombre: usuario.data.nombre + " " + usuario.data.apellido,
        };

        localStorage.setItem('sesion', JSON.stringify(sesion));
        return true;

    } catch (error) {
        console.error('Error login:', error.response?.data || error.message);
        return false;
    }
}

export function obtenerSesion() {
    try {
        return JSON.parse(localStorage.getItem('sesion'));

    } catch {
        return null;
    }
}

export function cerrarSesion() {
    localStorage.removeItem('sesion');
    localStorage.removeItem('token')
}

export function estaAutenticado() {
    return obtenerSesion() !== null;
}
