import axios from 'axios';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;
// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
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