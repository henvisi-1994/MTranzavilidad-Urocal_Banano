import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000';

class ServicioLimpiezaHerramienta {
    
    // INSERT: Agrega un  Asociacion
    agregarLimpiezaHerramienta(formData) {
        return axios.post(`${API_URL}/v1/cleaningTool`, formData);
    }

    // SELECT: Devuelve todos los sitios
    obtenerTodosLimpiezaHerramienta() {
        return axios.get(`${API_URL}/v1/cleaningTool/`);
    }

    obtenerTodosCultivos() {
        return axios.get(`${API_URL}/v1/cleaningTool/cultivo/`);
    }

    // UPDATE: Actualiza un sitio
    actualizarLimpiezaHerramienta(id, formData) {
        return axios.put(`${API_URL}/v1/cleaningTool/${id}`, formData);
    }

    // DELETE: Elimina un sitio
    eliminarLimpiezaHerramienta(id) {
        return axios.delete(`${API_URL}/v1/cleaningTool/${id}`);
    }
}

export default new ServicioLimpiezaHerramienta();