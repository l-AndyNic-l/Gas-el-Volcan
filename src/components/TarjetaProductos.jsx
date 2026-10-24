import { Link } from 'react-router-dom';
import { useCarrito } from '../components/CarritoContent';
import { useFavoritos } from "./FavoritoContent";

function TarjetaProductos({ producto, seccion }) {

    const { agregarAlCarrito } = useCarrito();
    const { alternarFavorito, esFavorito } = useFavoritos();

    const meGusta = esFavorito(producto.sku);

    const alternar = () => {
        alternarFavorito(producto);
    };

    const rutaDetalle = `/productos/detalle-producto/${producto.sku}`;

    if (seccion === "Inicio") {
        return (
            <article className="tarjeta-catalogo">

                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                />

                <h3>{producto.nombre}</h3>

                <p>{producto.descripcion}</p>

                <div className="overlay">
                    <Link
                        to={rutaDetalle}
                        className="btn-categoria"
                    >
                        Ver Producto
                    </Link>
                </div>

            </article>
        );
    }

    return (
        <article
            id={producto.sku}
            className="producto"
        >

            <div className="ver-más">
                <Link
                    to={rutaDetalle}
                    className="btn-ver-más"
                    title="Ver producto"
                >
                    <i className="fa-solid fa-eye"></i>
                </Link>
            </div>

            <div
                className="ver-más"
                style={{ marginTop: "50px" }}
            >
                <button
                    type="button"
                    onClick={alternar}
                    className="btn-ver-más"
                    title="Agregar a favoritos"
                    aria-label="Alternar favorito"
                    aria-pressed={meGusta}
                    style={{
                        cursor: "pointer",
                        border: "none",
                        backgroundColor: meGusta
                            ? "rgb(219, 0, 0)"
                            : "aqua",
                        color: meGusta
                            ? "white"
                            : "black"
                    }}
                >
                    <i className="fa-solid fa-heart"></i>
                </button>
            </div>

            <img
                src={producto.imagen}
                alt={producto.nombre}
            />

            <p>{producto.categoria}</p>

            <h3>{producto.nombre}</h3>

            <div className="compra">

                <h3 className="precio">
                    {producto.precio}
                </h3>

                <div className="añadir-carrito">
                    <button
                        type="button"
                        onClick={() => agregarAlCarrito(producto)}
                    >
                        Carrito
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>

            </div>

        </article>
    );
}

export default TarjetaProductos;
