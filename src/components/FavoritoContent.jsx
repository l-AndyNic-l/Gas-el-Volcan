
import { createContext, useContext, useEffect, useState } from 'react';

const FavoritosContext = createContext(null);

export function FavoritosProvider({ children }) {

    const [favoritos, setFavoritos] = useState(() => {
        try {
            const guardados = JSON.parse(
                localStorage.getItem('favoritos')
            );

            return Array.isArray(guardados) ? guardados : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            'favoritos',
            JSON.stringify(favoritos)
        );
    }, [favoritos]);

    const alternarFavorito = (producto) => {
        setFavoritos(actuales => {

            const existe = actuales.some(
                item => item.sku === producto.sku
            );

            if (existe) {
                return actuales.filter(
                    item => item.sku !== producto.sku
                );
            }

            return [...actuales, producto];
        });
    };

    const esFavorito = (sku) => {
        return favoritos.some(item => item.sku === sku);
    };

    return (
        <FavoritosContext.Provider
            value={{
                favoritos,
                alternarFavorito,
                esFavorito,
                cantidadFavoritos: favoritos.length
            }}
        >
            {children}
        </FavoritosContext.Provider>
    );
}

export function useFavoritos() {
    const contexto = useContext(FavoritosContext);

    if (!contexto) {
        throw new Error(
            'useFavoritos debe usarse dentro de FavoritosProvider'
        );
    }

    return contexto;
}
