import axios from 'axios';

// Ruta al servidor backend
// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

//const API_URL = 'http://localhost:3000';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioFinca {

    // INSERT: Agrega un sitio
    agregarFinca(formData) {
        return axios.post(`${API_URL}/v1/finca`, formData);
    }

    // SELECT: Devuelve todos los sitios
    obtenerTodosFincas() {
        return axios.get(`${API_URL}/v1/finca/`);
    }

    obtenerFincaPropietario(id) {
        return axios.get(`${API_URL}/v1/finca/${id}`);
    }

    obtenerTodosPropietarios() {
        return axios.get(`${API_URL}/v1/finca/propietario/`);
    }

    // SELECT: Devuelve todas las ciudades
    obtenerTodosSitios() {
        return axios.get(`${API_URL}/v1/sitio`);
    }

    obtenerTodosAsociaciones() {
        return axios.get(`${API_URL}/v1/asociacion`);
    }
    obtenerDetalleFinca(id) {
        return axios.get(`${API_URL}/v1/finca/detalle/${id}`);
    }

    // UPDATE: Actualiza un sitio
    actualizarFinca(id, formData) {
        return axios.put(`${API_URL}/v1/finca/${id}`, formData);
    }

    // DELETE: Elimina un sitio
    eliminarFinca(id) {
        return axios.delete(`${API_URL}/v1/finca/${id}`);
    }
    // DELETE: Elimina un sitio
    eliminarDetalleFinca(id) {
        return axios.delete(`${API_URL}/v1/finca/detalle/${id}`);
    }
}

export default new ServicioFinca();