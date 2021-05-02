import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

//const API_URL = 'http://localhost:3000';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioMonitoreoRoedorFinca {
    
    // INSERT: Agrega un  MonitoreoRoedorFinca
    agregarMonitoreoRoedorFinca(formData) {
        return axios.post(`${API_URL}/v1/rodentFarmMonitoring`, formData);
    }

    // SELECT: Devuelve todos los sitios
    obtenerTodosMonitoreoRoedorFinca() {
        return axios.get(`${API_URL}/v1/rodentFarmMonitoring/`);
    }

    obtenerTodosFinca() {
        return axios.get(`${API_URL}/v1/finca/`);
    }

    // UPDATE: Actualiza un sitio
    actualizarMonitoreoRoedorFinca(id, formData) {
        return axios.put(`${API_URL}/v1/rodentFarmMonitoring/${id}`, formData);
    }

    // DELETE: Elimina un sitio
    eliminarMonitoreoRoedorFinca(id) {
        return axios.delete(`${API_URL}/v1/rodentFarmMonitoring/${id}`);
    }
}

export default new ServicioMonitoreoRoedorFinca();