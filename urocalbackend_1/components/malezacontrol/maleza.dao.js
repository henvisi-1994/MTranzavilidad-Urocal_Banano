// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');
//const { getUser, updatePasswd } = require('./users.model');

module.exports = {
    async createMaleza(maleza) {

        let query, result;

        // Registro en tabla ControlMaleza
        query = `INSERT INTO controlmaleza
                    (confecha, conhectareas, conmetodo, conoperario, cultivoid) VALUES 
                    ('${maleza.confecha}','${maleza.conhectareas}','${maleza.conmetodo}','${maleza.conoperario}','${maleza.cultivoid}')
                    RETURNING controlmalezaid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return maleza;
    },

    async getMaleza() {
        let query = `SELECT * FROM controlmaleza`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene todos los controles de maleza realizados
    },

    async getIdMaleza(id) {
        let query = `SELECT * FROM controlmaleza WHERE controlmalezaid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del control de maleza encontrado
    },

    async deleteMaleza(id) {
        //Borrado logico
        let query = `DELETE FROM controlmaleza WHERE controlmalezaid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró el control de maleza y 0 sino lo hizo.
    },

    async updateMaleza(id, maleza) {
        let query = `UPDATE controlmaleza SET confecha = '${maleza.confecha}', conhectareas = '${maleza.conhectareas}', 
        conmetodo = '${maleza.conmetodo}', conoperario = '${maleza.conoperario}', cultivoid = '${maleza.cultivoid}' 
        WHERE controlmalezaid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó el control de maleza y 0 sino lo hizo.
    },

}