// Data Access Object
// Se comunica con la base de datos
const pool = require("../../services/postgresql/index");

module.exports = {
  
  async comprasPorMes(payload) {
    let query = `SELECT c.compraid, TO_CHAR(c.comfechaemision, 'YYYY-MM-DD') as comfechaemision, c.comtotal, 
    CONCAT(per.pernombres, ' ', per.perapellidos) as productor from compra as c, guiaremision as g,productor as p, persona as per
    where g.guiaremisionid=c.guiaremisionid and g.productorid=p.productorid and p.productorid=per.personaid and EXTRACT(month FROM comfechaemision) = ${payload.month} and EXTRACT(year FROM comfechaemision) = ${payload.year}  order by comfechaemision asc`;
    let result = await pool.query(query);
    return result.rows;
  },

  async comprasPorAnio(payload) {
    let query = `SELECT c.compraid, TO_CHAR(c.comfechaemision, 'YYYY-MM-DD') as comfechaemision, c.comtotal, 
    CONCAT(per.pernombres, ' ', per.perapellidos) as productor from compra as c, guiaremision as g,productor as p, persona as per
    where g.guiaremisionid=c.guiaremisionid and g.productorid=p.productorid and p.productorid=per.personaid and EXTRACT(year FROM comfechaemision) = ${payload.year} order by comfechaemision asc`;
    let result = await pool.query(query);
    return result.rows;
  },

  async comprasPorRango(payload) {
    let query = `SELECT c.compraid, TO_CHAR(c.comfechaemision, 'YYYY-MM-DD') as comfechaemision, c.comtotal, 
    CONCAT(per.pernombres, ' ', per.perapellidos) as productor from compra as c, guiaremision as g,productor as p, persona as per
    where g.guiaremisionid=c.guiaremisionid and g.productorid=p.productorid and p.productorid=per.personaid and comfechaemision BETWEEN '${payload.desde}' and '${payload.hasta}' order by comfechaemision asc`;
    let result = await pool.query(query);
    return result.rows;
  },
};
