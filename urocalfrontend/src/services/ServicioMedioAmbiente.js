import axios from 'axios';

// Ruta al servidor backend
//const API_URL = 'http://localhost:3000/v1';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR + '/v1';

class ServicioMedioAmbiente {

    // SELECT: Devuelve todos los medioAmbiente
    obtenerTodosMedioAmbiente() {
        return axios.get(`${API_URL}/medio_ambiente`);
    }

    // SELECT: Devuelve medioAmbiente
    obtenerMedioAmbiente(id) {
        return axios.get(`${API_URL}/medio_ambiente/${id}`);
    }

    // INSERT: Agrega un medioAmbiente
    crearMedioAmbiente(medAmbiente) {
        return axios.post(`${API_URL}/medio_ambiente`, medAmbiente);
    }

    // UPDATE: Actualiza un medioAmbiente
    actualizarMedioAmbiente(medAmbiente) {
        return axios.put(`${API_URL}/medio_ambiente/${medAmbiente.lotecultivadoid}`, medAmbiente);
    }

    // DELETE: Eliminar un medioAmbiente
    eliminarMedioAmbiente(lotecultivadoid) {
        return axios.delete(`${API_URL}/medio_ambiente/${lotecultivadoid}`);
    }
}

export default new ServicioMedioAmbiente();