
import TarjetaProductos from './TarjetaProductos';

function GaleriaProductos({ productos, seccion }) {
    return (
        <>
            {productos.map((producto) => (
                <TarjetaProductos
                    key={producto.sku}
                    producto={producto}
                    seccion={seccion}
                />
            ))}
        </>
    );
}

export default GaleriaProductos;
