import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

//const API_URL = 'http://localhost:3000';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioOperarioPersona {
    
    // INSERT: Agrega un registro
    agregarOperarioPersona(formData) {
        return axios.post(`${API_URL}/v1/operario`, formData);
    }

    // SELECT: Devuelve todos los registros
    obtenerTodosOperarioPersona() {
        return axios.get(`${API_URL}/v1/operario/`);
    }

    // SELECT: Devuelve todas las ciudades
    obtenerTodosCiudad() {
        return axios.get(`${API_URL}/v1/ciudad`);
    }

    

    // UPDATE: Actualiza un registro
    actualizarOperarioPersona(id, formData) {
        return axios.put(`${API_URL}/v1/operario/${id}`, formData); 
    }

    // DELETE: Elimina un registro
    eliminarOperarioPersona(id) {
        return axios.delete(`${API_URL}/v1/operario/${id}`);
    }
}

export default new ServicioOperarioPersona();