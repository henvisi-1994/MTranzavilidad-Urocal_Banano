import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

//const API_URL = 'http://localhost:3000';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioResCentroAcopio {
    
    // INSERT: Agrega un registro
    agregarResCentroAcopio(formData) {
        return axios.post(`${API_URL}/v1/respcoll`, formData);
    }

    // SELECT: Devuelve todos los registros
    obtenerTodosResCentroAcopio() {
        return axios.get(`${API_URL}/v1/respcoll/`);
    }

    // SELECT: Devuelve todas las ciudades
    obtenerTodosCiudad() {
        return axios.get(`${API_URL}/v1/ciudad`);
    }

    // UPDATE: Actualiza un registro
    actualizarResCentroAcopio(id, formData) {
        return axios.put(`${API_URL}/v1/respcoll/${id}`, formData); 
    }

    // DELETE: Elimina un registro
    eliminarResCentroAcopio(id) {
        return axios.delete(`${API_URL}/v1/respcoll/${id}`);
    }
}

export default new  ServicioResCentroAcopio();