
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo-navbar.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faCartShopping,
    faCircleUser
} from '@fortawesome/free-solid-svg-icons';

import { useCarrito } from './CarritoContent';
import { useFavoritos } from './FavoritoContent';
import { obtenerSesion } from '../utils/Auth';

function Header({ itemsMenu = [] }) {

    const { cantidadFavoritos } = useFavoritos();
    const { cantidadTotal } = useCarrito();

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
        <header>

            <div className="contenedor-img">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>

            <nav className="contenedor-nav">
                <ul className="lista-nav">

                    {itemsMenu.map((item, index) => (
                        <li key={index}>

                            {item.label === 'Contactos' ? (

                                <a
                                    href="/#contactos"
                                    onClick={irAContactos}
                                >
                                    {item.label}
                                </a>

                            ) : (

                                <NavLink
                                    to={item.href}
                                    className={({ isActive }) =>
                                        isActive ? 'activo' : ''
                                    }
                                >
                                    {item.label}
                                </NavLink>

                            )}

                        </li>
                    ))}

                </ul>
            </nav>

            <div className="contenedor-nav-secundario">
                <ul className="lista-nav-secundario">

                    <li>
                        <Link
                            to="/favoritos"
                            className="icono-favoritos"
                            aria-label="Favoritos"
                        >
                            <FontAwesomeIcon icon={faHeart} />

                            {cantidadFavoritos > 0 && (
                                <span className="contador-favoritos">
                                    {cantidadFavoritos}
                                </span>
                            )}
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/carrito"
                            className="icono-carrito"
                            aria-label="Carrito"
                        >
                            <FontAwesomeIcon icon={faCartShopping} />

                            {cantidadTotal > 0 && (
                                <span className="contador-carrito">
                                    {cantidadTotal}
                                </span>
                            )}
                        </Link>
                    </li>

                    <li>
                        <Link
                            to={sesion ? '/perfil' : '/login'}
                            aria-label={
                                sesion ? 'Mi perfil' : 'Iniciar sesión'
                            }
                        >
                            <FontAwesomeIcon icon={faCircleUser} />
                        </Link>
                    </li>

                </ul>
            </div>

        </header>
    );
}

export default Header;
