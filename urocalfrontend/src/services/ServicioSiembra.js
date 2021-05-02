import axios from 'axios';

// Ruta al servidor backend
//const API_URL = 'http://localhost:3000/v1';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR + '/v1';

class ServicioSiembra {

    // SELECT: Devuelve todas las Siembras
    obtenerTodosSiembra() {
        return axios.get(`${API_URL}/sowing`);
    }

    // SELECT: Devuelve una Siembra
    obtenerSiembra(id) {
        return axios.get(`${API_URL}/sowing/${id}`);
    }

    // SELECT: Devuelve la lista con el nombre del culivo,y mas detalles
    obtenerTodosListaCultivoDetalles() {
        return axios.get(`${API_URL}/sowing/sowinginformacion`);
    }

    // INSERT: Agrega un Control de Maleza
    crearSiembra(siembra) {
        return axios.post(`${API_URL}/sowing`, siembra);
    }

    // UPDATE: Actualiza un Control de Maleza
    actualizarSiembra(siembra) {
        return axios.put(`${API_URL}/sowing/${siembra.siembraid}`, siembra);
    }

    // DELETE: Eliminar un Control de Maleza
    eliminarSiembra(siembraid) {
        return axios.delete(`${API_URL}/sowing/${siembraid}`);
    }
}

export default new ServicioSiembra();