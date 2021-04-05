import axios from 'axios';

// Ruta al servidor backend
const API_URL = 'http://localhost:3000/v1';

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
}

export default new ServicioCosecha();