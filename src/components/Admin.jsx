import { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useProductos } from './ProductosContent';
import FormularioProducto from './FormularioProducto';
import TablaProductos from './TablaProductos';
import FormularioUsuario from './FormularioUsuario';
import TablaUsuarios from './TablaUsuarios';
import FormularioVenta from './FormularioVenta';
import TablaVentas from './TablaVentas';

const USUARIOS_INICIALES = [
    { id: '1', nombre: 'Administrador', correo: 'admin@gaselvolcan.cl', rol: 'admin' },
    { id: '2', nombre: 'Cliente', correo: 'cliente@gaselvolcan.cl', rol: 'cliente' },
    { id: '3', nombre: 'Camila Rojas', correo: 'camila.rojas@correo.cl', rol: 'cliente' }
];

const VENTAS_INICIALES = [
    { id: 'V-101', cliente: 'Cliente', fecha: '2026-11-24', detalle: '2x Galón Gas 15kg', total: 49980, estado: 'Completada' },
    { id: 'V-102', cliente: 'Camila Rojas', fecha: '2026-11-25', detalle: '1x Galón Gas 11kg + Regulador', total: 28500, estado: 'Pendiente' }
];

function Admin() {
    // --- PRODUCTOS ---
    const { productos, agregarProducto, editarProducto, eliminarProducto } = useProductos();
    const [productoEditar, setProductoEditar] = useState(null);

    const guardarProducto = (datos) => {
        const precioNumero = Number(datos.precio);
        if (!Number.isFinite(precioNumero) || precioNumero <= 0) {
            alert('Ingresa un precio válido.');
            return;
        }
        const precioFormateado = `$${precioNumero.toLocaleString('es-CL')}`;

        if (productoEditar) {
            editarProducto(productoEditar.sku, { ...datos, precio: precioFormateado });
            setProductoEditar(null);
            return;
        }

        const nuevoProducto = {
            ...datos,
            sku: `NUEVO-${crypto.getRandomValues(new Uint32Array(1))[0] % 900 + 100}`,
            precio: precioFormateado,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqWzYbnp-7uh2xeX1WhIL3c5tQyoi-xskjfsPjobQpr8XgVMZYrLLRVHST&s=10'
        };
        agregarProducto(nuevoProducto);
        window.alert('¡Producto Guardado!');
    };

    const quitarProducto = (sku) => {
        if (window.confirm('¿Estás segura de que quieres eliminar este producto?')) {
            eliminarProducto(sku);
            if (productoEditar?.sku === sku) setProductoEditar(null);
        }
    };

    // --- USUARIOS ---
    const [usuarios, setUsuarios] = useState(() => {
        try {
            const guardados = JSON.parse(localStorage.getItem('usuarios_admin'));
            return Array.isArray(guardados) && guardados.length > 0 ? guardados : USUARIOS_INICIALES;
        } catch {
            return USUARIOS_INICIALES;
        }
    });
    const [usuarioEditar, setUsuarioEditar] = useState(null);

    useEffect(() => {
        localStorage.setItem('usuarios_admin', JSON.stringify(usuarios));
    }, [usuarios]);

    const guardarUsuario = (datos) => {
        if (usuarioEditar) {
            setUsuarios(actuales => actuales.map(u => u.id === usuarioEditar.id ? { ...u, ...datos } : u));
            setUsuarioEditar(null);
            window.alert('¡Usuario Actualizado!');
            return;
        }
        const nuevoUsuario = {
            id: String(usuarios.length + 1),
            ...datos
        };
        setUsuarios(actuales => [...actuales, nuevoUsuario]);
        window.alert('¡Usuario Guardado!');
    };

    const quitarUsuario = (id) => {
        if (window.confirm('¿Estás segura de que quieres eliminar este usuario?')) {
            setUsuarios(actuales => actuales.filter(u => u.id !== id));
            if (usuarioEditar?.id === id) setUsuarioEditar(null);
        }
    };

    // --- VENTAS ---
    const [ventas, setVentas] = useState(() => {
        try {
            const guardadas = JSON.parse(localStorage.getItem('ventas_admin'));
            return Array.isArray(guardadas) && guardadas.length > 0 ? guardadas : VENTAS_INICIALES;
        } catch {
            return VENTAS_INICIALES;
        }
    });
    const [ventaEditar, setVentaEditar] = useState(null);

    useEffect(() => {
        localStorage.setItem('ventas_admin', JSON.stringify(ventas));
    }, [ventas]);

    const guardarVenta = (datos) => {
        if (ventaEditar) {
            setVentas(actuales => actuales.map(v => v.id === ventaEditar.id ? { ...v, ...datos } : v));
            setVentaEditar(null);
            window.alert('¡Venta Actualizada!');
            return;
        }
        const nuevaVenta = {
            id: `V-${crypto.getRandomValues(new Uint32Array(1))[0] % 900 + 100}`,
            fecha: new Date().toISOString().split('T')[0],
            ...datos
        };
        setVentas(actuales => [...actuales, nuevaVenta]);
        window.alert('¡Venta Registrada!');
    };

    const quitarVenta = (id) => {
        if (window.confirm('¿Estás segura de que quieres eliminar esta venta?')) {
            setVentas(actuales => actuales.filter(v => v.id !== id));
            if (ventaEditar?.id === id) setVentaEditar(null);
        }
    };

    return (
        <main className="pagina-admin">
            <h1>Panel de Administración</h1>
            <p>Gestión general de Gas El Volcán.</p>

            <Tabs defaultActiveKey="productos" id="admin-tabs" className="mb-4">
                <Tab eventKey="productos" title="Productos">
                    <FormularioProducto
                        productoEditar={productoEditar}
                        onGuardar={guardarProducto}
                        onCancelar={() => setProductoEditar(null)}
                    />
                    <TablaProductos
                        productos={productos}
                        onEditar={setProductoEditar}
                        onEliminar={quitarProducto}
                    />
                </Tab>

                <Tab eventKey="usuarios" title="Usuarios">
                    <FormularioUsuario
                        usuarioEditar={usuarioEditar}
                        onGuardar={guardarUsuario}
                        onCancelar={() => setUsuarioEditar(null)}
                    />
                    <TablaUsuarios
                        usuarios={usuarios}
                        onEditar={setUsuarioEditar}
                        onEliminar={quitarUsuario}
                    />
                </Tab>

                <Tab eventKey="ventas" title="Ventas">
                    <FormularioVenta
                        ventaEditar={ventaEditar}
                        onGuardar={guardarVenta}
                        onCancelar={() => setVentaEditar(null)}
                    />
                    <TablaVentas
                        ventas={ventas}
                        onEditar={setVentaEditar}
                        onEliminar={quitarVenta}
                    />
                </Tab>
            </Tabs>
        </main>
    );
}

export default Admin;