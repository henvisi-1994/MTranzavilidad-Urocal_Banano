// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const reporteVentasModel = require("./reporteVentas.model");

module.exports = {
  async ventasPorMes(req, res) {
    const { month, year, exportador } = req.params;
    const rows = await reporteVentasModel.ventasPorMes({
      month,
      year,
      exportador,
    });
    return res.status(200).send(rows);
  },

  async ventasPorAnio(req, res) {
    const { year, exportador } = req.params;
    const rows = await reporteVentasModel.ventasPorAnio({
      year,
      exportador,
    });
    return res.status(200).send(rows);
  },

  async ventasPorRango(req, res) {
    const { desde, hasta, exportador } = req.params;
    const rows = await reporteVentasModel.ventasPorRango({
      desde,
      hasta,
      exportador,
    });
    return res.status(200).send(rows);
  },
};
