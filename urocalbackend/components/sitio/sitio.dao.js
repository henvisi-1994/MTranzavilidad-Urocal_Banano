// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async crearSitio(sitio) {

        let query, result;

        // Registro en tabla sitio
        query = `INSERT INTO sitio (sitionombre, ciudadid) VALUES ('${sitio.sitionombre}', '${sitio.ciudadid}') RETURNING sitioid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return sitio;
    },

    async obtenerSitios() {
        let query = `SELECT s.sitioid, s.sitionombre, c.ciudadid, c.ciudadnombre FROM sitio s, ciudad c WHERE s.ciudadid = c.ciudadid;`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene la tabla sitio
    },

    async obtenerSitio(id) {
        let query = `SELECT * FROM sitio WHERE sitioid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del sitio encontrado
    },

    async eliminarSitio(id) {
        //Borrado logico
        let query = `DELETE FROM sitio WHERE sitioid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró a sitio y 0 sino lo hizo.
    },

    async actualizarSitio(id, sitio) {
        let query = `UPDATE sitio SET sitionombre = '${sitio.sitionombre}', ciudadid = '${sitio.ciudadid}' WHERE sitioid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó a sitio y 0 sino lo hizo.
    }
}