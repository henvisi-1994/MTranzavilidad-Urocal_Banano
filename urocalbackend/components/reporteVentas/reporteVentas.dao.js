// Data Access Object
// Se comunica con la base de datos
const pool = require("../../services/postgresql/index");

module.exports = {
  async ventasPorMes(payload) {
    let query = `select empresa.emprazonsocial, facturaexportacion.facfecha, facturaexportacion.facnumero, facturaexportacion.faclote, facturaexportacion.facvalortotal from facturaexportacion inner join empresa on facturaexportacion.vendedorid = empresa.empresaid
    where EXTRACT(month FROM facfecha) = ${payload.month} and EXTRACT(year FROM facfecha) = ${payload.year} and facturaexportacion.vendedorid = ${payload.exportador} order by facfecha desc`;
    let result = await pool.query(query);
    return result.rows;
  },

  async ventasPorAnio(payload) {
    let query = `select empresa.emprazonsocial, facturaexportacion.facfecha, facturaexportacion.facnumero, facturaexportacion.faclote, facturaexportacion.facvalortotal from facturaexportacion inner join empresa on facturaexportacion.vendedorid = empresa.empresaid
    where EXTRACT(year FROM facfecha) = ${payload.year} and facturaexportacion.vendedorid = ${payload.exportador} order by facfecha desc`;
    let result = await pool.query(query);
    return result.rows;
  },

  async ventasPorRango(payload) {
    let query = `select empresa.emprazonsocial, facturaexportacion.facfecha, facturaexportacion.facnumero, facturaexportacion.faclote, facturaexportacion.facvalortotal from facturaexportacion inner join empresa on facturaexportacion.vendedorid = empresa.empresaid where facfecha BETWEEN '${payload.desde}' and '${payload.hasta}' and facturaexportacion.vendedorid = ${payload.exportador} order by facfecha desc`;
    let result = await pool.query(query);
    return result.rows;
  },
};
