import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function TablaVentas({ ventas, onEditar, onEliminar }) {
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>ID Venta</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Detalle</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {ventas.length > 0 ? (
                    ventas.map((v) => (
                        <tr key={v.id}>
                            <td>{v.id}</td>
                            <td>{v.cliente}</td>
                            <td>{v.fecha}</td>
                            <td>{v.detalle}</td>
                            <td>${Number(v.total).toLocaleString('es-CL')}</td>
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
    );
}

export default TablaVentas;