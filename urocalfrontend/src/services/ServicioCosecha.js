import axios from 'axios';

// Ruta al servidor backend
//const API_URL = 'http://localhost:3000/v1';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR + '/v1';

class ServicioCosecha {

    //registrar cosecha
    crearCosecha(cosecha) {
        return axios.post(`${API_URL}/harvests`, cosecha);
    }
    // SELECT: Obtiene todas las cosechas sin detalle
    obtenerCosechasSinDetalleCompra() {
        return axios.get(`${API_URL}/harvests/sin_detalle`);
    }

    // SELECT: Obtiene todas las cosechas con detalle
    obtenerCosechasConDetalleCompra() {
        return axios.get(`${API_URL}/harvests/con_detalle`);
    }

    // SELECT: Obtiene todas las cosechas
    obtenerTodosCosecha() {
        return axios.get(`${API_URL}/harvests`);
    }

     // SELECT: Devuelve una Siembra
    obtenerCosecha(id) {
        return axios.get(`${API_URL}/harvests/${id}`);
    }

    // UPDATE: Actualiza un Control de Maleza
    actualizarCosecha(cosecha) {
        return axios.put(`${API_URL}/harvests/${cosecha.cosechaid}`, cosecha);
    }

    // DELETE: Eliminar un Control de Maleza
    eliminarCosecha(cosechaid) {
        return axios.delete(`${API_URL}/harvests/${cosechaid}`);
    }
}

export default new ServicioCosecha();