import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

//const API_URL = 'http://localhost:3000';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioGuiaRemision {
    
    // INSERT: Agrega un registro
    agregarGuiaRemision(formData){
        return axios.post(`${API_URL}/v1/guiaremision`, formData);
    }

    // SELECT: Devuelve todos los registros
    obtenerTodosGuiaRemision() {
        return axios.get(`${API_URL}/v1/guiaremision/`);
    }

    // SELECT: Devuelve todos los registros
    obtenerGuiaRemision() {
        return axios.get(`${API_URL}/v1/guiaremision/${id}`);
    }

    // UPDATE: Actualiza un registro
    actualizarGuiaRemision(id, formData) {
        return axios.put(`${API_URL}/v1/guiaremision/${id}`, formData); 
    }

    // DELETE: Elimina un registro
    eliminarGuiaRemision(id) {
        return axios.delete(`${API_URL}/v1/guiaremision/${id}`);
    }

    obtenerCargas(id) {
        return axios.get(`${API_URL}/v1/carga/${id}`);
    }
    eliminarCargas(id) {
        return axios.delete(`${API_URL}/v1/guiaremision/carga/${id}`);
    }
}

export default new ServicioGuiaRemision();