
import GaleriaProductos from './GaleriaProductos';
import Seccion from './Seccion';
import { useNavigate } from 'react-router-dom';
import { useProductos } from './ProductosContent';
import Formulario from './Formulario';

function Main() {

    const navigate = useNavigate();

    const { productos } = useProductos();

    return (
        <>
            <Seccion clase="presentacion" titulo="">
                <div className="contenedor-presentacion">
                    <h1>
                        Gas El Volcán: Calor que llena tu Hogar
                    </h1>

                    <p>
                        Más de 25 años llevando calor y energía
                        a los hogares y comercios de Chillán
                        y la región de Ñuble. Calidad, seguridad
                        y puntualidad en cada entrega.
                        <br />
                        Servicios y atención al cliente 24/7
                        para que nunca te falte energía.
                    </p>

                    <button
                        onClick={() => navigate('/productos')}
                    >
                        Solicita tu Suministro
                    </button>
                </div>
            </Seccion>

            <Seccion
                clase="productos"
                titulo="Nuestro Catálogo de Productos"
            >
                <div className="contenedor-productos">
                    <GaleriaProductos
                        productos={productos}
                        seccion="Inicio"
                    />
                </div>
            </Seccion>

            <div id="contactos">
                <Seccion
                    clase="contactos"
                    titulo="Contáctanos"
                >
                    <Formulario />
                </Seccion>
            </div>
        </>
    );
}

export default Main;
    