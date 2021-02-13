import axios from 'axios';

// Ruta al servidor backend
const API_URL = 'http://localhost:3000/v1';

class ServicioCompra {

    // SELECT: Devuelve todos los compra
    obtenerTodosCompra() {
        return axios.get(`${API_URL}/compra`);
    }

    // SELECT: Devuelve una compra
    obtenerCompra(id) {
        return axios.get(`${API_URL}/compra/${id}`);
    }

    // INSERT: Agrega una compra
    crearCompra(compra) {
        return axios.post(`${API_URL}/compra`, compra);
    }

    // UPDATE: Actualiza un compra
    actualizarCompra(compra) {
        return axios.put(`${API_URL}/compra/${compra.compraid}`, compra);
    }

    /*// DELETE: Eliminar un lote
    eliminarLote(lotecultivadoid) {
        return axios.delete(`${API_URL}/lote/${lotecultivadoid}`);
    }*/
}

export default new ServicioCompra();
