import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/productos';

class ProductoService {

    obtenerConfig() {
        const token = localStorage.getItem('token');

        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    }

    getAllProductos() {
        return axios.get(BASE_URL, this.obtenerConfig());
    }

    getProductoById(id) {
        return axios.get(`${BASE_URL}/${id}`, this.obtenerConfig());
    }

    createProducto(producto) {
        return axios.post(BASE_URL, producto, this.obtenerConfig());
    }

    updateProducto(id, producto) {
        return axios.put(`${BASE_URL}/${id}`, producto, this.obtenerConfig());
    }

    deleteProducto(id) {
        return axios.delete(`${BASE_URL}/${id}`, this.obtenerConfig());
    }
}

export default new ProductoService();