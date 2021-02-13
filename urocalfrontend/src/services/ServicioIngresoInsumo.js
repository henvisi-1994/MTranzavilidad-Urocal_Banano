import axios from 'axios';
// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000/v1';

class ServicioIngresoInsumo {
    
    // INSERT: Agrega un ingreso
    agregarIngresoInsumo(formData) {
        return axios.post(`${API_URL}/ingreso_insumo`, formData);
    }

    // SELECT: Devuelve todos los ingresos
    obtenerTodosIngresoInsumo() {
        return axios.get(`${API_URL}/ingreso_insumo/`);
    }

    // SELECT: Devuelve todas las ciudades
    obtenerTodosAcopio() {
        return axios.get(`${API_URL}/centroacopio`);
    }
    obtenerTodosFinca() {
        return axios.get(`${API_URL}/finca`);
    }
    // UPDATE: Actualiza un ingreso
    actualizarIngresoInsumo(id, formData) {
        return axios.put(`${API_URL}/ingreso_insumo/${id}`, formData);
    }

    // DELETE: Elimina un ingreso
    eliminarIngresoInsumo(id) {
        return axios.delete(`${API_URL}/ingreso_insumo/${id}`);
    }
}
export default new ServicioIngresoInsumo();
 