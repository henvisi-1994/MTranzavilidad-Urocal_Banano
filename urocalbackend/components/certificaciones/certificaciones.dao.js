// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async crearCertificacion(certificacion) {

        let query, result;

        // Registro en tabla certificacion
        query = `INSERT INTO certificaciones (certificacionnombre, certificacion) VALUES ('${certificacion.certificacionnombre}', '${certificacion.certificacion}') RETURNING certificacionid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return certificacion;
    },

    async obtenerCertificaciones() {
        let query = `SELECT * FROM certificaciones `;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene la tabla certificacion
    },

    async obtenerCertificacion(id) {
        let query = `SELECT * FROM certificacion WHERE certificacionid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json de certificacion encontrado
    },

    async eliminarCertificacion(id) {
        //Borrado logico
        let query = `DELETE FROM certificaciones WHERE certificacionid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró a certificacion y 0 sino lo hizo.
    },

    async actualizarCertificacion(id, certificacion) {
        let query = `UPDATE certificaciones SET certificacionnombre = '${certificacion.certificacionnombre}', certificacion = '${certificacion.certificacion}' WHERE certificacionid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó a certificacion y 0 sino lo hizo.
    }
}