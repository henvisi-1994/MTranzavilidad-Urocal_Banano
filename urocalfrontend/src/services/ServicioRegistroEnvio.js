import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000/v1/nuevoRegistroEnvio';

class ServicioRegistroEnvio {
    
    // INSERT: Agrega un registro
    agregarRegistroEnvio(formData){
      return axios.post(`${API_URL}`, formData);
    }

    // SELECT: Devuelve todos los registros
    obtenerTodosRegistroEnvio() {
      
      return axios.get(`${API_URL}/todos`);
    }

    // SELECT: Devuelve todos los registros
    obtenerRegistroEnvio() {
      return axios.get(`${API_URL}/${id}`);
    }

    // UPDATE: Actualiza un registro
    actualizarRegistroEnvio(id, formData) {
      return axios.put(`${API_URL}/${id}`, formData); 
    }

    // DELETE: Elimina un registro
    eliminarRegistroEnvio(id) {
      return axios.delete(`${API_URL}/${id}`);
    }
}

export default new ServicioRegistroEnvio();