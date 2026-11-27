import { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import UsuarioService from '../api/UsuarioService';

function FinalizarCompra({ total, confirmarCompra, cancelar }) {

    const [estado, setEstado] = useState(false);

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');

    const cargarUsuario = async () => {
        try {
            const sesion = JSON.parse(localStorage.getItem('sesion'));

            if (!sesion?.userId) {
                throw new Error('No existe una sesión activa');
            }

            const usuario = await UsuarioService.getUsuarioById(sesion.userId);

            if (usuario.data.correo === sesion.correo) {
                setNombre(`${usuario.data.nombre} ${usuario.data.apellido}`);
                setCorreo(usuario.data.correo);
                setTelefono(usuario.data.telefono);
                setDireccion(usuario.data.direccion);
                setEstado(true);
            }

        } catch (error) {
            console.error('Error al cargar usuario:', error);
        }
    };

    useEffect( () => {
        cargarUsuario()
    }, [])

    const enviarFormulario = (e) => {
        e.preventDefault()

        const sesion = JSON.parse(localStorage.getItem('sesion'));

        const datos = {
            subtotal: total - (total * 0.19),
            iva: 19,
            descuento: 0,
            total: Number(total),
            fecha_venta: new Date(),
            id_usuario: Number(sesion.userId),
            estado: "Pendiente"
        };

        confirmarCompra(datos, nombre);
    }

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
                    ${new Intl.NumberFormat('es-CL').format(total)}
                </strong>
            </p>

            <Form
                noValidate
                onSubmit={enviarFormulario}
            >

                <Form.Group className="mb-3">
                    <Form.Label>Nombre completo:</Form.Label>

                    <Form.Control
                        type="text"
                        name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ingrese su nombre"
                        minLength={3}
                        readOnly={estado}
                        required
                    />

                    <Form.Control.Feedback type="invalid">
                        Ingrese un nombre de al menos 3 caracteres.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Correo electrónico:</Form.Label>

                    <Form.Control
                        type="email"
                        name="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        placeholder="ejemplo@correo.cl"
                        readOnly={estado}
                        required
                    />

                    <Form.Control.Feedback type="invalid">
                        Ingrese un correo válido.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Teléfono:</Form.Label>

                    <Form.Control
                        type="tel"
                        name="telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="912345678"
                        pattern="[0-9]{9}"
                        maxLength={9}
                        readOnly={estado}
                        required
                    />

                    <Form.Control.Feedback type="invalid">
                        Ingrese 9 números, sin espacios.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Dirección de entrega:</Form.Label>

                    <Form.Control
                        type="text"
                        name="direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        placeholder="Calle, número y comuna"
                        minLength={5}
                        readOnly={estado}
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