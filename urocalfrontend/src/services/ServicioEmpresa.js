import axios from 'axios';
// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000/v1';
class ServicioEmpresa {
     // INSERT: Agrega un egreso
     agregarEmpresa(formData) {
        return axios.post(`${API_URL}/empresa`, formData);
    }

    // SELECT: Devuelve todos los egresos
    obtenerTodosEmpresa() {
        return axios.get(`${API_URL}/empresa/`);
    }
    obtenerEmpresa(id) {
        return axios.get(`${API_URL}/empresa/${id}`);
    }
    // UPDATE: Actualiza un egreso
    actualizarEmpresa(id, formData) {
        return axios.put(`${API_URL}/empresa/${id}`, formData);
    }

    // DELETE: Elimina un egreso
    eliminarEmpresa(id) {
        return axios.delete(`${API_URL}/empresa/${id}`);
    }

}
export default new ServicioEmpresa();