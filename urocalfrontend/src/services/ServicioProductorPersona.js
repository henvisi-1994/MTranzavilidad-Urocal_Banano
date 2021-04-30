import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioProductorPersona {
    
    // INSERT: Agrega un registro
    agregarProductorPersona(formData) {
        return axios.post(`${API_URL}/v1/productor`, formData);
    }


    // SELECT: Devuelve todos los registros
    obtenerTodosProductorPersona() {
        return axios.get(`${API_URL}/v1/productor/`);
    }
    // SELECT: Devuelve productor
    obtenerProductorPersona(id) {
        return axios.get(`${API_URL}/v1/productor/${id}`);
    }
    // SELECT: Devuelve todas las ciudades
    obtenerTodosCiudad() {
        return axios.get(`${API_URL}/v1/ciudad`);
    }

    // UPDATE: Actualiza un registro
    actualizarProductorPersona(id, formData) {
        return axios.put(`${API_URL}/v1/productor/${id}`, formData); 
    }

    // DELETE: Elimina un registro
    eliminarProductorPersona(id) {
        return axios.delete(`${API_URL}/v1/productor/${id}`);
    }
}

export default new ServicioProductorPersona();