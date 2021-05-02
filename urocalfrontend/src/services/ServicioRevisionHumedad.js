import axios from 'axios';

// Ruta al servidor backend
//const API_URL = 'http://localhost:3000/v1';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR + '/v1';

class ServicioRevisionHumedad {

    // SELECT: Devuelve revisionHumedad por Almacenamiento
    obtenerRevisionHumedadPorAlmacenamiento(almacenamientoid) {
        return axios.get(`${API_URL}/revisionHumedad/almacenamiento/${almacenamientoid}`);
    }

    /*// SELECT: Devuelve un lote
    obtenerLote(id) {
        return axios.get(`${API_URL}/lote/${id}`);
    }*/

    // INSERT: Agrega una revisionHumedad
    crearRevisionHumedad(revisionHumedad) {
        return axios.post(`${API_URL}/revisionHumedad`, revisionHumedad);
    }

    /*// INSERT: Agrega un mix
    crearMix(mix) {
        return axios.post(`${API_URL}/mix`, mix);
    }*/

    // UPDATE: Actualiza una revisionHumedad
    actualizarRevisionHumedad(revisionHumedad) {
        console.log(revisionHumedad);
        return axios.put(`${API_URL}/revisionHumedad`, revisionHumedad);
    }

    // DELETE: Eliminar una revisionHumedad
    eliminarRevisionHumedad(revisionhumedadid) {
        return axios.delete(`${API_URL}/revisionHumedad/${revisionhumedadid}`);
    }
}

export default new ServicioRevisionHumedad();