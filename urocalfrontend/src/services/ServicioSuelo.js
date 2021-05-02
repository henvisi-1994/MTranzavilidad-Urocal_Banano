import axios from 'axios';

// Ruta al servidor backend
//const API_URL = 'http://localhost:3000/v1';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR + '/v1';

class ServicioSuelo {

    // SELECT: Devuelve todos los suelo
    obtenerTodosSuelo() {
        return axios.get(`${API_URL}/suelo`);
    }

    // SELECT: Devuelve suelo
    obtenerSuelo(id) {
        return axios.get(`${API_URL}/suelo/${id}`);
    }

    // INSERT: Agrega un suelo
    crearSuelo(suelo) {
        return axios.post(`${API_URL}/suelo`, suelo);
    }

    // UPDATE: Actualiza un suelo
    actualizarSuelo(suelo) {
        return axios.put(`${API_URL}/suelo/${suelo.lotecultivadoid}`, suelo);
    }

    // DELETE: Eliminar un suelo
    eliminarSuelo(lotecultivadoid) {
        return axios.delete(`${API_URL}/suelo/${lotecultivadoid}`);
    }
}

export default new ServicioSuelo();