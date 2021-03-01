
const pool = require('../../services/postgresql/index');

module.exports = {
    async getRiegos() {
        let query = `SELECT riego.*, lotecultivado.lotnumero, lotecultivado.lotecultivadoid, finca.fincaid, finca.fincodigo
        FROM riego INNER JOIN cultivo ON riego.cultivoid = cultivo.cultivoid
        INNER JOIN lotecultivado ON cultivo.lotecultivadoid = lotecultivado.lotecultivadoid
        INNER JOIN finca ON lotecultivado.fincaid = finca.fincaid;`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los usuarios
    },

    async getRiego(id) {
        let query = `SELECT * FROM riego WHERE riegoid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del usuario encontrado
    },

    async createRiego(riego) {
        let query, result;

        query = `INSERT INTO riego
                    (riesuperficie, riemodulos, riesemana, rieanio, riehorasregadas, rieporcentajeeficiencia, rievolumenutilizado, rieoperario, cultivoid) VALUES
                    ('${riego.riesuperficie}', '${riego.riemodulos}','${riego.riesemana}','${riego.rieanio}','${riego.riehorasregadas}','${riego.rieporcentajeeficiencia}','${riego.rievolumenutilizado}','${riego.rieoperario}','${riego.cultivoid}') RETURNING riegoid;`

        result = await pool.query(query);

        return riego;
    },

    async updateRiego(id, riego) {
        let query = `UPDATE riego SET riesuperficie = '${riego.riesuperficie}', riemodulos = '${riego.riemodulos}', riesemana = '${riego.riesemana}', rieanio = '${riego.rieanio}', riehorasregadas = '${riego.riehorasregadas}', rieporcentajeeficiencia = '${riego.rieporcentajeeficiencia}', rievolumenutilizado = '${riego.rievolumenutilizado}', rieoperario = '${riego.rieoperario}', cultivoid = '${riego.cultivoid}' WHERE riegoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount;
    },
    
    async deleteRiego(id) {
        //Borrado logico
        let query = `DELETE FROM riego WHERE riegoid = '${id}'`;
        let result = await pool.query(query);

        query = `DELETE FROM riego WHERE riegoid = '${id}'`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al usuario y 0 sino lo hizo.
    },
    
}