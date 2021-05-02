import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

//const API_URL = 'http://localhost:3000';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioCertificaciones {
    
    // INSERT: Agrega un sitio
    agregarCertificacion(formData) {
        return axios.post(`${API_URL}/v1/certificacion`, formData);
    }

    // SELECT: Devuelve todos los sitios
    obtenerTodosCertificaciones() {
        return axios.get(`${API_URL}/v1/certificacion/`);
    }


    // UPDATE: Actualiza un sitio
    actualizarCertificacion(id, formData) {
        return axios.put(`${API_URL}/v1/certificacion/${id}`, formData);
    }

    // DELETE: Elimina un sitio
    eliminarCertificacion(id) {
        return axios.delete(`${API_URL}/v1/certificacion/${id}`);
    }
}

export default new ServicioCertificaciones();