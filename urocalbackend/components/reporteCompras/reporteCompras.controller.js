// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const reporteComprasModel = require("./reporteCompras.model");

module.exports = {
  
  async comprasPorMes(req, res) {
    const { month, year, productor } = req.params;
    const rows = await reporteComprasModel.comprasPorMes({
      month,
      year,
      productor,
    });
    return res.status(200).send(rows);
  },

  async comprasPorAnio(req, res) {
    const { year, productor } = req.params;
    const rows = await reporteComprasModel.comprasPorAnio({
      year,
      productor,
    });
    return res.status(200).send(rows);
  },

  async comprasPorRango(req, res) {
    const { desde, hasta, productor } = req.params;
    const rows = await reporteComprasModel.comprasPorRango({
      desde,
      hasta,
      productor,
    });
    return res.status(200).send(rows);
  },
};
