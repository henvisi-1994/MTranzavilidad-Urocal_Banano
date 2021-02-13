import axios from 'axios';

// Ruta al servidor backend
const API_URL = 'http://localhost:3000/v1';

class ServicioMalezaControl {

    // SELECT: Devuelve todos los Controles de Maleza
    obtenerTodosMalezaControl() {
        return axios.get(`${API_URL}/malezacontrol`);
    }

    // SELECT: Devuelve un Control de Maleza
    obtenerMalezaControl(id) {
        return axios.get(`${API_URL}/malezacontrol/${id}`);
    }

    // SELECT: Devuelve la lista con el nombre del culivo,y mas detalles
    obtenerTodosListaCultivoDetalles() {
        return axios.get(`${API_URL}/malezacontrol/malezainformacion`);
    }

    // INSERT: Agrega un Control de Maleza
    crearMalezaControl(maleza) {
        return axios.post(`${API_URL}/malezacontrol`, maleza);
    }

    // UPDATE: Actualiza un Control de Maleza
    actualizarMalezaControl(maleza) {
        return axios.put(`${API_URL}/malezacontrol/${maleza.controlmalezaid}`, maleza);
    }

    // DELETE: Eliminar un Control de Maleza
    eliminarMalezaControl(controlmalezaid) {
        return axios.delete(`${API_URL}/malezacontrol/${controlmalezaid}`);
    }
}

export default new ServicioMalezaControl();