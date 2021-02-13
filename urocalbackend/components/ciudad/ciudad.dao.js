// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async crearCiudad(ciudad) {

        let query, result;

        // Registro en tabla ciudad
        query = `INSERT INTO ciudad (ciudadnombre, provinciaid) VALUES ('${ciudad.ciudadnombre}', '${ciudad.provinciaid}') RETURNING ciudadid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return ciudad;
    },

    async obtenerCiudades() {
        let query = `SELECT  c.ciudadid, c.ciudadnombre, p.provinciaid, p.provincianombre FROM ciudad c, provincia p WHERE c.provinciaid = p.provinciaid;`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene la tabla ciudad
    },

    async obtenerCiudad(id) {
        let query = `SELECT * FROM ciudad WHERE ciudadid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json de ciudad encontrado
    },

    async eliminarCiudad(id) {
        //Borrado logico
        let query = `DELETE FROM ciudad WHERE ciudadid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró a ciudad y 0 sino lo hizo.
    },

    async actualizarCiudad(id, ciudad) {
        let query = `UPDATE ciudad SET ciudadnombre = '${ciudad.ciudadnombre}', provinciaid = '${ciudad.provinciaid}' WHERE ciudadid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó a ciudad y 0 sino lo hizo.
    }
}