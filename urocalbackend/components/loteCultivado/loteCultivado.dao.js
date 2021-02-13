// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async crearLoteCultivado(loteCultivado) {
        // Registro en tabla loteCultivado
        query = `INSERT INTO loteCultivado (lotnumero, lotnumerohectareas, lotestado, lotobservacion, fincaid) VALUES 
                    (${loteCultivado.lotnumero},${loteCultivado.lotnumerohectareas},
                    '${loteCultivado.lotestado}', '${loteCultivado.lotobservacion}', ${loteCultivado.fincaid})
                    RETURNING lotecultivadoid`;
        result = await pool.query(query);
        return result.rows[0];
    },

    async obtenerTodosLoteCultivado() {
        let query = `SELECT l.*, f.finnombrefinca FROM loteCultivado l, finca f
                     WHERE l.fincaid = f.fincaid`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de lotes cultivados
    },

    async obtenerLoteCultivado(id) {
        let query = `SELECT * FROM loteCultivado WHERE lotecultivadoid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve array de lotes cultivados
    },

    async actualizarLoteCultivado(id, loteCultivado) {
        let query = `UPDATE loteCultivado SET lotnumero = ${loteCultivado.lotnumero}, lotnumerohectareas = ${loteCultivado.lotnumerohectareas}, 
        lotestado = '${loteCultivado.lotestado}', lotobservacion = '${loteCultivado.lotobservacion}', fincaid = ${loteCultivado.fincaid}
        WHERE lotecultivadoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si actualizó el lote cultivado y 0 sino lo hizo.
    },

    async eliminarLoteCultivado(id) {
        let query = `DELETE FROM loteCultivado WHERE lotecultivadoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si borró el lote cultivado y 0 sino lo hizo.
    }
}