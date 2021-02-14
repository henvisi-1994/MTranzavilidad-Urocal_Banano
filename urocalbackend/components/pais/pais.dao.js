// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async crearPais(pais) {

        let query, result;

        // Registro en tabla Pais
        query = `INSERT INTO pais (paisnombre) VALUES ('${pais.paisnombre}') RETURNING paisid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return pais;
    },

    async obtenerPaises() {
        let query = `SELECT * FROM pais`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene la tabla pais
    },

    async obtenerPais(id) {
        let query = `SELECT * FROM pais WHERE paisid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json de pais encontrado
    },

    async eliminarPais(id) {
        //Borrado logico
        let query = `DELETE FROM pais WHERE paisid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró a pais y 0 sino lo hizo.
    },

    async actualizarPais(id, pais) {
        let query = `UPDATE pais SET paisnombre = '${pais.paisnombre}' WHERE paisid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó a pais y 0 sino lo hizo.
    }
}