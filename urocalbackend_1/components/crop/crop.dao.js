// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async createCrop(crop) {
        // Registro en tabla cultivo
        query = `INSERT INTO cultivo (lotecultivadoid, productoid) VALUES 
                    (${crop.lotecultivadoid},${crop.productoid})`;
        result = await pool.query(query);
    },

    async getAllCrops() {
        let query = `SELECT * FROM cultivo`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de cultivos
    },

    async getCrop(id) {
        let query = `SELECT * FROM cultivo WHERE cultivoid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve objeto de cultivo
    },

    async updateCrop(id, crop) {
        let query = `UPDATE cultivo SET lotecultivadoid = '${crop.lotecultivadoid}', productoid = '${crop.productoid}'
        WHERE cultivoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si actualizó el cultivo y 0 sino lo hizo.
    },

    async deleteCrop(id) {
        let query = `DELETE FROM cultivo WHERE cultivoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si borró el cultivo y 0 sino lo hizo.
    }
}