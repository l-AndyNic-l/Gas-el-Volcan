import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import video from '../assets/video/Chillan, Región del Ñuble.mp4'

function Formulario() {

    return(
        <>
            <div className="contenedor-contactos">
                <div className="contactos-formulario">
                    <Form id="mensaje">
                        <Form.Group className="mb-4" controlId="formNombre">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese su nombre"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formCorreo">
                            <Form.Label>Correo:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Escribe tu correo..."
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formMensaje">
                            <Form.Label>Mensaje:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Escribe tu mensaje..."
                                required
                            />
                        </Form.Group>

                        <div className="btn-redes-sociales">
                            <Button variant="success" type="submit">
                                Enviar
                            </Button>

                            <ul>
                                <li><a href=""><i class="fa-brands fa-instagram"></i></a></li>
                                <li><a href=""><i class="fa-brands fa-facebook"></i></a></li>
                                <li><a href=""><i class="fa-brands fa-tiktok"></i></a></li>
                                <li><a href=""><i class="fa-brands fa-x-twitter"></i></a></li>
                            </ul>
                        </div>
                    </Form>
                </div>

                <div className="contactos-map">
                    <video autoPlay loop muted>
                        <source src={video} type="video/mp4" />
                    </video>
                    <a href="">
                        <i class="fa-solid fa-location-dot"></i> Av. Vicuña Mackenna 2450, Local 18, Santiago, Chile
                    </a>
                </div>
            </div>
        </>
    )
}

export default Formulario