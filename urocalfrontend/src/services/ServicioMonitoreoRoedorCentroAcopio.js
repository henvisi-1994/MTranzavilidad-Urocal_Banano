import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

//const API_URL = 'http://localhost:3000';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioMonitoreoRoedorCentroAcopio {
    
    // INSERT: Agrega un  MonitoreoRoedorCentroAcopio
    agregarMonitoreoRoedorCentroAcopio(formData) {
        return axios.post(`${API_URL}/v1/rodentMonitoringGatheringCenter`, formData);
    }

    // SELECT: Devuelve todos los sitios
    obtenerTodosMonitoreoRoedorCentroAcopio() {
        return axios.get(`${API_URL}/v1/rodentMonitoringGatheringCenter/`);
    }

    obtenerTodosAcopio() {
        return axios.get(`${API_URL}/v1/collcenter/`);
    }

    // UPDATE: Actualiza un sitio
    actualizarMonitoreoRoedorCentroAcopio(id, formData) {
        return axios.put(`${API_URL}/v1/rodentMonitoringGatheringCenter/${id}`, formData);
    }

    // DELETE: Elimina un sitio
    eliminarMonitoreoRoedorCentroAcopio(id) {
        return axios.delete(`${API_URL}/v1/rodentMonitoringGatheringCenter/${id}`);
    }
}

export default new ServicioMonitoreoRoedorCentroAcopio();