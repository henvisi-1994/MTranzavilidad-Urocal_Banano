import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

//const API_URL = 'http://localhost:3000';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioLimpiezaCentroAcopio {
    
    // INSERT: Agrega una Limpieza Centro Acopio
    agregarLimpiezaCentroAcopio(formData) {
        return axios.post(`${API_URL}/v1/limpiezaCentroAcopio`, formData);
    }

    // SELECT: Devuelve todos las Limpieza Centro Acopio
    obtenerTodosLimpiezaCentroAcopio() {
        return axios.get(`${API_URL}/v1/limpiezaCentroAcopio`);
        //return axios.get(`http://localhost:3000/v1/limpiezaCentroAcopio/`);
    }

    // SELECT: Devuelve la lista con el nombre del centro de acopio
    obtenerTodosListaCentroAcopio() {
        return axios.get(`${API_URL}/v1/centroacopio`);
    }

    // UPDATE: Actualiza  una Limpieza Centro Acopio
    actualizarLimpiezaCentroAcopio(id, formData) {
        return axios.put(`${API_URL}/v1/limpiezaCentroAcopio/${id}`, formData);
    }

    // DELETE: Elimina una Limpieza Centro Acopio
    eliminarLimpiezaCentroAcopio(id) {
        return axios.delete(`${API_URL}/v1/limpiezaCentroAcopio/${id}`);
    }
}

export default new ServicioLimpiezaCentroAcopio();