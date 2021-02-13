import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000';

class ServicioInspectorPersona {
    
    // INSERT: Agrega un registro
    agregarInspectorPersona(formData) {
        return axios.post(`${API_URL}/v1/inspector`, formData);
    }

    // SELECT: Devuelve todos los registros
    obtenerTodosInspectorPersona() {
        return axios.get(`${API_URL}/v1/inspector/`);
    }

    // SELECT: Devuelve todas las ciudades
    obtenerTodosCiudad() {
        return axios.get(`${API_URL}/v1/ciudad`);
    }

    // UPDATE: Actualiza un registro
    actualizarInspectorPersona(id, formData) {
        return axios.put(`${API_URL}/v1/inspector/${id}`, formData); 
    }

    // DELETE: Elimina un registro
    eliminarInspectorPersona(id) {
        return axios.delete(`${API_URL}/v1/inspector/${id}`);
    }
}

export default new ServicioInspectorPersona();