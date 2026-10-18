import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/img/logo-navbar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faCartShopping,
    faCircleUser
} from '@fortawesome/free-solid-svg-icons';

function Header({ itemsMenu = [] }) {
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
              {item.href.startsWith('#') ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <NavLink
                  to={item.href}
                  className={({ isActive }) => (isActive ? 'activo' : '')}
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
            <a href="/favoritos">
                <FontAwesomeIcon icon={faHeart} />
            </a>
        </li>

        <li>
            <a href="/carrito">
                <FontAwesomeIcon icon={faCartShopping} />
            </a>
        </li>

        <li>
            <a href="/login">
                <FontAwesomeIcon icon={faCircleUser} />
            </a>
        </li>
    </ul>
</div>
    </header>
  );
}

export default Header;