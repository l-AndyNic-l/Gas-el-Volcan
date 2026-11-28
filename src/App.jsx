import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './views/HomePage';
import ProductosPage from './views/ProductosPage';
import DetalleProductosPage from './views/DetalleProductosPage';
import NosotrosPage from './views/NosotrosPage';
import RegistroPage from './views/RegistroPage';
import LoginPage from './views/LoginPage';
import CarritoPage from './views/CarritoPage';
import TiendaPage from './views/TiendaPage';
import FavoritoPage from './views/FavoritoPage';
import AdminPage from './views/AdminPage';
import PerfilPage from './views/PerfilPage';
import Error404Page from './views/Error404Page';
import ScrollContactos from './components/ScrollContactos';
import { CarritoProvider } from './components/CarritoContent';
import { FavoritosProvider } from './components/FavoritoContent';
import { ProductosProvider } from './components/ProductosContent';
import RutaPrivada from './components/RutaPrivada';
import RutaAdmin from './components/RutaAdmin';
import RutaPublica from './components/RutaPublica';
import { isAuthenticated } from './utils/isAuthenticated';
import './App.css';

export default function App() {
    return (
        <CarritoProvider>
            <FavoritosProvider>
                <ProductosProvider>
                    <ScrollContactos />

                    <Routes>
                        {/* Home: solo si hay sesión; si no, al login */}
                        <Route
                            path="/"
                            element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" replace />}
                        />

                        {/* Públicas: solo sin sesión */}
                        <Route element={<RutaPublica />}>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/registro" element={<RegistroPage />} />
                        </Route>

                        {/* Privadas: requieren sesión */}
                        <Route element={<RutaPrivada />}>
                            <Route path="/productos" element={<ProductosPage />} />
                            <Route path="/productos/detalle-producto/:sku" element={<DetalleProductosPage />} />
                            <Route path="/nosotros" element={<NosotrosPage />} />
                            <Route path="/carrito" element={<CarritoPage />} />
                            <Route path="/tienda" element={<TiendaPage />} />
                            <Route path="/favoritos" element={<FavoritoPage />} />
                            <Route path="/perfil" element={<PerfilPage />} />
                        </Route>

                        {/* Solo admin */}
                        <Route element={<RutaAdmin />}>
                            <Route path="/admin" element={<AdminPage />} />
                        </Route>

                        {/* 404 */}
                        <Route path="*" element={<Error404Page />} />
                    </Routes>
                </ProductosProvider>
            </FavoritosProvider>
        </CarritoProvider>
    );
}