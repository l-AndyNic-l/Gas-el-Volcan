import { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useProductos } from './ProductosContent';
import FormularioProducto from './FormularioProducto';
import TablaProductos from './TablaProductos';
import TablaUsuarios from './TablaUsuarios';
import FormularioVenta from './FormularioVenta';
import TablaVentas from './TablaVentas';
import UsuarioService from '../api/UsuarioService';
import FormularioUsuario from './FormularioUsuario';
import ProductoService from '../api/ProductoService';


const VENTAS_INICIALES = [
    { id: 'V-101', cliente: 'Cliente', fecha: '2026-11-24', detalle: '2x Galón Gas 15kg', total: 49980, estado: 'Completada' },
    { id: 'V-102', cliente: 'Camila Rojas', fecha: '2026-11-25', detalle: '1x Galón Gas 11kg + Regulador', total: 28500, estado: 'Pendiente' }
];

function Admin() {
    const [error, setError] = useState('');

    // --- PRODUCTOS ---
    const [productos, setProductos] = useState([]);
    const [productoEditar, setProductoEditar] = useState(null)

    const handleCancelarProducto = () => {
        setProductoEditar(null);
    };

    const cargarProductos = async() => {
        try {
            const { data } = await ProductoService.getAllProductos();
            const listarProductos = Array.isArray(data?._embedded?.productoList)
                ? data._embedded.productoList
                : Array.isArray(data)
                ? data
                : [];

            setProductos(listarProductos);
            setError('');

        } catch (error) {
            setError(error.response?.data?.message || 'No se pudieron cargar los productos.');
        }
    };

    useEffect(() => {
        cargarProductos();

    }, []);

    // --- USUARIOS ---
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditar, setUsuarioEditar] = useState(null)

    const handleCancelar = () => {
        setUsuarioEditar(null);
    };

    const cargarUsuarios = async() => {
        try {
            const { data } = await UsuarioService.getAllUsuarios();
            const listaUsuarios = Array.isArray(data?._embedded?.usuarioList)
                ? data._embedded.usuarioList
                : Array.isArray(data)
                ? data
                : [];

            setUsuarios(listaUsuarios);
            setError('');

        } catch (error) {
            setError(error.response?.data?.message || 'No se pudieron cargar los usuarios.');
        }
    };

    useEffect(() => {
        cargarUsuarios();

    }, []);

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
                        cargarProductos={cargarProductos}
                        onCancelar={handleCancelarProducto}
                    />
                    <TablaProductos
                        productos={productos}
                        setError={setError}
                        cargarProductos={cargarProductos}
                        setProductoEditar={setProductoEditar}
                    />
                </Tab>

                <Tab eventKey="usuarios" title="Usuarios">
                    <FormularioUsuario
                        usuarioEditar={usuarioEditar}
                        cargarUsuarios={cargarUsuarios}
                        onCancelar={handleCancelar}
                    />
                    <TablaUsuarios
                        usuarios={usuarios}
                        setError={setError}
                        cargarUsuarios={cargarUsuarios}
                        setUsuarioEditar={setUsuarioEditar}
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