// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async createCultivatedLot(cultivatedLot) {
        // Registro en tabla loteCultivado
        query = `INSERT INTO loteCultivado (lotnumero, lotnumerohectareas, lotestado, lotobservacion, fincaid) VALUES 
                    (${cultivatedLot.lotnumero},${cultivatedLot.lotnumerohectareas},
                    '${cultivatedLot.lotestado}', '${cultivatedLot.lotobservacion}', ${cultivatedLot.fincaid})`;
        result = await pool.query(query);
    },

    async getAllCultivatedLot() {
        let query = `SELECT * FROM loteCultivado`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de lotes cultivados
    },

    async getCultivatedLot(id) {
        let query = `SELECT * FROM loteCultivado WHERE lotecultivadoid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve array de lotes cultivados
    },

    async updateCultivateLot(id, cultivatedLot) {
        let query = `UPDATE loteCultivado SET lotnumero = ${cultivatedLot.lotnumero}, lotnumerohectareas = ${cultivatedLot.lotnumerohectareas}, 
        lotestado = '${cultivatedLot.lotestado}', lotobservacion = '${cultivatedLot.lotobservacion}', fincaid = ${cultivatedLot.fincaid}
        WHERE lotecultivadoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si actualizó el lote cultivado y 0 sino lo hizo.
    },

    async deleteCultivatedLot(id) {
        let query = `DELETE FROM loteCultivado WHERE lotecultivadoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si borró el lote cultivado y 0 sino lo hizo.
    }
}