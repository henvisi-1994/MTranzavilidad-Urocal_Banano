import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000';

class ServicioFertilizantes {
    
    // INSERT: Agrega un registro
    agregarFertilizante(formData){
        return axios.post(`${API_URL}/v1/fertilizacion`, formData);
    }

    // SELECT: Devuelve todos los registros
    obtenerTodosFertilizantes() {
        return axios.get(`${API_URL}/v1/fertilizacion/`);
    }

    // SELECT: Devuelve todos los registros
    obtenerFertilizante() {
        return axios.get(`${API_URL}/v1/fertilizacion/${id}`);
    }

    // UPDATE: Actualiza un registro
    actualizarFertilizante(id, formData) {
        return axios.put(`${API_URL}/v1/fertilizacion/${id}`, formData); 
    }

    // DELETE: Elimina un registro
    eliminarFertilizante(id) {
        return axios.delete(`${API_URL}/v1/fertilizacion/${id}`);
    }
}

export default new ServicioFertilizantes();