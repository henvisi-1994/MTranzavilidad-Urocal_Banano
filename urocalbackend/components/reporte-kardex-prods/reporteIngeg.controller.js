// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const reporteInegModel = require("./reporteIngeg.model");

module.exports = {
  async ingegPorMes(req, res) {
    const { mes, anio } = req.params;
    const rows = await reporteInegModel.ingegPorMes({
      mes,
      anio,
    });
    return res.status(200).send(rows);
  },

  async ingegPorAnio(req, res) {
    const { anio } = req.params;
    const rows = await reporteInegModel.ingegPorAnio({
      anio,
    });
    return res.status(200).send(rows);
  },

  async ingegPorRango(req, res) {
    const { inicio, fin } = req.params;
    const rows = await reporteInegModel.ingegPorRango({
      inicio,
      fin,
      
    });
    return res.status(200).send(rows);
  },
};
