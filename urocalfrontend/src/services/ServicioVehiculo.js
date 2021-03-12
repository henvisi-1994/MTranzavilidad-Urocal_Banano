import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000';

class ServicioSitio {

    // SELECT: Devuelve todos los sitios
    obtenerTodosVehiculos() {
        return axios.get(`${API_URL}/v1/vehiculo/`);
    }
}

export default new ServicioSitio();