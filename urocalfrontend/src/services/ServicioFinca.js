import axios from 'axios';

// Ruta al servidor backend
// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000';

class ServicioFinca {
    
    // INSERT: Agrega un sitio
    agregarFinca(formData) {
        return axios.post(`${API_URL}/v1/finca`, formData);
    }

    // SELECT: Devuelve todos los sitios
    obtenerTodosFincas() {
        return axios.get(`${API_URL}/v1/finca/`);
    }

    obtenerTodosPropietarios() {
        return axios.get(`${API_URL}/v1/finca/propietario/`);
    }

    // SELECT: Devuelve todas las ciudades
    obtenerTodosSitios() {
        return axios.get(`${API_URL}/v1/sitio`);
    }

    obtenerTodosAsociaciones() {
        return axios.get(`${API_URL}/v1/asociacion`);
    }

    // UPDATE: Actualiza un sitio
    actualizarFinca(id, formData) {
        return axios.put(`${API_URL}/v1/finca/${id}`, formData);
    }

    // DELETE: Elimina un sitio
    eliminarFinca(id) {
        return axios.delete(`${API_URL}/v1/finca/${id}`);
    }
}

export default new ServicioFinca();