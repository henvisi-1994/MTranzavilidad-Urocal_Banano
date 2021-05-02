import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

//const API_URL = 'http://localhost:3000';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioSitio {
    
    // INSERT: Agrega un sitio
    agregarPais(formData) {
        return axios.post(`${API_URL}/v1/pais`, formData);
    }

    // SELECT: Devuelve todas las ciudades
    obtenerTodosPaises() {
        return axios.get(`${API_URL}/v1/pais`);
    }

    // UPDATE: Actualiza un sitio
    actualizarPais(id, formData) {
        return axios.put(`${API_URL}/v1/pais/${id}`, formData);
    }

    // DELETE: Elimina un sitio
    eliminarPais(id) {
        return axios.delete(`${API_URL}/v1/pais/${id}`);
    }
}

export default new ServicioSitio();