// Data Access Object
// Se comunica con la base de datos
const pool = require("../../services/postgresql/index");

module.exports = {
  async ingegPorMes(fechas) {
    let query = `SELECT TO_CHAR(a.almfechaingresobodega, 'YYYY-MM-DD') as almfechaingresobodega, a.almcontrato, a.almnumerobultos, a.almpesobulto, a.almpesototalingreso, 
    c.centroacopionombre, TO_CHAR(des.desfechasalida, 'YYYY-MM-DD') as desfechasalida, des.desnumero, des.desdestino, des.desmotivo,CASE des.desorganico WHEN 'True' THEN 'Organico' WHEN 'False' THEN 'No Organico' END AS organico, 
CASE des.desspp WHEN 'True' THEN 'Si' WHEN 'False' THEN 'No' END AS spp, ta.detdesnumerobultos, ta.detdespesounitario, c.centroacopionombre, a.almsaldo
FROM almacenamiento a, tratamiento t, centroacopio c, despacho des, detalledespacho ta
WHERE a.tratamientoid = t.tratamientoid and a.centroacopioid = c.centroacopioid and des.despachoid = ta.despachoid AND ta.almacenamientoid = a.almacenamientoid and EXTRACT(year from almfechaingresobodega)= ${fechas.anio} and EXTRACT(year from desfechasalida)= ${fechas.anio} and EXTRACT(month from almfechaingresobodega)= ${fechas.mes} and EXTRACT(month from desfechasalida)= ${fechas.mes} AND a.centroacopioid = c.centroacopioid order by a.almfechaingresobodega ASC, des.desfechasalida ASC;`;
    let result = await pool.query(query);
    return result.rows;
  },

  async ingegPorAnio(fechas) {
    let query = `SELECT TO_CHAR(a.almfechaingresobodega, 'YYYY-MM-DD') as almfechaingresobodega, a.almcontrato, a.almnumerobultos, a.almpesobulto, a.almpesototalingreso, 
    c.centroacopionombre, TO_CHAR(des.desfechasalida, 'YYYY-MM-DD') as desfechasalida, des.desnumero, des.desdestino, des.desmotivo,CASE des.desorganico WHEN 'True' THEN 'Organico' WHEN 'False' THEN 'No Organico' END AS organico, 
CASE des.desspp WHEN 'True' THEN 'Si' WHEN 'False' THEN 'No' END AS spp, ta.detdesnumerobultos, ta.detdespesounitario, c.centroacopionombre, a.almsaldo
FROM almacenamiento a, tratamiento t, centroacopio c, despacho des, detalledespacho ta
WHERE a.tratamientoid = t.tratamientoid and a.centroacopioid = c.centroacopioid and des.despachoid = ta.despachoid AND ta.almacenamientoid = a.almacenamientoid and EXTRACT(year from almfechaingresobodega)= ${fechas.anio} and EXTRACT(year from desfechasalida)= ${fechas.anio} AND a.centroacopioid = c.centroacopioid order by a.almfechaingresobodega ASC, des.desfechasalida ASC;`;
    let result = await pool.query(query);
    return result.rows;
  },

  async ingegPorRango(fechas) {
    let query = `SELECT TO_CHAR(a.almfechaingresobodega, 'YYYY-MM-DD') as almfechaingresobodega, a.almcontrato, a.almnumerobultos, a.almpesobulto, a.almpesototalingreso, 
    c.centroacopionombre, TO_CHAR(des.desfechasalida, 'YYYY-MM-DD') as desfechasalida, des.desnumero, des.desdestino, des.desmotivo,CASE des.desorganico WHEN 'True' THEN 'Organico' WHEN 'False' THEN 'No Organico' END AS organico, 
CASE des.desspp WHEN 'True' THEN 'Si' WHEN 'False' THEN 'No' END AS spp, ta.detdesnumerobultos, ta.detdespesounitario, c.centroacopionombre, a.almsaldo
FROM almacenamiento a, tratamiento t, centroacopio c, despacho des, detalledespacho ta
WHERE a.tratamientoid = t.tratamientoid and a.centroacopioid = c.centroacopioid and des.despachoid = ta.despachoid AND ta.almacenamientoid = a.almacenamientoid and almfechaingresobodega BETWEEN ${fechas.inicio} and ${fechas.fin} and desfechasalida BETWEEN ${fechas.inicio} and ${fechas.fin}
AND a.centroacopioid = c.centroacopioid order by a.almfechaingresobodega ASC, des.desfechasalida ASC;`;
    let result = await pool.query(query);
    return result.rows;
  },
};
