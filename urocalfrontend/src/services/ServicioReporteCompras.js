import axios from "axios";

const API_URL = "http://localhost:3000";

class ServicioReporteCompras {
  reportePorMes(payload) {
    return axios.get(
      `${API_URL}/v1/reporteCompras/mes/${payload.year}/${payload.month}/${payload.productor}`
    );
  }

  reportePorAnio(payload) {
    return axios.get(
      `${API_URL}/v1/reporteCompras/anio/${payload.year}/${payload.productor}`
    );
  }

  reportePorRango(payload) {
    return axios.get(
      `${API_URL}/v1/reporteCompras/rango/${payload.desde}/${payload.hasta}/${payload.productor}`
    );
  }
}

export default new ServicioReporteCompras();