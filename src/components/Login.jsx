
import { Link } from 'react-router-dom';

function Login() {
    const iniciarSesion = (e) => {
        e.preventDefault();
        // Aquí irá la lógica de autenticación
    };

    return (
        <section className="login">
            <div className="contenedor-login">
                <form onSubmit={iniciarSesion}>
                    <fieldset>
                        <legend>Iniciar Sesión</legend>

                        <label htmlFor="correo">
                            Correo:
                        </label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            placeholder="Ingrese su correo"
                            required
                        />

                        <label htmlFor="clave">
                            Clave:
                        </label>
                        <input
                            type="password"
                            id="clave"
                            name="clave"
                            placeholder="Ingrese su clave"
                            required
                        />

                        <button type="submit">
                            Iniciar Sesión
                        </button>

                        <div className="volver">
                            <span>
                                ¿No tienes una cuenta?{' '}
                                <Link to="/registro">
                                    Regístrate
                                </Link>
                            </span>
                        </div>
                    </fieldset>
                </form>
            </div>
        </section>
    );
}

export default Login;
