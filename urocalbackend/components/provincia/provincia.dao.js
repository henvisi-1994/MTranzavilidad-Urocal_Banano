// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async crearProvincia(provincia) {

        let query, result;

        // Registro en tabla Provincia
        query = `INSERT INTO provincia (provincianombre, paisid) VALUES ('${provincia.provincianombre}', '${provincia.paisid}') RETURNING provinciaid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return provincia;
    },

    async obtenerProvincias() {
        let query = `SELECT  p.provinciaid, p.provincianombre, pa.paisid, pa.paisnombre FROM provincia p, pais pa WHERE p.paisid = pa.paisid;`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene la tabla provincia
    },

    async obtenerProvincia(id) {
        let query = `SELECT * FROM provincia WHERE provinciaid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json de provincia encontrado
    },

    async eliminarProvincia(id) {
        //Borrado logico
        let query = `DELETE FROM provincia WHERE provinciaid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró a provincia y 0 sino lo hizo.
    },

    async actualizarProvincia(id, provincia) {
        let query = `UPDATE provincia SET provincianombre = '${provincia.provincianombre}', paisid = '${provincia.paisid}' WHERE provinciaid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó a provincia y 0 sino lo hizo.
    }
}