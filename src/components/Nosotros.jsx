
import imagen from '../assets/img/nosotros.jpg';
import Seccion from './Seccion';

function Nosotros() {
    return (
        <>
            <Seccion
                clase="nosotros"
                titulo="Nosotros - Gas El Volcán"
            >

                <div className="historia-principal">

                    <div className="nosotros-imagen">
                        <img
                            src={imagen}
                            alt="Distribuidora Gas El Volcán"
                        />
                    </div>

                    <div className="cuerpo-historia">

                        <div className="historia-tag">
                            Desde 1998
                        </div>

                        <h3>
                            Más que gas, entregamos tranquilidad y calidez
                        </h3>

                        <p>
                            Somos Distribuidora de Gas El Volcán, una empresa familiar con más de 25 años de trayectoria en la distribución de gas licuado a domicilio en Chillán y comunas aledañas de la Región de Ñuble.
                        </p>

                        <p> 
                            Nacimos en 1998 con el objetivo de llevar calor y energía a los hogares y comercios de nuestra comunidad. Desde entonces, hemos seguido creciendo, manteniendo siempre la cercanía y confianza que nos caracteriza.
                        </p>

                        <p>
                            Actualmente contamos con dos camiones de reparto, tres repartidores, una operadora de llamadas y una administradora. Atendemos entre 80 y 120 pedidos diarios de cilindros de gas de 5, 11 y 15 kg.
                        </p>

                        <p>
                            Trabajamos con un firme compromiso con la calidad y la seguridad, desde la recepción del pedido hasta la entrega en tu puerta. Nuestro equipo busca brindar siempre una atención cálida, rápida y eficiente.
                        </p>

                        <p>
                            Antes trabajábamos con un sistema manual basado en cuadernos y llamadas telefónicas. Hoy estamos avanzando hacia la transformación digital de nuestros servicios, para ofrecer una experiencia más ágil y transparente.
                        </p>

                        <p>
                            Nos diferenciamos por nuestra cercanía con el cliente, la rapidez en las entregas y la capacidad de responder ante los imprevistos del día a día.
                        </p>

                    </div>

                </div>

                <div className="historia-frase">
                    <p>
                        “Más que gas, entregamos tranquilidad y calidez a cada familia de nuestra querida Región de Ñuble.”
                    </p>
                </div>

                <div className="historia-pixel"></div>

            </Seccion>
        </>
    );
}

export default Nosotros;
