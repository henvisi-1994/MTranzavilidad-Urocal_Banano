// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async crearCultivo(cultivo) {
        // Registro en tabla cultivo
        query = `INSERT INTO cultivo (lotecultivadoid, productoid) VALUES 
                    (${cultivo.lotecultivadoid},${cultivo.productoid})`;
        result = await pool.query(query);
    },

    async obtenerTodosCultivo() {
        let query = `SELECT * FROM cultivo`;
        /*let query = `SELECT cu.cultivoid, cu.lotecultivadoid, cu.productoid, pr.pronombre, lc.lotnumero
                    FROM cultivo cu, producto pr, lotecultivado lc
                    WHERE cu.productoid = pr.productoid AND cu.lotecultivadoid = lc.lotecultivadoid;`;*/
        let result = await pool.query(query);
        return result.rows; // Devuelve array de cultivos
    },

    async obtenerCultivo(id) {
        let query = `SELECT * FROM cultivo WHERE lotecultivadoid = ${id}`;
        let result = await pool.query(query);
        return result.rows; // Devuelve objeto de cultivo
    },

    async actualizarCultivo(id, cultivo) {
        let query = `UPDATE cultivo SET lotecultivadoid = '${cultivo.lotecultivadoid}', productoid = '${cultivo.productoid}'
        WHERE cultivoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si actualizó el cultivo y 0 sino lo hizo.
    },

    async eliminarCultivo(id) {
        let query = `DELETE FROM cultivo WHERE cultivoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si borró el cultivo y 0 sino lo hizo.
    }
}