// Data Access Object
// Se comunica con la base de datos
const pool = require("../../services/postgresql/index");

module.exports = {
  async ingegPorMes(fechas) {
    var daylast = getNumberOfDays(fechas.anio, fechas.mes)
    let query = `SELECT ei.egrinsfechaegreso, ei.egrinsdosis, ei.egrinscantidadentregada, ei.egrencargado, ii.inginsfechaingreso, ii.inginsproducto, ii.inginsproveedor, ii.inginscantidadingreso, fn.finnombrefinca, ca.centroacopionombre
                  FROM egresoinsumo as ei, ingresoinsumo as ii, finca as fn, centroacopio as ca
                  WHERE ii.ingresoinsumosid=ei.ingresoinsumosid AND ei.fincaid=fn.fincaid AND ii.centroacopioid=ca.centroacopioid  AND ei.egrinsfechaegreso >='${fechas.anio}-${fechas.mes}-01'::date AND ii.inginsfechaingreso < ('${fechas.anio}-${fechas.mes}-${daylast}'::date);`
    let result = await pool.query(query);
    return result.rows;
  },

  async ingegPorAnio(fechas) {
    let query = `SELECT ei.egrinsfechaegreso, ei.egrinsdosis, ei.egrinscantidadentregada, ei.egrencargado, ii.inginsfechaingreso, ii.inginsproducto, ii.inginsproveedor, ii.inginscantidadingreso, fn.finnombrefinca, ca.centroacopionombre
                  FROM egresoinsumo as ei, ingresoinsumo as ii, finca as fn, centroacopio as ca
                  WHERE ii.ingresoinsumosid=ei.ingresoinsumosid AND ei.fincaid=fn.fincaid AND ii.centroacopioid=ca.centroacopioid  AND ei.egrinsfechaegreso >='${fechas.anio}-01-01'::date AND ii.inginsfechaingreso < ('${fechas.anio}-12-31'::date);`
    let result = await pool.query(query);
    return result.rows;
  },

  async ingegPorRango(fechas) {
    let query = `SELECT ei.egrinsfechaegreso, ei.egrinsdosis, ei.egrinscantidadentregada, ei.egrencargado, ii.inginsfechaingreso, ii.inginsproducto, ii.inginsproveedor, ii.inginscantidadingreso, fn.finnombrefinca, ca.centroacopionombre
                  FROM egresoinsumo as ei, ingresoinsumo as ii, finca as fn, centroacopio as ca
                  WHERE ii.ingresoinsumosid=ei.ingresoinsumosid AND ei.fincaid=fn.fincaid AND ii.centroacopioid=ca.centroacopioid  AND ei.egrinsfechaegreso >='${fechas.inicio}'::date AND ii.inginsfechaingreso < ('${fechas.fin}'::date);`
    let result = await pool.query(query);
    return result.rows;
  },
};

Date.prototype.daysinMonth = function () {
  var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
  return d.getDate();
}
function getNumberOfDays(year, month) {
  return (new Date(year, month - 1, 1)).daysinMonth();

}
