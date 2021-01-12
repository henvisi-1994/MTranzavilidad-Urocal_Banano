// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async createSoil(soil) {
        // Registro en tabla suelo
        query = `INSERT INTO suelo (sueclase, suecolor, suetextura, sueph, suetipoanalisis, suetomamuestras, sueresultados, lotecultivadoid) VALUES 
                    ('${soil.sueclase}','${soil.suecolor}', '${soil.suetextura}', '${soil.sueph}', '${soil.suetipoanalisis}',
                    '${soil.suetomamuestras}', '${soil.sueresultados}', ${soil.lotecultivadoid})`;
        result = await pool.query(query);
    },

    async getAllSoils() {
        let query = `SELECT sueclase, suecolor, suetextura, sueph, 
                            suetipoanalisis, TO_CHAR(suetomamuestras, 'YYYY-MM-DD') as suetomamuestras, sueresultados, lotecultivadoid 
                        FROM suelo`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de suelos
    },

    async getSoil(id) {
        let query = `SELECT sueclase, suecolor, suetextura, sueph, 
                        suetipoanalisis, TO_CHAR(suetomamuestras, 'YYYY-MM-DD') as suetomamuestras, sueresultados, lotecultivadoid 
                    FROM suelo 
                    WHERE sueloid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve objeto de suelo
    },

    async updateSoil(id, soil) {
        let query = `UPDATE suelo SET sueclase = '${soil.sueclase}', suecolor = '${soil.suecolor}', suetextura = '${soil.suetextura}',
        sueph = '${soil.sueph}', suetipoanalisis = '${soil.suetipoanalisis}', suetomamuestras = '${soil.suetomamuestras}', 
        sueresultados = '${soil.sueresultados}', lotecultivadoid = ${soil.lotecultivadoid} 
        WHERE sueloid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si actualizó el suelo y 0 sino lo hizo.
    },

    async deleteSoil(id) {
        let query = `DELETE FROM suelo WHERE sueloid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si borró el suelo y 0 sino lo hizo.
    }
}