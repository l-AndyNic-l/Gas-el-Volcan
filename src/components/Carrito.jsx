import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from './CarritoContent';
import FinalizarCompra from './FinalizarCompra';

function Carrito() {

    const {
        carrito,
        eliminarDelCarrito,
        cambiarCantidad,
        vaciarCarrito
    } = useCarrito();

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [compraFinalizada, setCompraFinalizada] = useState(null);

    const obtenerPrecio = (precio) => {
        if (typeof precio === 'number') return precio;

        return Number(
            String(precio).replace(/[^\d]/g, '')
        ) || 0;
    };

    const formatoPrecio = (valor) =>
        '$' + valor.toLocaleString('es-CL');

    const total = carrito.reduce(
        (suma, producto) =>
            suma +
            obtenerPrecio(producto.precio) * producto.cantidad,
        0
    );

    const confirmarCompra = (datos) => {

        const pedido = {
            numero: `DEMO-${Date.now()}`,
            nombre: datos.nombre,
            total
        };

        setCompraFinalizada(pedido);
        setMostrarFormulario(false);
        vaciarCarrito();
    };

    if (compraFinalizada) {
        return (
            <main className="pagina-carrito">
                <div className="confirmacion-compra">
                    <h1>¡Compra simulada exitosa! 💚</h1>

                    <p>
                        Gracias, {compraFinalizada.nombre}.
                    </p>

                    <p>
                        Tu compra de prueba se completó correctamente.
                    </p>

                    <p>
                        <strong>Número de pedido:</strong>
                        {' '}{compraFinalizada.numero}
                    </p>

                    <p>
                        <strong>Total:</strong>
                        {' '}{formatoPrecio(compraFinalizada.total)}
                    </p>

                    <p>
                        No se realizó ningún pago real
                        ni se generó un despacho.
                    </p>

                    <Link to="/productos" className="btn-seguir">
                        Seguir comprando
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="pagina-carrito">
            <h1>Mi carrito de compras</h1>

            {carrito.length === 0 ? (

                <div className="carrito-vacio">
                    <h2>Tu carrito está vacío 🛒</h2>

                    <p>¡Explora nuestros productos!</p>

                    <Link to="/productos" className="btn-seguir">
                        Ver productos
                    </Link>
                </div>

            ) : mostrarFormulario ? (

                <FinalizarCompra
                    total={total}
                    confirmarCompra={confirmarCompra}
                    cancelar={() => setMostrarFormulario(false)}
                />

            ) : (

                <div className="contenedor-carrito">
                    <section className="lista-carrito">

                        {carrito.map(producto => (

                            <article
                                className="item-carrito"
                                key={producto.sku}
                            >

                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                />

                                <div className="info-item-carrito">
                                    <h3>{producto.nombre}</h3>

                                    <p className="precio-item">
                                        {formatoPrecio(
                                            obtenerPrecio(producto.precio)
                                        )}
                                    </p>

                                    <div className="controles-carrito">
                                        <div className="cantidad-carrito">
                                            <button
                                                onClick={() =>
                                                    cambiarCantidad(
                                                        producto.sku, -1
                                                    )
                                                }
                                            >
                                                −
                                            </button>

                                            <span>
                                                {producto.cantidad}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    cambiarCantidad(
                                                        producto.sku, 1
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            className="btn-eliminar"
                                            onClick={() =>
                                                eliminarDelCarrito(
                                                    producto.sku
                                                )
                                            }
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>

                                <strong className="subtotal-item">
                                    {formatoPrecio(
                                        obtenerPrecio(producto.precio) *
                                        producto.cantidad
                                    )}
                                </strong>
                            </article>
                        ))}
                    </section>

                    <aside className="resumen-carrito">
                        <h2>Resumen de compra</h2>

                        <div className="fila-resumen">
                            <span>Subtotal</span>
                            <span>{formatoPrecio(total)}</span>
                        </div>

                        <div className="fila-resumen total-resumen">
                            <strong>Total</strong>
                            <strong>{formatoPrecio(total)}</strong>
                        </div>

                        <button
                            className="btn-continuar"
                            onClick={() => setMostrarFormulario(true)}
                        >
                            Continuar compra
                        </button>

                        <Link
                            to="/productos"
                            className="seguir-comprando"
                        >
                            Seguir comprando
                        </Link>
                    </aside>
                </div>
            )}
        </main>
    );
}

export default Carrito;
