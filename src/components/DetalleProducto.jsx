import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProductos } from './ProductosContent';
import { useCarrito } from './CarritoContent';
import { useFavoritos } from './FavoritoContent';

function DetalleProductos() {

    const { productos } = useProductos();
    const { sku } = useParams();
    const navigate = useNavigate();

    const { agregarAlCarrito } = useCarrito();
    const { alternarFavorito, esFavorito } = useFavoritos();

    const [cantidad, setCantidad] = useState(1);

    const producto = productos.find(
        item => String(item.sku) === String(sku)
    );

    const marcas = ['Gasco', 'Lipigas', 'Abastible'];
    const formatos = ['5kg', '11kg', '15kg'];

    const normalizar = (texto) =>
        String(texto ?? '')
            .toLowerCase()
            .replace(/\s+/g, '');

    const marcaActual = marcas.find(marca =>
        normalizar(producto?.nombre).includes(normalizar(marca))
    );

    const formatoActual = formatos.find(formato =>
        normalizar(producto?.nombre).includes(normalizar(formato))
    );

    useEffect(() => {
        setCantidad(1);
    }, [sku]);

    const cambiarVariante = (marca, formato) => {

        if (!marca || !formato) return;

        const nuevoProducto = productos.find(item => {

            const nombre = normalizar(item.nombre);

            return (
                nombre.includes(normalizar(marca)) &&
                nombre.includes(normalizar(formato))
            );
        });

        if (nuevoProducto) {
            navigate(
                `/productos/detalle-producto/${nuevoProducto.sku}`
            );
        }
    };


    const modificarCantidad = (cambio) => {
        setCantidad(actual => Math.max(1, actual + cambio));
    };


    const añadirAlCarrito = () => {
        if (producto) {
            agregarAlCarrito(producto, cantidad);
        }
    };

    const meGusta = producto
        ? esFavorito(producto.sku)
        : false;

    const alternar = () => {
        if (producto) {
            alternarFavorito(producto);
        }
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
                        src={producto.img}
                        alt={producto.nombre}
                    />
                </div>

                <div className="imagen-principal">
                    <img
                        src={producto.img}
                        alt={producto.nombre}
                    />
                </div>
            </div>

            <div className="detalles-producto">
                <span className="marca">
                    {producto.marca}
                </span>

                <h1>{producto.nombre}</h1>

                <div className="precio-sku">
                    <span className="precio">
                        ${new Intl.NumberFormat('es-CL').format(producto.precio)}
                    </span>

                    <span className="sku">
                        SKU: {producto.sku}
                    </span>
                </div>

                {producto.categoria === "Gas" && (
                    <div className="variantes">
                        <p>
                            <strong>Selecciona la Marca:</strong>
                        </p>

                        <div className="opciones-variantes">
                            {marcas.map(marca => {

                                const disponible = productos.some(item => {

                                    const nombre = normalizar(item.nombre);

                                    return (
                                        nombre.includes(normalizar(marca)) &&
                                        nombre.includes(normalizar(formatoActual))
                                    );
                                });

                                return (
                                    <button
                                        key={marca}
                                        type="button"
                                        disabled={!formatoActual || !disponible}
                                        className={`btn-marca ${
                                            marcaActual === marca
                                                ? `activa-${marca.toLowerCase()}`
                                                : ''
                                        }`}

                                        onClick={() =>
                                            cambiarVariante(marca, formatoActual)
                                        }
                                    >
                                        {marca}
                                    </button>
                                );
                            })}

                        </div>

                        <p style={{ marginTop: '15px' }}>
                            <strong>Selecciona el Formato:</strong>
                        </p>

                        <div className="opciones-variantes">
                            {formatos.map(formato => {

                                const disponible = productos.some(item => {

                                    const nombre = normalizar(item.nombre);

                                    return (
                                        nombre.includes(normalizar(marcaActual)) &&
                                        nombre.includes(normalizar(formato))
                                    );
                                });

                                return (
                                    <button
                                        key={formato}
                                        type="button"
                                        disabled={!marcaActual || !disponible}
                                        className={`btn-variante ${
                                            formatoActual === formato
                                                ? 'activa'
                                                : ''
                                        }`}

                                        onClick={() =>
                                            cambiarVariante(marcaActual, formato)
                                        }
                                    >
                                        {formato}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="acciones-compra">
                    <div className="selector-cantidad">
                        <button
                            type="button"
                            onClick={() => modificarCantidad(-1)}
                            disabled={cantidad <= 1}
                        >
                            -
                        </button>

                        <input
                            type="text"
                            value={cantidad}
                            readOnly
                            aria-label="Cantidad de productos"
                            style={{
                                width: '45px',
                                textAlign: 'center',
                                border: 'none'
                            }}
                        />

                        <button
                            type="button"
                            onClick={() => modificarCantidad(1)}
                        >
                            +
                        </button>
                    </div>

                    <button
                        type="button"
                        className="btn-anadir-carrito"
                        onClick={añadirAlCarrito}
                    >
                        <i className="fa-solid fa-cart-shopping"></i>
                        Añadir al Carrito
                    </button>

                    <button
                        type="button"
                        className="btn-favorito"
                        onClick={alternar}
                        aria-label="Alternar favorito"
                        aria-pressed={meGusta}
                    >
                        <i
                            className="fa-solid fa-heart"
                            style={{
                                color: meGusta ? 'red' : ''
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
                            {producto.despacho}
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
