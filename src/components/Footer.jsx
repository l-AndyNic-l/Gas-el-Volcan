
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo-navbar.png';
import { obtenerSesion } from '../utils/Auth';

function Footer() {

    const sesion = obtenerSesion();
    const navigate = useNavigate();
    const location = useLocation();

    const irAContactos = (e) => {

        e.preventDefault();

        if (location.pathname === '/') {

            const seccion = document.getElementById('contactos');

            if (seccion) {
                seccion.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            return;
        }

        navigate('/#contactos');
    };

    return (
        <>
            <footer>
                <div className="informacion">

                    <div className="descripcion">
                        <div className="logo">
                            <img
                                src={logo}
                                alt="Gas el Volcan"
                            />
                        </div>

                        <div className="texto">
                            <p>
                                Gas El Volcán, una empresa familiar con más de 25 años de experiencia en la distribución de gas licuado a domicilio en Chillán y la Región de Ñuble. Desde 1998, llevamos comercios.
                            </p>
                        </div>
                    </div>

                    <div className="navegacion">
                        <h2>Menú</h2>

                        <div className="filas">
                            <ul>
                                <li>
                                    <Link to="/">
                                        Inicio
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/nosotros">
                                        Nosotros
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/productos">
                                        Catálogo
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/productos">
                                        Productos
                                    </Link>
                                </li>
                            </ul>

                            <ul>
                                <li>
                                    <a
                                        href="/#contactos"
                                        onClick={irAContactos}
                                    >
                                        Contactos
                                    </a>
                                </li>

                                <li>
                                    <Link to="/favoritos">
                                        Favoritos
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/carrito">
                                        Carrito
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to={
                                            sesion
                                                ? '/perfil'
                                                : '/login'
                                        }
                                    >
                                        Cuenta
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="direccion">
                        <h2>Dirección y Redes</h2>

                        <div className="filas">
                            <ul>
                                <li>
                                    <Link to="/">
                                        <i className="fa-solid fa-location-dot"></i>
                                        {' '}Av. Vicuña Mackenna 2450,
                                        Local 18, Santiago, Chile
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/">
                                        <i className="fa-solid fa-phone"></i>
                                        {' '}+569 3650 9979
                                    </Link>
                                </li>

                                <li className="redes">
                                    <Link to="/">
                                        <i className="fa-brands fa-instagram"></i>
                                        {' '}
                                        <i className="fa-brands fa-facebook"></i>
                                        {' '}
                                        <i className="fa-brands fa-tiktok"></i>
                                        {' '}
                                        <i className="fa-brands fa-x-twitter"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="derechos-autor">
                    <p>
                        Copyright © 2026 Gas El Volcán |
                        Desarrollado por Ping&Lag
                    </p>
                </div>
            </footer>
        </>
    );
}

export default Footer;
