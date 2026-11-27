import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import VentaService from '../api/VentaService';

function FormularioVenta({ ventaEditar, cargarVentas, onCancelar }) {
    const [error, setError] = useState('');

    const [subtotal, setSubTotal] = useState('');
    const [iva, setIva] = useState('');
    const [descuento, setDescuento] = useState('');
    const [total, setTotal] = useState('');
    const [usuario, setUsuario] = useState('');
    const [estado, setEstado] = useState('');
    
    const limpiarFormulario = () => {
        setSubTotal('');
        setIva('');
        setDescuento('');
        setTotal('');
        setUsuario('');
        setEstado('');
    };

    useEffect(() => {
        if (ventaEditar) {
            setSubTotal(
                ventaEditar.subtotal !== undefined && ventaEditar.subtotal !== null
                    ? String(ventaEditar.subtotal)
                    : ''
            );
            setIva(
                ventaEditar.iva !== undefined && ventaEditar.iva !== null
                    ? String(ventaEditar.iva)
                    : ''
            );
            setDescuento(
                ventaEditar.descuento !== undefined && ventaEditar.descuento !== null
                    ? String(ventaEditar.descuento)
                    : ''
            );
            setTotal(
                ventaEditar.total !== undefined && ventaEditar.total !== null
                    ? String(ventaEditar.total)
                    : ''
            );
            setUsuario(
                ventaEditar.id_usuario !== undefined && ventaEditar.id_usuario !== null
                    ? String(ventaEditar.id_usuario)
                    : ''
            );
            setEstado(ventaEditar.estado || '');
            setError('');
        } else {
            limpiarFormulario();
        }
    }, [ventaEditar]);

    const validarNumeroNoNegativo = (valor) => {
        const n = Number(valor);
        return !isNaN(n) && n >= 0;
    };

    const validarUsuario = (valor) => {
        const n = Number(valor);
        return Number.isInteger(n) && n > 0;
    };

    const registrar = async (e) => {
        e.preventDefault();
        setError('');

        if (!validarUsuario(usuario)) {
            setError("Debe indicar un ID de usuario válido (número entero mayor a 0)");
            return;
        }

        if (!validarNumeroNoNegativo(subtotal)) {
            setError("El subtotal debe ser un número mayor o igual a 0");
            return;
        }

        if (!validarNumeroNoNegativo(iva)) {
            setError("El IVA debe ser un número mayor o igual a 0");
            return;
        }

        if (!validarNumeroNoNegativo(descuento)) {
            setError("El descuento debe ser un número mayor o igual a 0");
            return;
        }

        const totalNum = Number(total);
        if (isNaN(totalNum) || totalNum <= 0) {
            setError("El total debe ser un número mayor a 0");
            return;
        }

        const base = Number(subtotal) + Number(iva);
        if (Number(descuento) > base) {
            setError("El descuento no puede ser mayor que el subtotal + IVA");
            return;
        }

        if (!estado) {
            setError("Debe seleccionar un estado para la venta");
            return;
        }

        const venta = {
            subtotal: Number(subtotal),
            iva: Number(iva),
            descuento: Number(descuento),
            total: Number(total),
            fecha_venta: new Date(),
            id_usuario: Number(usuario),
            estado
        };

        try {
            if (ventaEditar) {
                await VentaService.updateVenta(ventaEditar.id, venta);
                cargarVentas();

                window.alert("¡Venta Actualizada Exitosamente!");

                limpiarFormulario();
                onCancelar?.();

            } else {
                await VentaService.createVenta(venta);
                cargarVentas();

                window.alert("¡Venta Creada Exitosamente!");
                limpiarFormulario();

            }
            
        } catch (error) {
            console.error("Error del servidor:", error.response?.data);

            const data = error.response?.data;
            const mensaje =
                (typeof data === 'string' && data) ||
                data?.error ||
                data?.message ||
                "Problemas al guardar la venta, intente más tarde.";

            setError(mensaje);
        }
    };

    const handleCancelar = () => {
        limpiarFormulario();
        onCancelar?.();
    };

    return (
        <Form onSubmit={registrar} className="mb-4">
            <h3>{ventaEditar ? `Actualizar Venta #${ventaEditar.id}` : 'Registrar Venta'}</h3>

            <Form.Group className="mb-3">
                <Form.Label>Cliente (ID):</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese el id del usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>IVA (%):</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Ingrese el iva"
                    min="1"
                    step="1"
                    value={iva}
                    onChange={(e) => setIva(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Subtotal $:</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Ingrese el subtotal"
                    min="1"
                    value={subtotal}
                    onChange={(e) => setSubTotal(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descuento $:</Form.Label>
                <Form.Control
                    type="number"
                    min="0"
                    placeholder="Ingrese el descuento"
                    value={descuento}
                    onChange={(e) => setDescuento(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Total ($)</Form.Label>
                <Form.Control
                    type="number"
                    min="1"
                    placeholder="Ingrese el total"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Pagada">Pagada</option>
                    <option value="Cancelada">Cancelada</option>
                </Form.Select>
            </Form.Group>

            <div className="d-flex gap-2">
                <Button variant="primary" type="submit">
                    {ventaEditar ? 'Actualizar Venta' : 'Guardar Venta'}
                </Button>

                {ventaEditar && (
                    <Button variant="secondary" type="button" onClick={handleCancelar}>
                        Cancelar
                    </Button>
                )}
            </div>
        </Form>
    );
}

export default FormularioVenta;