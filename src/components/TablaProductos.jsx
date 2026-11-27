import { useState } from "react";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import ProductoService from "../api/ProductoService";

function TablaProductos({ productos, setError, cargarProductos, setProductoEditar }) {

    const [busquedaId, setBusquedaId] = useState('');
    const [filtroIdActivo, setFiltroIdActivo] = useState('');

    const buscarPorId = (e) => {
        e.preventDefault();
        setFiltroIdActivo(busquedaId.trim());
    };

    const productosMostrados = filtroIdActivo
        ? productos.filter((p) => String(p.id) === filtroIdActivo)
        : productos;

    const onEditar = (producto) => {
        setProductoEditar(producto);
    }

    const onEliminar = async (id) => {
        const confirmado = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
            if (!confirmado) {
                return;
        }

        try {
            const respuesta = await ProductoService.deleteProducto(id);

                if (respuesta.status === 204) {
                    cargarProductos();
                    setError('');
                    window.alert('Producto eliminado exitosamente');
                }

        } catch (err) {
            const mensaje = err.response?.data?.message || 'No se pudo eliminar el producto.';

            setError(mensaje);
            window.alert(mensaje);
        };
    };

    return (
        <div className="tabla-admin-contenedor">

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
                        <th>Imagen</th>
                        <th>SKU</th>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {productosMostrados.length > 0 ? (
                    productosMostrados.map(producto => (
                        <tr key={producto.sku}>
                            <td>{producto.id}</td>
                            <td>
                                <img
                                    style={{ width: 60, height: 60 }}
                                    src={producto.img}
                                    alt={producto.nombre}
                                />
                            </td>
                            <td>{producto.sku}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.categoria}</td>
                            <td>${new Intl.NumberFormat('es-CL').format(producto.precio)}</td>

                            <td className="d-flex gap-2">
                                <Button variant="primary" size="sm" onClick={() => onEditar(producto)}>
                                    Editar
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => onEliminar(producto.id)}>
                                    Eliminar
                                </Button>
                            </td>

                        </tr>
                    ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No hay productos para mostrar.</td>
                        </tr>
                    )
                }
                </tbody>

            </Table>

        </div>
    );
}

export default TablaProductos;
