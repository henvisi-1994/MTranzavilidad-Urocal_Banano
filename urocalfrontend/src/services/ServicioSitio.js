import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000';

class ServicioSitio {
    
    // INSERT: Agrega un sitio
    agregarSitio(formData) {
        return axios.post(`${API_URL}/v1/sitio`, formData);
    }

    // SELECT: Devuelve todos los sitios
    obtenerTodosSitios() {
        return axios.get(`${API_URL}/v1/sitio/`);
    }

    // SELECT: Devuelve todas las ciudades
    obtenerTodosCiudad() {
        return axios.get(`${API_URL}/v1/ciudad`);
    }

    // UPDATE: Actualiza un sitio
    actualizarSitio(id, formData) {
        return axios.put(`${API_URL}/v1/sitio/${id}`, formData);
    }

    // DELETE: Elimina un sitio
    eliminarSitio(id) {
        return axios.delete(`${API_URL}/v1/sitio/${id}`);
    }
}

export default new ServicioSitio();