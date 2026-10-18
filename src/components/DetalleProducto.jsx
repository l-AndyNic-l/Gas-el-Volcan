
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productos } from '../data/productos';

function DetalleProductos() {
    const { sku } = useParams();

    const producto = productos.find(
        (item) => item.sku === sku
    );

    const [meGusta, setMeGusta] = useState(false);

    const alternar = () => {
        setMeGusta(!meGusta);
    };

    if (!producto) {
        return (
            <div className="contenedor-producto">
                <div>
                    <h2>Producto no encontrado</h2>
                    <Link to="/productos">
                        Volver a productos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="contenedor-producto">

            <div className="galeria-producto">
                <div className="miniaturas">
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                    />
                </div>

                <div className="imagen-principal">
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                    />
                </div>
            </div>

            <div className="detalles-producto">

                <span className="marca">
                    {producto.nombre.split(" ")[1]}
                </span>

                <h1>{producto.nombre}</h1>

                <div className="precio-sku">
                    <span className="precio">
                        {producto.precio}
                    </span>

                    <span className="sku">
                        SKU: {producto.sku}
                    </span>
                </div>

                <div className="acciones-compra">

                    <button
                        type="button"
                        className="btn-anadir-carrito"
                    >
                        Agregar al Carrito
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>

                    <button
                        type="button"
                        className="btn-favorito"
                        onClick={alternar}
                        aria-label="Agregar a favoritos"
                        aria-pressed={meGusta}
                    >
                        <i
                            className="fa-solid fa-heart"
                            style={{
                                color: meGusta ? "red" : ""
                            }}
                        ></i>
                    </button>

                </div>

                <div className="acordeon-info">

                    <details open>
                        <summary>
                            <strong>DESCRIPCIÓN</strong>
                        </summary>

                        <p>{producto.descripcion}</p>
                    </details>

                    <details>
                        <summary>
                            <strong>DESPACHO Y COBERTURA</strong>
                        </summary>

                        <p>
                            Distribución de gas licuado
                            a domicilio en Chillán y
                            la Región de Ñuble.
                        </p>
                    </details>

                    <details>
                        <summary>
                            <strong>INFORMACIÓN DEL PRODUCTO</strong>
                        </summary>

                        <p>
                            Producto: {producto.nombre}
                        </p>

                        <p>
                            Categoría: {producto.categoria}
                        </p>

                        <p>
                            Código: {producto.sku}
                        </p>
                    </details>

                </div>

            </div>
        </div>
    );
}

export default DetalleProductos;
