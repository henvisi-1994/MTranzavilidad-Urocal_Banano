
const pool = require('../../services/postgresql/index');
module.exports = {

    async getCargas(id) {
        let query, result
        query = `SELECT * FROM carga WHERE guiaremisionid = '${id}'`;
        result = await pool.query(query);
        return result.rows;
    }
}