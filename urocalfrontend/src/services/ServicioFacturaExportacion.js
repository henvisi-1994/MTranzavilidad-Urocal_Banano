import axios from 'axios';

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

//const API_URL = 'http://localhost:3000';
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioFacturaExportacion{
  // INSERT: Agrega un registro
  agregarFacturaExport(formData) {
    return axios.post(`${API_URL}/v1/facturaExport`, formData);
}

// SELECT: Devuelve todos los registros
obtenerTodosFacturaExport() {
    return axios.get(`${API_URL}/v1/facturaExport/`);
    
}
obtenerDetalleFacturaExport(id) {
    return axios.get(`${API_URL}/v1/facturaExport/detalle/${id}`);
}
obtenerFacturaExport(id) {
    return axios.get(`${API_URL}/v1/facturaExport/${id}`);
    
}

// UPDATE: Actualiza un registro
actualizarFacturaExport(id, formData) {
    return axios.put(`${API_URL}/v1/facturaExport/${id}`, formData); 
}

// DELETE: Elimina un registro
eliminarFacturaExport(id) {
    return axios.delete(`${API_URL}/v1/facturaExport/${id}`);
}
eliminarDetalleFacturaExport(id) {
    return axios.delete(`${API_URL}/v1/facturaExport/detalle/${id}`);
}
}
export default new ServicioFacturaExportacion();