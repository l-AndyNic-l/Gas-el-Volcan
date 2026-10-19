
import { createContext, useContext, useState } from 'react';

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {

    const [carrito, setCarrito] = useState(() => {
        try {
            const guardado = JSON.parse(
                localStorage.getItem('carrito')
            );

            return Array.isArray(guardado) ? guardado : [];
        } catch {
            return [];
        }
    });

    const guardarCarrito = (nuevoCarrito) => {
        setCarrito(nuevoCarrito);
        localStorage.setItem(
            'carrito',
            JSON.stringify(nuevoCarrito)
        );
    };

    const agregarAlCarrito = (producto, cantidad = 1) => {

        const cantidadAgregar = Math.max(
            1,
            Math.floor(Number(cantidad) || 1)
        );

        setCarrito(carritoActual => {

            const existe = carritoActual.some(
                item => item.sku === producto.sku
            );

            const nuevoCarrito = existe
                ? carritoActual.map(item =>
                    item.sku === producto.sku
                        ? {
                            ...item,
                            cantidad: item.cantidad + cantidadAgregar
                        }
                        : item
                )
                : [
                    ...carritoActual,
                    {
                        ...producto,
                        cantidad: cantidadAgregar
                    }
                ];

            localStorage.setItem(
                'carrito',
                JSON.stringify(nuevoCarrito)
            );

            return nuevoCarrito;
        });
    };

    const eliminarDelCarrito = (sku) => {
        guardarCarrito(
            carrito.filter(item => item.sku !== sku)
        );
    };

    const cambiarCantidad = (sku, cambio) => {
        guardarCarrito(
            carrito.map(item =>
                item.sku === sku
                    ? {
                        ...item,
                        cantidad: Math.max(
                            1,
                            item.cantidad + cambio
                        )
                    }
                    : item
            )
        );
    };

    // Nueva función: vaciar el carrito
    const vaciarCarrito = () => {
        guardarCarrito([]);
    };

    const cantidadTotal = carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                cambiarCantidad,
                vaciarCarrito,
                cantidadTotal
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {

    const context = useContext(CarritoContext);

    if (!context) {
        throw new Error(
            'useCarrito debe usarse dentro de CarritoProvider'
        );
    }

    return context;
}
