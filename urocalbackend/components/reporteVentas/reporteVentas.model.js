// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const reporteVentas = require("./reporteVentas.dao");

module.exports = {
  async ventasPorMes(payload) {
    return reporteVentas.ventasPorMes(payload);
  },

  async ventasPorAnio(payload) {
    return reporteVentas.ventasPorAnio(payload);
  },

  async ventasPorRango(payload) {
    return reporteVentas.ventasPorRango(payload);
  },
};
