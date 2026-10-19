
const USUARIOS_DEMO = [
    {
        correo: 'admin@gaselvolcan.cl',
        clave: 'Admin1234',
        nombre: 'Administrador',
        rol: 'admin'
    },
    {
        correo: 'cliente@gaselvolcan.cl',
        clave: 'Cliente1234',
        nombre: 'Cliente',
        rol: 'cliente'
    }
];

export function iniciarSesion(correo, clave) {

    const correoNormalizado = correo.trim().toLowerCase();

    const usuario = USUARIOS_DEMO.find(
        item =>
            item.correo === correoNormalizado &&
            item.clave === clave
    );

    if (!usuario) {
        return false;
    }

    const sesion = {
        correo: usuario.correo,
        nombre: usuario.nombre,
        rol: usuario.rol
    };

    localStorage.setItem(
        'sesion',
        JSON.stringify(sesion)
    );

    return true;
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
}

export function estaAutenticado() {
    return obtenerSesion() !== null;
}
