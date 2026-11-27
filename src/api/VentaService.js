import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/ventas';

class VentaService {

    obtenerConfig() {
        const token = localStorage.getItem('token');

        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    }

    getAllVentas() {
        return axios.get(BASE_URL, this.obtenerConfig());
    }

    geVentaById(id) {
        return axios.get(`${BASE_URL}/${id}`, this.obtenerConfig());
    }

    createVenta(venta) {
        return axios.post(BASE_URL, venta, this.obtenerConfig());
    }

    updateVenta(id, venta) {
        return axios.put(`${BASE_URL}/${id}`, venta, this.obtenerConfig());
    }

    deleteVenta(id) {
        return axios.delete(`${BASE_URL}/${id}`, this.obtenerConfig());
    }
}

export default new VentaService();