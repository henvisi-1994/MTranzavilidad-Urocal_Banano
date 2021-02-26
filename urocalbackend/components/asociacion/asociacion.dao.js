// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async crearAsociacion(asociacion) {

        let query, result;

        // Registro en tabla asociacion
        query = `INSERT INTO asociacion
                    (asonombre, asoabreviado, asoruc, asoobservacion, asonumerosocios, asonumerohombres, asonumeromujeres, asoresponsableid) VALUES 
                    ('${asociacion.asonombre}','${asociacion.asoabreviado}','${asociacion.asoruc}','${asociacion.asoobservacion}',
                    '${asociacion.asonumerosocios}','${asociacion.asonumerohombres}', '${asociacion.asonumeromujeres}', '${asociacion.asoresponsableid}') RETURNING asociacionid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return asociacion;
    },

    async obtenerAsociaciones() {
        let query = `SELECT a.asociacionid, a.asonombre, a.asoabreviado, a.asoruc, a.asoobservacion, a.asonumerosocios, a.asonumerohombres, a.asonumeromujeres, a.asoresponsableid,  pe.personaid, concat(pe.pernombres, ' ' , pe.perapellidos) "responsable" 
        FROM  persona pe, asociacion a  WHERE pe.personaid = a.asoresponsableid`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene la tabla asociacion
    },

    async obtenerResponsable() {
        let query = `SELECT personaid, concat(pernombres, ' ' , perapellidos) "responsable" FROM  persona`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el json de finca encontrado
    },

    async eliminarAsociacion(id) {
        //Borrado logico
        let query = `DELETE FROM asociacion WHERE asociacionid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró a asociacion y 0 sino lo hizo.
    },

    async actualizarAsociacion(id, asociacion) {
        let query = `UPDATE asociacion SET asonombre = '${asociacion.asonombre}', asoabreviado = '${asociacion.asoabreviado}', 
        asoruc = '${asociacion.asoruc}', asoobservacion = '${asociacion.asoobservacion}', asonumerosocios = '${asociacion.asonumerosocios}', 
        asonumerohombres = '${asociacion.asonumerohombres}', asonumeromujeres = '${asociacion.asonumeromujeres}', asoresponsableid = '${asociacion.asoresponsableid}' WHERE asociacionid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó a asociacion y 0 sino lo hizo.
    }
}