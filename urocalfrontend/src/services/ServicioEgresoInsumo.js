import axios from 'axios';
// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000/v1';

class ServicioEgresoInsumo {
    
    // INSERT: Agrega un egreso
    agregarEgresoInsumo(formData) {
        return axios.post(`${API_URL}/egreso_insumo`, formData);
    }

    // SELECT: Devuelve todos los egresos
    obtenerTodosEgresoInsumo() {
        return axios.get(`${API_URL}/egreso_insumo/`);
    }

    // SELECT: Devuelve todas las ciudades
    obtenerTodosInsumo() {
        return axios.get(`${API_URL}/ingreso_insumo`);
    }
    obtenerTodosFinca() {
        return axios.get(`${API_URL}/finca`);
    }
    // UPDATE: Actualiza un egreso
    actualizarEgresoInsumo(id, formData) {
        return axios.put(`${API_URL}/egreso_insumo/${id}`, formData);
    }

    // DELETE: Elimina un egreso
    eliminarEgresoInsumo(id) {
        return axios.delete(`${API_URL}/egreso_insumo/${id}`);
    }
}
export default new ServicioEgresoInsumo();
 