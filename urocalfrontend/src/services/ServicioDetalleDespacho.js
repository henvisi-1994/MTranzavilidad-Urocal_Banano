import axios from 'axios';

// Ruta al servidor backend
//const API_URL = 'http://localhost:3000/v1';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR + '/v1';

class ServicioDetalleDespacho {

    // SELECT: Devuelve todos los detalles de los despachos
    obtenerTodosDetalleDespacho() {
        return axios.get(`${API_URL}/detalledespacho`);
    }

    // SELECT: Devuelve un Detalle de un despacho
    obtenerDetalleDespacho(id) {
        return axios.get(`${API_URL}/detalledespacho/${id}`);
    }

    // SELECT: Devuelve la lista con el nombre del centro de acopio y su propietario
    obtenerTodosListaAcopio() {
        return axios.get(`${API_URL}/detalledespacho/acopioinformacion`);
    }

    // INSERT: Agrega un Detalle de un despacho
    crearDetalleDespacho(detalledespacho) {
        return axios.post(`${API_URL}/detalledespacho`, detalledespacho);
    }


    // UPDATE: Actualiza un Detalle de un despacho
    actualizarDetalleDespacho(detalledespacho) {
        return axios.put(`${API_URL}/detalledespacho/${detalledespacho.despachoid}`, detalledespacho);
    }

    // DELETE: Eliminar un Detalle de un despacho
    eliminarDetalleDespacho(despachoid) {
        return axios.delete(`${API_URL}/detalledespacho/${despachoid}`);
    }
}

export default new ServicioDetalleDespacho();