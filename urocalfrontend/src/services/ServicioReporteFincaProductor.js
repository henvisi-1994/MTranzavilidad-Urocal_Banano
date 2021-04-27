import axios from 'axios';

// Ruta al servidor backend
// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000';

class ServicioReporteFincaProductor {
    

    // SELECT: Devuelve todas las fincas
    obtenerTodosFincas() {
        return axios.get(`${API_URL}/v1/reportefincaproductor/`);
    }

    // SELECT: Devuelve todas las fincas por productor
    obtenerProductor(id) {
        return axios.get(`${API_URL}/v1/productorreporte/${id}`);
    }

    // Devuelve datos del productor
    obtenerFincasProductor(id) {
        return axios.get(`${API_URL}/v1/reportefincaproductor/${id}`);
    }

}

export default new ServicioReporteFincaProductor();