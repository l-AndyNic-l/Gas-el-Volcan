import { Link } from 'react-router-dom';
import GaleriaProductos from './GaleriaProductos';
import { useProductos } from './ProductosContent';

function Tienda() {

    const { productos } = useProductos();

    const productosDestacados = productos.slice(0, 8);

    return (
        <main className="pagina-tienda">
            <section className="encabezado-tienda">
                <h1>Bienvenido a nuestra Tienda</h1>

                <p>
                    Encuentra productos para tu hogar
                    con la calidad de Gas El Volcán.
                </p>

                <Link to="/carrito" className="boton-carrito-tienda">
                    Ver mi carrito
                </Link>
            </section>

            <section className="contenido-tienda">
                <h2>Productos destacados</h2>

                <div className="contenedor-productos">
                    <GaleriaProductos
                        productos={productosDestacados}
                        seccion="Tienda"
                    />
                </div>

                <div className="acciones-tienda">
                    <Link
                        to="/productos"
                        className="boton-productos-tienda"
                    >
                        Ver todos los productos
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default Tienda;
