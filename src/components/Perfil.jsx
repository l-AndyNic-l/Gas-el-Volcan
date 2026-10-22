
import { Link, useNavigate } from 'react-router-dom';
import { obtenerSesion, cerrarSesion } from '../utils/Auth';

function Perfil() {

    const navigate = useNavigate();
    const usuario = obtenerSesion();

    const manejarCerrarSesion = () => {
        cerrarSesion();
        navigate('/login', { replace: true });
    };

    if (!usuario) {
        return (
            <section className="login">
                <div className="contenedor-login">
                    <p>Debes iniciar sesión para ver tu perfil.</p>
                    <Link to="/login">Iniciar sesión</Link>
                </div>
            </section>
        );
    }

    return (
        <section className="login">
            <div className="contenedor-login">
                <fieldset>
                    <legend>Mi Perfil</legend>

                    <h2>¡Bienvenido!</h2>

                    <p>
                        Aquí puedes consultar los datos
                        de tu cuenta de Gas El Volcán.
                    </p>

                    <label>Nombre:</label>
                    <p>{usuario.nombre}</p>

                    <label>Correo electrónico:</label>
                    <p>{usuario.correo}</p>

                    <label>Tipo de usuario:</label>
                    <p>
                        {usuario.rol === 'admin'
                            ? 'Administrador'
                            : 'Cliente'}
                    </p>

                    {usuario.rol === 'admin' && (
                        <Link to="/admin">
                            Ir al Panel de Administración
                        </Link>
                    )}

                    <div className="volver">
                        <button
                            type="button"
                            onClick={manejarCerrarSesion}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </fieldset>
            </div>
        </section>
    );
}

export default Perfil;
