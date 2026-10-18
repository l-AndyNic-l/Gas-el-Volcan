import { Routes, Route } from 'react-router-dom';
import HomePage from './views/HomePage'; 
import ProductosPage from './views/ProductosPage';
import DetalleProductosPage from './views/DetalleProductosPage';
import NosotrosPage from './views/NosotrosPage';
import RegistroPage from './views/RegistroPage';
import LoginPage from './views/LoginPage';
import './App.css'

export default function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/productos" element={<ProductosPage />} />
      <Route path="/productos/detalle-producto/:sku" element={<DetalleProductosPage />} />
      <Route path ="/nosotros" element={<NosotrosPage />} />
      <Route path="/registro" element={<RegistroPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </>
  );

} 