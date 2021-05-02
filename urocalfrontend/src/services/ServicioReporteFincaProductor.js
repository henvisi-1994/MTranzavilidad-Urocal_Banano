import axios from 'axios';

// Ruta al servidor backend
// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

//const API_URL = 'http://localhost:3000';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

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