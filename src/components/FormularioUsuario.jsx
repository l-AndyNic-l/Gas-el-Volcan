import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function FormularioUsuario({ usuarioEditar, onGuardar, onCancelar }) {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [rol, setRol] = useState('cliente');

    useEffect(() => {
        if (usuarioEditar) {
            setNombre(usuarioEditar.nombre || '');
            setCorreo(usuarioEditar.correo || '');
            setRol(usuarioEditar.rol || 'cliente');
        } else {
            setNombre('');
            setCorreo('');
            setRol('cliente');
        }
    }, [usuarioEditar]);

    const manejarSubmit = (e) => {
        e.preventDefault();
        onGuardar({ nombre, correo, rol });
        if (!usuarioEditar) {
            setNombre('');
            setCorreo('');
            setRol('cliente');
        }
    };

    return (
        <Form onSubmit={manejarSubmit} className="mb-4">
            <h3>{usuarioEditar ? `Editar Usuario (ID: ${usuarioEditar.id})` : 'Registrar Usuario'}</h3>

            <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="correo@ejemplo.cl"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Rol</Form.Label>
                <Form.Select value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="cliente">Cliente</option>
                    <option value="admin">Admin</option>
                </Form.Select>
            </Form.Group>

            <div className="d-flex gap-2">
                <Button variant="primary" type="submit">
                    {usuarioEditar ? 'Actualizar Usuario' : 'Guardar Usuario'}
                </Button>
                {usuarioEditar && (
                    <Button variant="secondary" type="button" onClick={onCancelar}>
                        Cancelar
                    </Button>
                )}
            </div>
        </Form>
    );
}

export default FormularioUsuario;