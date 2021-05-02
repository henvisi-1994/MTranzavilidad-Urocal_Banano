import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

//const API_URL = 'http://localhost:3000';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioExportadorPersona {
    
    // INSERT: Agrega un registro
    agregarExportadorPersona(formData) {
        return axios.post(`${API_URL}/v1/exportador`, formData);
    }

    // SELECT: Devuelve todos los registros
    obtenerTodosExportadorPersona() {
        return axios.get(`${API_URL}/v1/exportador/`);
    }

    // SELECT: Devuelve todas las ciudades
    obtenerTodosCiudad() {
        return axios.get(`${API_URL}/v1/ciudad`);
    }

    // UPDATE: Actualiza un registro
    actualizarExportadorPersona(id, formData) {
        return axios.put(`${API_URL}/v1/exportador/${id}`, formData); 
    }

    // DELETE: Elimina un registro
    eliminarExportadorPersona(id) {
        return axios.delete(`${API_URL}/v1/exportador/${id}`);
    }
}

export default new ServicioExportadorPersona();