// Data Access Object
// Se comunica con la base de datos
//const bcrypt = require('bcryptjs');
const pool = require('../../services/postgresql/index');
//const { getUser, updatePasswd } = require('./users.model');

module.exports = {
    async createSowing(sowing) {

        let query, result;

        // Registro en tabla Siembra
        query = `INSERT INTO siembra
                    (siefechacomprasemilla, sieproveedorsemilla, siefechasiembra, siecantidadplantas, siehectareas, sieoperario, cultivoid) VALUES 
                    ('${sowing.siefechacomprasemilla}','${sowing.sieproveedorsemilla}','${sowing.siefechasiembra}','${sowing.siecantidadplantas}','${sowing.siehectareas}','${sowing.sieoperario}', '${sowing.cultivoid}')
                    RETURNING siembraid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return sowing;
    },

    async getSowings() {
        let query = `SELECT * FROM siembra`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todas las Siembras registradas
    },

    async getSowing(id) {
        let query = `SELECT * FROM siembra WHERE siembraid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json de la Siembra encontrada
    },

    async deleteSowing(id) {
        //Borrado logico
        let query = `DELETE FROM siembra WHERE siembraid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró una Siembra y 0 sino lo hizo.
    },

    async updateSowing(id, sowing) {
        let query = `UPDATE siembra SET siefechacomprasemilla = '${sowing.siefechacomprasemilla}', sieproveedorsemilla = '${sowing.sieproveedorsemilla}', 
        siefechasiembra = '${sowing.siefechasiembra}', siecantidadplantas = '${sowing.siecantidadplantas}', siehectareas = '${sowing.siehectareas}', 
        sieoperario = '${sowing.sieoperario}', cultivoid = '${sowing.cultivoid}' WHERE siembraid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó una Siembra y 0 sino lo hizo.
    },

}