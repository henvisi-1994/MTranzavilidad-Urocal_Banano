import axios from "axios";

//const API_URL = "http://localhost:3000";
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioReporteVentas {
  reportePorMes(payload) {
    return axios.get(
      `${API_URL}/v1/reporteVentas/mes/${payload.year}/${payload.month}/${payload.exportador}`
    );
  }

  reportePorAnio(payload) {
    return axios.get(
      `${API_URL}/v1/reporteVentas/anio/${payload.year}/${payload.exportador}`
    );
  }

  reportePorRango(payload) {
    return axios.get(
      `${API_URL}/v1/reporteVentas/rango/${payload.desde}/${payload.hasta}/${payload.exportador}`
    );
  }
}

export default new ServicioReporteVentas();
