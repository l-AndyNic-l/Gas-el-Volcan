import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollContactos() {

    const location = useLocation();

    useEffect(() => {

        if (
            location.pathname !== '/' ||
            location.hash !== '#contactos'
        ) {
            return;
        }

        let intentos = 0;
        let temporizador;

        const buscarContactos = () => {

            const seccion = document.getElementById('contactos');

            if (seccion) {

                seccion.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                return;
            }

            if (intentos < 20) {
                intentos++;
                temporizador = setTimeout(buscarContactos, 100);
            }
        };

        buscarContactos();

        return () => clearTimeout(temporizador);

    }, [location.pathname, location.hash, location.key]);

    return null;
}

export default ScrollContactos;
