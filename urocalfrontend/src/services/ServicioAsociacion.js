import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000';

class ServicioAsociacion {
    
    // INSERT: Agrega un  Asociacion
    agregarAsociacion(formData) {
        return axios.post(`${API_URL}/v1/asociacion`, formData);
    }

    // SELECT: Devuelve todos los sitios
    obtenerTodosAsociacion() {
        return axios.get(`${API_URL}/v1/asociacion/`);
    }

    obtenerTodosResponsable() {
        return axios.get(`${API_URL}/v1/asociacion/responsable/`);
    }

    // UPDATE: Actualiza un sitio
    actualizarAsociacion(id, formData) {
        return axios.put(`${API_URL}/v1/asociacion/${id}`, formData);
    }

    // DELETE: Elimina un sitio
    eliminarAsociacion(id) {
        return axios.delete(`${API_URL}/v1/asociacion/${id}`);
    }
}

export default new ServicioAsociacion();