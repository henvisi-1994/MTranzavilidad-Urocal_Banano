import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000';

class ServicioPodas {
    
    // INSERT: Agrega un registro
    agregarPoda(formData){
      return axios.post(`${API_URL}/v1/podas`, formData);
    }

    // SELECT: Devuelve todos los registros
    obtenerTodosPodas() {
      
      return axios.get(`${API_URL}/v1/podas/`);
    }

    // SELECT: Devuelve todos los registros
    obtenerPoda() {
      return axios.get(`${API_URL}/v1/podas/${id}`);
    }

    // UPDATE: Actualiza un registro
    actualizarPoda(id, formData) {
      return axios.put(`${API_URL}/v1/podas/${id}`, formData); 
    }

    // DELETE: Elimina un registro
    eliminarPoda(id) {
      return axios.delete(`${API_URL}/v1/podas/${id}`);
    }
}

export default new ServicioPodas();