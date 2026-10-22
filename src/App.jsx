import { Routes, Route } from 'react-router-dom';
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
import './App.css';

export default function App() {

    return (
        <CarritoProvider>
            <FavoritosProvider>
                <ProductosProvider>
                    <ScrollContactos />

                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/productos" element={<ProductosPage />} />
                        <Route path="/productos/detalle-producto/:sku" element={<DetalleProductosPage />}/>
                        <Route path="/nosotros" element={<NosotrosPage />} />
                        <Route path="/registro" element={<RegistroPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/carrito" element={<CarritoPage />} />
                        <Route path="/tienda" element={<TiendaPage />} />
                        <Route path="/favoritos" element={<FavoritoPage />} />
                        
                        <Route element={<RutaPrivada />}>
                            <Route path="/admin" element={<AdminPage />}/>
                            <Route path="/perfil" element={<PerfilPage />} />
                        </Route>
                        
                        <Route path="*" element={<Error404Page />} />
                    </Routes>

                </ProductosProvider>
            </FavoritosProvider>
        </CarritoProvider>
    );
}
