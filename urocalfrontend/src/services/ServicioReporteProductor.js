import axios from 'axios';

// Ruta al servidor backend
// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000';

class ServicioReporteProductor {
    
    // SELECT: Devuelve todas las fincas por productor
    obtenerProductor(id) {
        return axios.get(`${API_URL}/v1/productorpersonaReporte/${id}`);
    }

    // SELECT: Devuelve todos los registros
    obtenerTodosProductorPersona() {
        return axios.get(`${API_URL}/v1/productorpersonaReporte/`);
    }

    // SELECT: Devuelve todos los registros
    obtenerProductoresMasculino() {
        return axios.get(`${API_URL}/v1/productorpersonaReporteM/`);
    }

    // SELECT: Devuelve todos los registros
    obtenerProductoresFemenino() {
        return axios.get(`${API_URL}/v1/productorpersonaReporteF/`);
    }

}

export default new ServicioReporteProductor();