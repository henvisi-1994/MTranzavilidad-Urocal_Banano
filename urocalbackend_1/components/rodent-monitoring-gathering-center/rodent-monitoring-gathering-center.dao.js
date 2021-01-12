// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async createRodentMonitoringGatheringCenter(rodentMonitoringGatheringCenter) {

        let query, result;

        // Registro en tabla monitoreo roedor centro acopio
        query = `INSERT INTO monitoreoroedor_centroacopio
                    (monitoreoroedorid, centroacopioid) VALUES 
                    ('${rodentMonitoringGatheringCenter.monitoreoroedorid}','${rodentMonitoringGatheringCenter.centroacopioid}')
                    RETURNING monitoreoroedorid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return rodentMonitoringGatheringCenter;
    },

    async getRodentMonitoringGatheringCenters() {
        let query = `SELECT * FROM monitoreoroedor_centroacopio`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene la tabla monitoreo roedor centro acopio
    },

    async getRodentMonitoringGatheringCenter(id) {
        let query = `SELECT * FROM monitoreoroedor_centroacopio WHERE monitoreoroedorid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del monitoreo roedor centro acopio encontrado
    },

    async deleteRodentMonitoringGatheringCenter(id) {
        //Borrado logico
        let query = `DELETE FROM monitoreoroedor_centroacopio WHERE monitoreoroedorid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al monitoreo roedor centro acopio y 0 sino lo hizo.
    },

    async updateRodentMonitoringGatheringCenter(id, rodentMonitoringGatheringCenter) {
        let query = `UPDATE monitoreoroedor_centroacopio SET monitoreoroedorid = '${rodentMonitoringGatheringCenter.monitoreoroedorid}', centroacopioid = '${rodentMonitoringGatheringCenter.centroacopioid}' WHERE monitoreoroedorid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al monitoreo roedor centro acopio y 0 sino lo hizo.
    }
}