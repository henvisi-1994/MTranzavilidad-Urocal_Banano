import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000';

class ServicioFitosanitarios {
    
    // INSERT: Agrega un registro
    agregarFitosanitario(formData){
        console.log(formData);
      return axios.post(`${API_URL}/v1/fitosanitarios`, formData);
    }

    // SELECT: Devuelve todos los registros
    obtenerTodosFitosanitarios() {
        return axios.get(`${API_URL}/v1/fitosanitarios/`);
    }

    // SELECT: Devuelve todos los registros
    obtenerFitosanitario() {
        return axios.get(`${API_URL}/v1/fitosanitarios/${id}`);
    }

    // UPDATE: Actualiza un registro
    actualizarFitosanitario(id, formData) {
        return axios.put(`${API_URL}/v1/fitosanitarios/${id}`, formData); 
    }

    // DELETE: Elimina un registro
    eliminarFitosanitario(id) {
        return axios.delete(`${API_URL}/v1/fitosanitarios/${id}`);
    }
}

export default new ServicioFitosanitarios();