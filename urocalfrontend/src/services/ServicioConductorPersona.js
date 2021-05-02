import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

//const API_URL = 'http://localhost:3000';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioConductorPersona {
    
    // INSERT: Agrega un registro
    agregarConductorPersona(formData) {
        return axios.post(`${API_URL}/v1/conductor`, formData);
    }

    // SELECT: Devuelve todos los registros
    obtenerTodosConductorPersona() {
        return axios.get(`${API_URL}/v1/conductor/`);
    }

    // SELECT: Devuelve todas las ciudades
    obtenerTodosCiudad() {
        return axios.get(`${API_URL}/v1/ciudad`);
    }

    // UPDATE: Actualiza un registro
    actualizarConductorPersona(id, formData) {
        return axios.put(`${API_URL}/v1/conductor/${id}`, formData); 
    }

    // DELETE: Elimina un registro
    eliminarConductorPersona(id) {
        return axios.delete(`${API_URL}/v1/conductor/${id}`);
    }
}

export default new ServicioConductorPersona();