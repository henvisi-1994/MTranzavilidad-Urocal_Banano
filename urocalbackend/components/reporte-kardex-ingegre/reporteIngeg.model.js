// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const reporteIngeg = require("./reporteIngeg.dao");

module.exports = {
  async ingegPorMes(fechas) {
    return reporteIngeg.ingegPorMes(fechas);
  },

  async ingegPorAnio(fechas) {
    return reporteIngeg.ingegPorAnio(fechas);
  },

  async ingegPorRango(fechas) {
    return reporteIngeg.ingegPorRango(fechas);
  },
};
