import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
const API_URL = 'http://localhost:3000';

class ServicioUsuarioPersona {
    
    // INSERT: Agrega un usuario
    agregarUsuarioPersona(formData) {
        return axios.post(`${API_URL}/v1/users`, formData);
    }

    // SELECT: Devuelve todos los usuarios
    obtenerTodosUsuarioPersona() {
        return axios.get(`${API_URL}/v1/users/`);
    }

    // SELECT: Devuelve todas las ciudades
    obtenerTodosCiudad() {
        return axios.get(`${API_URL}/v1/ciudad`);
    }

    // UPDATE: Actualiza un usuario
    actualizarUsuarioPersona(id, formData) {
        return axios.put(`${API_URL}/v1/users/${id}`, formData);
    }

    // DELETE: Elimina un usuario
    /*eliminarUsuarioPersona(id) {
        return axios.delete(`${API_URL}/v1/users/${id}`);
    }*/
}

export default new ServicioUsuarioPersona();