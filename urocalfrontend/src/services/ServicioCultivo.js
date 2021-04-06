import axios from 'axios';

// Ruta al servidor backend
const API_URL = 'http://localhost:3000/v1';

class ServicioCultivo {

    // SELECT: Devuelve todos los cultivos
    obtenerTodosCultivo() {
        return axios.get(`${API_URL}/cultivo`);
    }
    
    obtenerTodosCultivoDetalles() {
        return axios.get(`${API_URL}/cultivo/detalles`);
    }

    obtenerCultivoDetalles(id) {
        return axios.get(`${API_URL}/cultivo/Cdetalles/${id}`);
    }

    // SELECT: Devuelve todos los cultivos por lote
    obtenerCultivoPorIdLote(id) {
        return axios.get(`${API_URL}/cultivo/${id}`);
    }

    // INSERT: Agrega un cultivo
    crearCultivo(cultivo) {

        return axios.post(`${API_URL}/cultivo`, cultivo);
    }

    // UPDATE: Actualiza un cultivo
    actualizarCultivo(cultivo) {
        return axios.put(`${API_URL}/cultivo/${cultivo.lotecultivadoid}`, cultivo);
    }

    eliminarCultivo(lotecultivadoid) {
        
        return axios.delete(`${API_URL}/cultivo/${lotecultivadoid}`);
    }

}

export default new ServicioCultivo();