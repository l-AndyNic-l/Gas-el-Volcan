
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { iniciarSesion, obtenerSesion } from '../utils/Auth';

function Login() {

    const navigate = useNavigate();

    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [error, setError] = useState('');

    const manejarLogin = (e) => {
        e.preventDefault();

        const resultado = iniciarSesion(correo, clave);

        if (resultado) {

            setError('');

            const sesion = obtenerSesion();

            if (sesion?.rol === 'admin') {
                navigate('/admin', { replace: true });
            } else {
                navigate('/perfil', { replace: true });
            }

        } else {
            setError('Correo o contraseña incorrectos.');
        }
    };

    return (
        <section className="login">

            <div className="contenedor-login">

                <form onSubmit={manejarLogin}>
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
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
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
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                            required
                        />

                        {error && (
                            <p className="text-danger" role="alert">
                                {error}
                            </p>
                        )}

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
