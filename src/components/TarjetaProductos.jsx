
import { useState } from 'react';
import { Link } from 'react-router-dom';

function TarjetaProductos({ producto, seccion }) {

    const [meGusta, setMeGusta] = useState(false);

    const alternar = () => {
        setMeGusta(!meGusta);
    };

    // Ruta dinámica según el producto seleccionado
    const rutaDetalle = `/productos/detalle-producto/${producto.sku}`;

    // TARJETAS DE LA PÁGINA DE INICIO
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

    // TARJETAS DE LA PÁGINA PRODUCTOS
    return (
        <article
            id={producto.sku}
            className="producto"
        >

            {/* BOTÓN VER DETALLES */}
            <div className="ver-más">
                <Link
                    to={rutaDetalle}
                    className="btn-ver-más"
                    title="Ver producto"
                >
                    <i className="fa-solid fa-eye"></i>
                </Link>
            </div>

            {/* BOTÓN FAVORITOS */}
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

            {/* IMAGEN DEL PRODUCTO */}
            <img
                src={producto.imagen}
                alt={producto.nombre}
            />

            {/* CATEGORÍA */}
            <p>{producto.categoria}</p>

            {/* NOMBRE */}
            <h3>{producto.nombre}</h3>

            {/* PRECIO Y CARRITO */}
            <div className="compra">

                <h3 className="precio">
                    {producto.precio}
                </h3>

                <div className="añadir-carrito">
                    <Link to="/carrito">
                        Carrito{" "}
                        <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                </div>

            </div>

        </article>
    );
}

export default TarjetaProductos;
