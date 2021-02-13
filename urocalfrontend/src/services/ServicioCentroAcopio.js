import axios from 'axios';

// Ruta al servidor backend
const API_URL = 'http://localhost:3000/v1';

class ServicioCentroAcopio {

    // SELECT: Devuelve todos los Centroacopio
    obtenerTodosCentroAcopio() {
        return axios.get(`${API_URL}/centroacopio`);
    }

    // SELECT: Devuelve un Centroacopio
    obtenerCentroAcopio(id) {
        return axios.get(`${API_URL}/centroacopio/${id}`);
    }

    // INSERT: Agrega un Centroacopio
    crearCentroAcopio(centroacopio) {
        return axios.post(`${API_URL}/centroacopio`, centroacopio);
    }

    // UPDATE: Actualiza un Centroacopio
    actualizarCentroAcopio(centroacopio) {
        return axios.put(`${API_URL}/centroacopio/${centroacopio.centroacopioid}`, centroacopio);
    }

    // DELETE: Eliminar un Centroacopio
    eliminarCentroAcopio(centroacopioid) {
        return axios.delete(`${API_URL}/centroacopio/${centroacopioid}`);
    }
}

export default new ServicioCentroAcopio();
