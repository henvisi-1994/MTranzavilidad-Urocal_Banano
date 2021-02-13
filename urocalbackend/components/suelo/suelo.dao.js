// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async crearSuelo(suelo) {
        // Registro en tabla suelo
        query = `INSERT INTO suelo (sueclase, suecolor, suetextura, sueph, suetipoanalisis, suetomamuestras, sueresultados, lotecultivadoid) VALUES 
                    ('${suelo.sueclase}','${suelo.suecolor}', '${suelo.suetextura}', '${suelo.sueph}', '${suelo.suetipoanalisis}',
                    '${suelo.suetomamuestras}', '${suelo.sueresultados}', ${suelo.lotecultivadoid})`;
        result = await pool.query(query);
    },

    async obtenerTodosSuelo() {
        let query = `SELECT sueloid, sueclase, suecolor, suetextura, sueph, 
                            suetipoanalisis, TO_CHAR(suetomamuestras, 'YYYY-MM-DD') as suetomamuestras, sueresultados, lotecultivadoid 
                        FROM suelo`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de suelos
    },

    async obtenerSuelo(id) {
        let query = `SELECT sueloid, sueclase, suecolor, suetextura, sueph, 
                        suetipoanalisis, TO_CHAR(suetomamuestras, 'YYYY-MM-DD') as suetomamuestras, sueresultados, lotecultivadoid 
                    FROM suelo 
                    WHERE lotecultivadoid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve objeto de suelo
    },

    async actualizarSuelo(id, suelo) {
        let query = `UPDATE suelo SET sueclase = '${suelo.sueclase}', suecolor = '${suelo.suecolor}', suetextura = '${suelo.suetextura}',
        sueph = '${suelo.sueph}', suetipoanalisis = '${suelo.suetipoanalisis}', suetomamuestras = '${suelo.suetomamuestras}', 
        sueresultados = '${suelo.sueresultados}'
        WHERE lotecultivadoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si actualizó el suelo y 0 sino lo hizo.
    },

    async eliminarSuelo(id) {
        let query = `DELETE FROM suelo WHERE lotecultivadoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si borró el suelo y 0 sino lo hizo.
    }
}