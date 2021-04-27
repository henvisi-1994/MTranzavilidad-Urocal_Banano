// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const reporteCompras = require("./reporteCompras.dao");

module.exports = {
  async comprasPorMes(payload) {
    return reporteCompras.comprasPorMes(payload);
  },

  async comprasPorAnio(payload) {
    return reporteCompras.comprasPorAnio(payload);
  },

  async comprasPorRango(payload) {
    return reporteCompras.comprasPorRango(payload);
  },
};
