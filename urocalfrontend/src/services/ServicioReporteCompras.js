import axios from "axios";

//const API_URL = "http://localhost:3000";
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioReporteCompras {
  reportePorMes(payload) {
    return axios.get(
      `${API_URL}/v1/reporteCompras/mes/${payload.year}/${payload.month}`
    );
  }

  reportePorAnio(payload) {
    return axios.get(
      `${API_URL}/v1/reporteCompras/anio/${payload.year}`
    );
  }

  reportePorRango(payload) {
    return axios.get(
      `${API_URL}/v1/reporteCompras/rango/${payload.desde}/${payload.hasta}`
    );
  }
}

export default new ServicioReporteCompras();