import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000';

class ServicioSitio {
    
    // INSERT: Agrega un sitio
    agregarProvincia(formData) {
        return axios.post(`${API_URL}/v1/provincia`, formData);
    }

    // SELECT: Devuelve todos los sitios
    obtenerTodosProvincias() {
        return axios.get(`${API_URL}/v1/provincia/`);
    }

    // SELECT: Devuelve todas las ciudades
    obtenerTodosPaises() {
        return axios.get(`${API_URL}/v1/pais`);
    }

    // UPDATE: Actualiza un sitio
    actualizarProvincia(id, formData) {
        return axios.put(`${API_URL}/v1/provincia/${id}`, formData);
    }

    // DELETE: Elimina un sitio
    eliminarProvincia(id) {
        return axios.delete(`${API_URL}/v1/provincia/${id}`);
    }
}

export default new ServicioSitio();