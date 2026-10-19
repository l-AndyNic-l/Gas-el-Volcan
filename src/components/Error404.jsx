
import { Link } from 'react-router-dom';

function Error404() {

    return (
        <section className="pagina-error">

            <div className="contenedor-error">

                <h1>404</h1>

                <h2>¡Página no encontrada!</h2>

                <p>
                    Lo sentimos, la página que estás buscando no existe o ha cambiado de dirección.
                </p>

                <p>
                    Puedes volver al inicio y seguir explorando los productos de Gas El Volcán.
                </p>

                <Link to="/" className="boton-volver-inicio">
                    Volver al Inicio
                </Link>

            </div>

        </section>
    );
}

export default Error404;
