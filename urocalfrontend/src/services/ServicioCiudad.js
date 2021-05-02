import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

//const API_URL = 'http://localhost:3000';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioSitio {
    
    // INSERT: Agrega un sitio
    agregarCiudad(formData) {
        return axios.post(`${API_URL}/v1/ciudad`, formData);
    }

    // SELECT: Devuelve todos los sitios
    obtenerTodosCiudades() {
        return axios.get(`${API_URL}/v1/ciudad/`);
    }

    // SELECT: Devuelve todas las ciudades
    obtenerTodosProvincias() {
        return axios.get(`${API_URL}/v1/provincia`);
    }

    // UPDATE: Actualiza un sitio
    actualizarCiudad(id, formData) {
        return axios.put(`${API_URL}/v1/ciudad/${id}`, formData);
    }

    // DELETE: Elimina un sitio
    eliminarCiudad(id) {
        return axios.delete(`${API_URL}/v1/ciudad/${id}`);
    }
}

export default new ServicioSitio();