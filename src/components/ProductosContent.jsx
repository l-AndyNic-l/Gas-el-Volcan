import { createContext, useContext, useState } from 'react';
import { productos as productosIniciales } from '../data/productos';

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {

    const [productos, setProductos] = useState(productosIniciales);

    const agregarProducto = (nuevoProducto) => {
        setProductos(actuales => [
            ...actuales,
            nuevoProducto
        ]);
    };

    const editarProducto = (sku, datosActualizados) => {
        setProductos(actuales =>
            actuales.map(producto =>
                producto.sku === sku
                    ? { ...producto, ...datosActualizados, sku }
                    : producto
            )
        );
    };

    const eliminarProducto = (sku) => {
        setProductos(actuales =>
            actuales.filter(producto => producto.sku !== sku)
        );
    };

    return (
        <ProductosContext.Provider
            value={{
                productos,
                agregarProducto,
                editarProducto,
                eliminarProducto
            }}
        >
            {children}
        </ProductosContext.Provider>
    );
}

export function useProductos() {
    const contexto = useContext(ProductosContext);

    if (!contexto) {
        throw new Error(
            'useProductos debe utilizarse dentro de ProductosProvider'
        );
    }

    return contexto;
}
