import axios from 'axios';

// Ruta al servidor backend
const API_URL = 'http://localhost:3000/v1';

class ServicioDetalleCompra {

    // SELECT: Devuelve todos los compra
    /*obtenerTodosCompra() {
        return axios.get(`${API_URL}/compra`);
    }*/

    // SELECT: Devuelve una lista de detalleCompra por compraid
    obtenerDetalleCompra(id) {
        return axios.get(`${API_URL}/detalleCompra/${id}`);
    }

    // SELECT: Devuelve un detalleCompra por su id
    obtenerDatosDetalleCompra(id) {
        return axios.get(`${API_URL}/detalleCompra/datos/${id}`);
    }

    // INSERT: Agrega un detalleCompra
    crearDetalleCompra(detalleCompra) {
        return axios.post(`${API_URL}/detalleCompra`, detalleCompra);
    }

    // UPDATE: Actualiza un detalleCompra
    actualizarDetalleCompra(detalleCompra) {
        return axios.put(`${API_URL}/detalleCompra/${detalleCompra.detallecompraid}`, detalleCompra);
    }

    /*// DELETE: Eliminar un lote
    eliminarLote(lotecultivadoid) {
        return axios.delete(`${API_URL}/lote/${lotecultivadoid}`);
    }*/
}

export default new ServicioDetalleCompra();
