import axios from 'axios';
import autenticacionEncabezado from './AutenticacionEncabezado';

// Ruta al servidor backend
//const API_URL = 'http://localhost:3000/v1';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR + '/v1';

class ServicioLote {

    // SELECT: Devuelve todos los lotes
    obtenerTodosLote() {
        return axios.get(`${API_URL}/lote`);
    }


    // SELECT: Devuelve todos los lotes por finca
    obtenerTodosLoteCultivadoDeFinca(id) {
        return axios.get(`${API_URL}/lote/loteporfinca/${id}`);
    }

    // SELECT: Devuelve un lote
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
    }
}

export default new ServicioLote();