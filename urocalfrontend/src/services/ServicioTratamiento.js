import axios from 'axios';

// Ruta al servidor backend
const API_URL = 'http://localhost:3000/v1';

class ServicioTratamiento {

    // SELECT: Devuelve todos los tratamientos
    obtenerTodosTratamiento() {
        return axios.get(`${API_URL}/treatments`);
    }

    /*// SELECT: Devuelve un lote
    obtenerLote(id) {
        return axios.get(`${API_URL}/lote/${id}`);
    }

    // INSERT: Agrega un lote
    crearLote(lote) {
        return axios.post(`${API_URL}/lote`, lote);
    }

    // UPDATE: Actualiza un lote
    actualizarLote(lote) {
        return axios.put(`${API_URL}/lote/${lote.lotecultivadoid}`, lote);
    }

    // DELETE: Eliminar un lote
    eliminarLote(lotecultivadoid) {
        return axios.delete(`${API_URL}/lote/${lotecultivadoid}`);
    }*/
}

export default new ServicioTratamiento();