import axios from "axios";

//const API_URL = "http://localhost:3000"; 
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
const API_URL = RUTA_SERVIDOR;

class ServicioReporteKardexIngresosEgresos {
  reportePorMes(payload) {
    return axios.get(
      `${API_URL}/v1/kardexingegreporte/mes/${payload.year}/${payload.month}`
    );
  }

  reportePorAnio(payload) {
    return axios.get(
      `${API_URL}/v1/kardexingegreporte/anio/${payload.year}`
    );
  }

  reportePorRango(payload) {
    return axios.get(
      `${API_URL}/v1/kardexingegreporte/rango/${payload.desde}/${payload.hasta}`
    );
  }
}

export default new ServicioReporteKardexIngresosEgresos();
