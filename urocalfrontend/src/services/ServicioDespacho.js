import axios from 'axios';

// Ruta al servidor backend
//const API_URL = 'http://localhost:3000/v1';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR + '/v1';

class ServicioDespacho {

    // SELECT: Devuelve todos los Despachos
    obtenerTodosDespacho() {
        return axios.get(`${API_URL}/despacho`);
    }

    // SELECT: Devuelve un Despacho
    obtenerDespacho(id) {
        return axios.get(`${API_URL}/despacho/${id}`);
    }

    // INSERT: Agrega un Despacho
    crearDespacho(despacho) {
        return axios.post(`${API_URL}/despacho`, despacho);
    }

    // UPDATE: Actualiza un Despacho
    actualizarDespacho(despacho) {
        return axios.put(`${API_URL}/despacho/${despacho.despachoid}`, despacho);
    }

    // DELETE: Eliminar un Despacho
    eliminarDespacho(despachoid) {
        return axios.delete(`${API_URL}/despacho/${despachoid}`);
    }
}

export default new ServicioDespacho();