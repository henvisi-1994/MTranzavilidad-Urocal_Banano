import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

//const API_URL = 'http://localhost:3000';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioLimpiezaVehiculo {
    
    // INSERT: Agrega un  Asociacion
    agregarLimpiezaVehiculo(formData) {
        console.log(formData);
        return axios.post(`${API_URL}/v1/limpiezaVehiculo`, formData);
        
    }

    // SELECT: Devuelve todos los sitios
    obtenerTodosLimpiezaVehiculo(id) {
        return axios.get(`${API_URL}/v1/limpiezaVehiculo/todos/${id}`);
    }

    //obtenerTodosCultivos() {
    //    return axios.get(`${API_URL}/v1/cleaningTool/cultivo/`);
    //}

    // UPDATE: Actualiza un sitio
    actualizarLimpiezaVehiculo(id, formData) {
        return axios.put(`${API_URL}/v1/limpiezaVehiculo/${id}`, formData);
    }

    // DELETE: Elimina un sitio
    eliminarLimpiezaVehiculo(id) {
        return axios.delete(`${API_URL}/v1/limpiezaVehiculo/${id}`);
    }
}

export default new ServicioLimpiezaVehiculo();