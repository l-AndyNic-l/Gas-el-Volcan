
import { Link } from 'react-router-dom';
import { useFavoritos } from '../components/FavoritoContent';
import { useCarrito } from '../components/CarritoContent';
import '../App.css';

function    Favorito() {

    const { favoritos, alternarFavorito } = useFavoritos();
    const { agregarAlCarrito } = useCarrito();

    return (
        <main className="pagina-favoritos">

            <h1>Mis Favoritos</h1>

            {favoritos.length === 0 ? (

                <div className="favoritos-vacios">
                    <i className="fa-regular fa-heart"></i>

                    <h2>Aún no tienes favoritos</h2>

                    <p>
                        Explora nuestros productos y guarda
                        los que más te gusten.
                    </p>

                    <Link to="/productos" className="btn-explorar">
                        Explorar productos
                    </Link>
                </div>

            ) : (

                <div className="lista-favoritos">

                    {favoritos.map(producto => (

                        <article
                            key={producto.sku}
                            className="tarjeta-favorito"
                        >

                            <Link
                                to={`/productos/detalle-producto/${producto.sku}`}
                            >
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                />
                            </Link>

                            <h3>{producto.nombre}</h3>

                            <p className="precio-favorito">
                                {producto.precio}
                            </p>

                            <div className="acciones-favorito">

                                <button
                                    type="button"
                                    className="btn-agregar-favorito"
                                    onClick={() => agregarAlCarrito(producto)}
                                >
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    Añadir al carrito
                                </button>

                                <button
                                    type="button"
                                    className="btn-quitar-favorito"
                                    onClick={() => alternarFavorito(producto)}
                                    aria-label={`Quitar ${producto.nombre} de favoritos`}
                                >
                                    <i className="fa-solid fa-heart"></i>
                                </button>

                            </div>

                        </article>

                    ))}

                </div>

            )}

        </main>
    );
}

export default Favorito;
