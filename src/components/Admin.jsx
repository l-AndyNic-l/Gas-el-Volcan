import { useState } from 'react';
import { useProductos } from './ProductosContent';
import FormularioProducto from './FormularioProducto';
import TablaProductos from './TablaProductos';

function Admin() {

    const {
        productos,
        agregarProducto,
        editarProducto,
        eliminarProducto
    } = useProductos();

    const [productoEditar, setProductoEditar] = useState(null);

    const guardarProducto = (datos) => {

        const precioNumero = Number(datos.precio);

        if (!Number.isFinite(precioNumero) || precioNumero <= 0) {
            alert('Ingresa un precio válido.');
            return;
        }

        const precioFormateado =
            `$${precioNumero.toLocaleString('es-CL')}`;

        if (productoEditar) {

            editarProducto(productoEditar.sku, {
                ...datos,
                precio: precioFormateado
            });

            setProductoEditar(null);
            return;
        }

        const nuevoProducto = {
            ...datos,
            sku: `NUEVO-${crypto.randomUUID()}`,
            precio: precioFormateado,
            imagen: '/producto-generico.svg'
        };

        agregarProducto(nuevoProducto);
    };

    const seleccionarEditar = (producto) => {
        setProductoEditar(producto);
    };

    const quitarProducto = (sku) => {

        const confirmar = window.confirm(
            '¿Estás segura de que quieres eliminar este producto?'
        );

        if (confirmar) {

            eliminarProducto(sku);

            if (productoEditar?.sku === sku) {
                setProductoEditar(null);
            }
        }
    };

    return (
        <main className="pagina-admin">
            <h1>Panel de Administración</h1>

            <p>
                Gestión de productos de Gas El Volcán.
            </p>

            <FormularioProducto
                productoEditar={productoEditar}
                onGuardar={guardarProducto}
                onCancelar={() => setProductoEditar(null)}
            />

            <TablaProductos
                productos={productos}
                onEditar={seleccionarEditar}
                onEliminar={quitarProducto}
            />
        </main>
    );
}

export default Admin;
