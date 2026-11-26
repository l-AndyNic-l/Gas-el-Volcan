import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/usuarios';

class UsuarioService {

    obtenerConfig() {
        const token = localStorage.getItem('token');

        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    }

    getAllUsuarios() {
        return axios.get(BASE_URL, this.obtenerConfig());
    }

    getUsuarioById(id) {
        return axios.get(`${BASE_URL}/${id}`, this.obtenerConfig());
    }

    createUsuario(usuario) {
        return axios.post(BASE_URL, usuario);
    }

    updateUsuario(id, usuario) {
        return axios.put(`${BASE_URL}/${id}`, usuario, this.obtenerConfig());
    }

    deleteUsuario(id) {
        return axios.delete(`${BASE_URL}/${id}`, this.obtenerConfig());
    }

    async login(correo, clave) {
        const { data } = await axios.post(`${BASE_URL}/login`, {
            correo,
            clave,
        });
        return data.token;
    }
}

export default new UsuarioService();