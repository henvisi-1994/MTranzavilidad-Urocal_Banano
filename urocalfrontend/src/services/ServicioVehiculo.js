import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

const API_URL = 'http://localhost:3000';

class ServicioVehiculo {

    // SELECT: Devuelve todos los sitios
    obtenerTodosVehiculos() {
        return axios.get(`${API_URL}/v1/vehiculo/`);
    }
    obtenerVehiculoFinca(id) {
        return axios.get(`${API_URL}/v1/vehiculo/finca/${id}`);
    }
    obtenerVehiculo(id) {
        return axios.get(`${API_URL}/v1/vehiculo/${id}`);
    }

        // INSERT: Agrega un  Asociacion
    agregarVehiculo(formData) {
            return axios.post(`${API_URL}/v1/vehiculo`, formData);
            
        }

     updateVehiculo(id,formData) {
            return axios.put(`${API_URL}/v1/vehiculo/${id}`, formData);
            
        }

        deleteVehiculo(id) {
            return axios.delete(`${API_URL}/v1/vehiculo/${id}`);
            
        }
}

export default new ServicioVehiculo();