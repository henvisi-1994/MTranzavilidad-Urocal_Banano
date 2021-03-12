import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000';

class ServicioLimpiezaVehiculo {
    
    // INSERT: Agrega un  Asociacion
    agregarLimpiezaVehiculo(formData) {
        console.log(formData);
        return axios.post(`${API_URL}/v1/limpiezaVehiculo`, formData);
        
    }

    // SELECT: Devuelve todos los sitios
    obtenerTodosLimpiezaVehiculo() {
        return axios.get(`${API_URL}/v1/limpiezaVehiculo/`);
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