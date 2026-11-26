import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function FormularioVenta({ ventaEditar, onGuardar, onCancelar }) {
    const [cliente, setCliente] = useState('');
    const [detalle, setDetalle] = useState('');
    const [total, setTotal] = useState('');
    const [estado, setEstado] = useState('Pendiente');

    useEffect(() => {
        if (ventaEditar) {
            setCliente(ventaEditar.cliente || '');
            setDetalle(ventaEditar.detalle || '');
            setTotal(ventaEditar.total || '');
            setEstado(ventaEditar.estado || 'Pendiente');
        } else {
            setCliente('');
            setDetalle('');
            setTotal('');
            setEstado('Pendiente');
        }
    }, [ventaEditar]);

    const manejarSubmit = (e) => {
        e.preventDefault();
        onGuardar({
            cliente,
            detalle,
            total: Number(total),
            estado
        });
        if (!ventaEditar) {
            setCliente('');
            setDetalle('');
            setTotal('');
            setEstado('Pendiente');
        }
    };

    return (
        <Form onSubmit={manejarSubmit} className="mb-4">
            <h3>{ventaEditar ? `Actualizar Venta #${ventaEditar.id}` : 'Registrar Venta'}</h3>

            <Form.Group className="mb-3">
                <Form.Label>Cliente</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombre del cliente"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Detalle</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ej: 2x Galón Gas 15kg"
                    value={detalle}
                    onChange={(e) => setDetalle(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Total ($)</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="25000"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Completada">Completada</option>
                    <option value="Cancelada">Cancelada</option>
                </Form.Select>
            </Form.Group>

            <div className="d-flex gap-2">
                <Button variant="primary" type="submit">
                    {ventaEditar ? 'Actualizar Venta' : 'Guardar Venta'}
                </Button>
                {ventaEditar && (
                    <Button variant="secondary" type="button" onClick={onCancelar}>
                        Cancelar
                    </Button>
                )}
            </div>
        </Form>
    );
}

export default FormularioVenta;