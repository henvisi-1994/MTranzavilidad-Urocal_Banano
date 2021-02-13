import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000';

class ServicioRiegos {
    
    // INSERT: Agrega un registro
    agregarRiego(formData){
      return axios.post(`${API_URL}/v1/riegos`, formData);
    }

    // SELECT: Devuelve todos los registros
    obtenerTodosRiegos() {
      return axios.get(`${API_URL}/v1/riegos/`);
    }

    // SELECT: Devuelve todos los registros
    obtenerRiego() {
      return axios.get(`${API_URL}/v1/riegos/${id}`);
    }

    // UPDATE: Actualiza un registro
    actualizarRiego(id, formData) {
      return axios.put(`${API_URL}/v1/riegos/${id}`, formData); 
    }

    // DELETE: Elimina un registro
    eliminarRiego(id) {
      return axios.delete(`${API_URL}/v1/riegos/${id}`);
    }
}

export default new ServicioRiegos();