import axios from 'axios';

// Ruta al servidor backend
const API_URL = 'http://localhost:3000/v1';

class ServicioAlmacenamiento {

    // SELECT: Devuelve todos los almacenamientos
    obtenerTodosAlmacenamiento() {
        return axios.get(`${API_URL}/almacenamiento`);
    }

    /*// SELECT: Devuelve un lote
    obtenerLote(id) {
        return axios.get(`${API_URL}/lote/${id}`);
    }*/

    // INSERT: Agrega un almacenamiento
    crearAlmacenamiento(almacenamiento) {
        return axios.post(`${API_URL}/almacenamiento`, almacenamiento);
    }

    // INSERT: Agrega un mix
    crearMix(mix) {
        return axios.post(`${API_URL}/mix`, mix);
    }

    // INSERT: Obtener mix por almacenamiento
    obtenerMixPorAlmacenamiento(id) {
        return axios.get(`${API_URL}/mix/${id}`);
    }

    // UPDATE: Actualiza un almacenamiento
    actualizarAlmacenamiento(almacenamiento) {
        return axios.put(`${API_URL}/almacenamiento/${almacenamiento.almacenamientoid}`, almacenamiento);
    }

    // DELETE: Eliminar un lote
    eliminarAlmacenamiento(idAlmacenamiento) {
        return axios.delete(`${API_URL}/almacenamiento/${idAlmacenamiento}`);
    }
}

export default new ServicioAlmacenamiento();