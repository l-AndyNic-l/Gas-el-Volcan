import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import UsuarioService from '../api/UsuarioService';

function TablaUsuarios({ usuarios, setError, cargarUsuarios, setUsuarioEditar }) {
    const [busquedaId, setBusquedaId] = useState('');
    const [filtroIdActivo, setFiltroIdActivo] = useState('');

    const buscarPorId = (e) => {
        e.preventDefault();
        setFiltroIdActivo(busquedaId.trim());
    };

    const usuariosMostrados = filtroIdActivo
        ? usuarios.filter((u) => String(u.id) === filtroIdActivo)
        : usuarios;

    const onEditar = (usuario) => {
        setUsuarioEditar(usuario);
    }

    const onEliminar = async (id) => {
        const confirmado = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
            if (!confirmado) {
                return;
        }

        try {
            const respuesta = await UsuarioService.deleteUsuario(id);

                if (respuesta.status === 204) {
                    cargarUsuarios();
                    setError('');
                    window.alert('Usuario eliminado exitosamente');
                }

        } catch (err) {
            const mensaje = err.response?.data?.message || 'No se pudo eliminar el usuario.';

            setError(mensaje);
            window.alert(mensaje);
        };
};

    return (
        <div>
            <Form onSubmit={buscarPorId} className="mb-3" style={{ maxWidth: '420px' }}>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Buscar usuario por ID..."
                        value={busquedaId}
                        onChange={(e) => setBusquedaId(e.target.value)}
                    />
                    <Button variant="primary" type="submit">Buscar</Button>
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={() => {
                            setBusquedaId('');
                            setFiltroIdActivo('');
                        }}
                    >
                        Todos
                    </Button>
                </InputGroup>
            </Form>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosMostrados.length > 0 ? (
                        usuariosMostrados.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.nombre + " " + u.apellido}</td>
                                <td>{u.correo}</td>
                                <td>{u.tipo_usuario}</td>
                                <td className="d-flex gap-2">
                                    <Button variant="primary" size="sm" onClick={() => onEditar(u)}>
                                        Editar
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => onEliminar(u.id)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No hay usuarios para mostrar.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default TablaUsuarios;