
import { useState } from 'react';
import { filtros } from '../data/filtros';
import FiltroProductos from './FiltroProductos';
import GaleriaProductos from './GaleriaProductos';
import { useProductos } from './ProductosContent';
import Seccion from './Seccion';

function Productos() {

    const [filtroActivo, setFiltroActivo] = useState("todo");

    const { productos } = useProductos();

    const productosFiltrados = productos.filter(producto => {

        if (filtroActivo === "todo") {
            return true;
        }

        return producto.categoria.trim().toLowerCase() ===
               filtroActivo.trim().toLowerCase();
    });

    return (
        <Seccion
            clase="productos"
            titulo="Galones y Accesorios"
        >
            <div className="contenedor-categorias">

                <FiltroProductos
                    filtros={filtros}
                    filtroActivo={filtroActivo}
                    cambiarFiltro={setFiltroActivo}
                />

                <div className="contenedor-productos">

                    {productosFiltrados.length > 0 ? (
                        <GaleriaProductos
                            productos={productosFiltrados}
                            seccion="Productos"
                        />
                    ) : (
                        <p>
                            No hay productos disponibles
                            en esta categoría.
                        </p>
                    )}

                </div>

            </div>
        </Seccion>
    );
}

export default Productos;
