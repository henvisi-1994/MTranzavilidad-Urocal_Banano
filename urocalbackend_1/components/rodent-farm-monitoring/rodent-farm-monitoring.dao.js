// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async createRodentFarmMonitoring(rodentFarmMonitoring) {

        let query, result;

        // Registro en tabla monitoreo roedor finca
        query = `INSERT INTO monitoreoroedores_finca
                    (monitoreoroedorid, fincaid) VALUES 
                    ('${rodentFarmMonitoring.monitoreoroedorid}','${rodentFarmMonitoring.fincaid}')
                    RETURNING monitoreoroedorid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return rodentFarmMonitoring;
    },

    async getRodentFarmMonitorings() {
        let query = `SELECT * FROM monitoreoroedores_finca`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene la tabla monitoreo roedor finca
    },

    async getRodentFarmMonitoring(id) {
        let query = `SELECT * FROM monitoreoroedores_finca WHERE monitoreoroedorid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del monitoreo roedor finca encontrado
    },

    async deleteRodentFarmMonitoring(id) {
        //Borrado logico
        let query = `DELETE FROM monitoreoroedores_finca WHERE monitoreoroedorid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al monitoreo roedor finca y 0 sino lo hizo.
    },

    async updateRodentFarmMonitoring(id, rodentFarmMonitoring) {
        let query = `UPDATE monitoreoroedores_finca SET monitoreoroedorid = '${rodentFarmMonitoring.monitoreoroedorid}', fincaid = '${rodentFarmMonitoring.fincaid}' WHERE monitoreoroedorid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al monitoreo roedor finca y 0 sino lo hizo.
    }
}