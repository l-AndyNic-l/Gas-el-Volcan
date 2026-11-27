import { createContext, useContext, useEffect, useState } from 'react';
import ProductoService from '../api/ProductoService';

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {

    const [error, setError] = useState('');
    const [productos, setProductos] = useState([]);

        const cargarProductos = async() => {
            try {
                const { data } = await ProductoService.getAllProductos();
                const listarProductos = Array.isArray(data?._embedded?.productoList)
                    ? data._embedded.productoList
                    : Array.isArray(data)
                    ? data
                    : [];
    
                setProductos(listarProductos);
                setError('');
    
            } catch (error) {
                setError(error.response?.data?.message || 'No se pudieron cargar los productos.');
            }
        };
    
        useEffect(() => {
            cargarProductos();
    
        }, []);


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
