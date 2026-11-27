import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import VentaService from '../api/VentaService';

function TablaVentas({ ventas, setError, cargarVentas, setVentaEditar }) {

    const [busquedaId, setBusquedaId] = useState('');
    const [filtroIdActivo, setFiltroIdActivo] = useState('');

    const buscarPorId = (e) => {
        e.preventDefault();
        setFiltroIdActivo(busquedaId.trim());
    };

    const ventasMostradas = filtroIdActivo
        ? ventas.filter((v) => String(v.id) === filtroIdActivo)
        : ventas;

    const onEditar = (ventas) => {
        setVentaEditar(ventas);
    }

    const onEliminar = async (id) => {
        const confirmado = window.confirm('¿Estás seguro de que quieres eliminar esta venta?');
            if (!confirmado) {
                return;
        }

        try {
            const respuesta = await VentaService.deleteVenta(id);

                if (respuesta.status === 204) {
                    cargarVentas();
                    setError('');
                    window.alert('Venta eliminado exitosamente');
                }

        } catch (err) {
            const mensaje = err.response?.data?.message || 'No se pudo eliminar la venta.';

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
                        placeholder="Buscar producto por ID..."
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
                    <th>ID Cliente</th>
                    <th>Fecha</th>
                    <th>SubTotal</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {ventasMostradas.length > 0 ? (
                    ventasMostradas.map((v) => (
                        <tr key={v.id}>
                            <td>{v.id}</td>
                            <td>{v.id_usuario}</td>
                            <td>
                                {new Intl.DateTimeFormat('es-CL', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }).format(new Date(v.fecha_venta))}
                            </td>
                            <td>${new Intl.NumberFormat('es-CL').format(v.subtotal)}</td>
                            <td>${new Intl.NumberFormat('es-CL').format(v.total)}</td>
                            <td>{v.estado}</td>

                            <td className="d-flex gap-2">
                                <Button variant="primary" size="sm" onClick={() => onEditar(v)}>
                                    Editar
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => onEliminar(v.id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center">No hay ventas registradas.</td>
                    </tr>
                )}
            </tbody>
        </Table>
        </div>
    );
}

export default TablaVentas;