import { useState, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import FormularioProducto from './FormularioProducto';
import TablaProductos from './TablaProductos';
import TablaUsuarios from './TablaUsuarios';
import FormularioVenta from './FormularioVenta';
import TablaVentas from './TablaVentas';
import UsuarioService from '../api/UsuarioService';
import FormularioUsuario from './FormularioUsuario';
import ProductoService from '../api/ProductoService';
import VentaService from '../api/VentaService';

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
    const [ventas, setVentas] = useState([]);
    const [ventaEditar, setVentaEditar] = useState(null)

    const handleCancelarVenta = () => {
        setVentaEditar(null);
    };

    const cargarVentas = async() => {
        try {
            const { data } = await VentaService.getAllVentas();
            const listarVentas = Array.isArray(data?._embedded?.ventaList)
                ? data._embedded.ventaList
                : Array.isArray(data)
                ? data
                : [];

            setVentas(listarVentas);
            setError('');

        } catch (error) {
            setError(error.response?.data?.message || 'No se pudieron cargar las ventas.');
        }
    };

    useEffect(() => {
        cargarVentas();

    }, []);

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
                        cargarVentas={cargarVentas}
                        onCancelar={handleCancelarVenta}
                    />
                    <TablaVentas
                        ventas={ventas}
                        setError={setError}
                        cargarVentas={cargarVentas}
                        setVentaEditar={setVentaEditar}
                    />
                </Tab>
            </Tabs>
        </main>
    );
}

export default Admin;