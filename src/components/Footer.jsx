import {Link} from 'react-router-dom'
import logo from '../assets/img/logo-navbar.png'
import {itemsMenu} from '../data/itemsMenu'

function Footer({itemsMenu}) {
    return (
        <>
        <footer>
      <div className="informacion">
        <div className="descripcion">
          <div className="logo">
            <img src={logo} alt="Gas el Volcan" />
          </div>
          <div className="texto">
            <p>
              Gas El Volcán, una empresa familiar con más de 25 años de experiencia en la distribución de gas licuado a domicilio en Chillán y la Región de Ñuble. Desde 1998, llevamos energía y calidez a hogares y comercios.
            </p>
          </div>
        </div>

        <div className="navegacion">
          <h2>Menú</h2>
          <div className="filas">
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><a href="/#nosotros">Nosotros</a></li>
              <li><a href="/#catalogo">Catálogo</a></li>
              <li><Link to="/productos">Productos</Link></li>
            </ul>
            <ul>
              <li><a href="/#contactos">Contactos</a></li>
              <li><Link to="/">Favoritos</Link></li>
              <li><Link to="/">Carrito</Link></li>
              <li><Link to="/login">Cuenta</Link></li>
            </ul>
          </div>
        </div>

        <div className="direccion">
          <h2>Dirección y Redes</h2>
          <div className="filas">
            <ul>
              <li>
                <Link to="/">
                  <i className="fa-solid fa-location-dot"></i> Av. Vicuña Mackenna 2450, Local 18, Santiago, Chile
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa-solid fa-phone"></i> +569 3650 9979
                </Link>
              </li>
              <li className="redes">
                <Link to="/">
                  <i className="fa-brands fa-instagram"></i>{" "}
                  <i className="fa-brands fa-facebook"></i>{" "}
                  <i className="fa-brands fa-tiktok"></i>{" "}
                  <i className="fa-brands fa-x-twitter"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="derechos-autor">
        <p>Copyright © 2026 Gas El Volcán | Desarrollado por Ping&amp;Lag</p>
      </div>
    </footer>

        </>
    )

}

export default Footer
