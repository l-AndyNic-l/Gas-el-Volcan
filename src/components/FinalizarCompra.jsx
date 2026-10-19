
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function FinalizarCompra({ total, confirmarCompra, cancelar }) {

    const [datos, setDatos] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        direccion: ''
    });

    const [validado, setValidado] = useState(false);

    const manejarCambio = (e) => {
        const { name, value } = e.target;

        setDatos(actual => ({
            ...actual,
            [name]: value
        }));
    };

    const enviarFormulario = (e) => {

        e.preventDefault();

        const formulario = e.currentTarget;

        setValidado(true);

        if (!formulario.checkValidity()) {
            e.stopPropagation();
            return;
        }

        confirmarCompra(datos);
    };

    return (
        <section className="formulario-compra">

            <h2>Finalizar compra</h2>

            <Alert variant="info">
                Esta es una compra de prueba.
                No se realizará ningún cobro real.
            </Alert>

            <p>
                Total a pagar (simulado):
                <strong>
                    {' $' + total.toLocaleString('es-CL')}
                </strong>
            </p>

            <Form
                noValidate
                validated={validado}
                onSubmit={enviarFormulario}
            >

                <Form.Group className="mb-3">
                    <Form.Label>Nombre completo</Form.Label>

                    <Form.Control
                        type="text"
                        name="nombre"
                        value={datos.nombre}
                        onChange={manejarCambio}
                        placeholder="Ingrese su nombre"
                        minLength={3}
                        required
                    />

                    <Form.Control.Feedback type="invalid">
                        Ingrese un nombre de al menos 3 caracteres.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>

                    <Form.Control
                        type="email"
                        name="correo"
                        value={datos.correo}
                        onChange={manejarCambio}
                        placeholder="ejemplo@correo.cl"
                        required
                    />

                    <Form.Control.Feedback type="invalid">
                        Ingrese un correo válido.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>

                    <Form.Control
                        type="tel"
                        name="telefono"
                        value={datos.telefono}
                        onChange={manejarCambio}
                        placeholder="912345678"
                        pattern="[0-9]{9}"
                        maxLength={9}
                        required
                    />

                    <Form.Control.Feedback type="invalid">
                        Ingrese 9 números, sin espacios.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Dirección de entrega</Form.Label>

                    <Form.Control
                        type="text"
                        name="direccion"
                        value={datos.direccion}
                        onChange={manejarCambio}
                        placeholder="Calle, número y comuna"
                        minLength={5}
                        required
                    />

                    <Form.Control.Feedback type="invalid">
                        Ingrese una dirección de al menos 5 caracteres.
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="botones-finalizar-compra">

                    <Button variant="success" type="submit">
                        Confirmar compra
                    </Button>

                    <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={cancelar}
                    >
                        Volver al carrito
                    </Button>

                </div>

            </Form>

        </section>
    );
}

export default FinalizarCompra;
