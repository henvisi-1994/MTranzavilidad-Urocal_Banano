// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async createRodentMonitoring(rodentMonitoring) {

        let query, result;

        // Registro en tabla monitoreo roedor
        query = `INSERT INTO monitoreoroedor
                    (monfechatrampeo, montipotrampa, monnumerotrampas, monceboutilizado, monroedoresmuertos, monaccionestomadas, monoperario, moninspector) VALUES 
                    ('${rodentMonitoring.monfechatrampeo}','${rodentMonitoring.montipotrampa}','${rodentMonitoring.monnumerotrampas}','${rodentMonitoring.monceboutilizado}','${rodentMonitoring.monroedoresmuertos}','${rodentMonitoring.monaccionestomadas}', '${rodentMonitoring.monoperario}', '${rodentMonitoring.moninspector}')
                    RETURNING monitoreoroedorid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return rodentMonitoring;
    },

    async getRodentMonitorings() {
        let query = `SELECT * FROM monitoreoroedor`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene la tabla monitoreo roedor
    },

    async getRodentMonitoring(id) {
        let query = `SELECT * FROM monitoreoroedor WHERE monitoreoroedorid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del monitoreo roedor encontrado
    },

    async deleteRodentMonitoring(id) {
        //Borrado logico
        let query = `DELETE FROM monitoreoroedor WHERE monitoreoroedorid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al monitoreo roedor y 0 sino lo hizo.
    },

    async updateRodentMonitoring(id, rodentMonitoring) {
        let query = `UPDATE monitoreoroedor SET monfechatrampeo = '${rodentMonitoring.monfechatrampeo}', montipotrampa = '${rodentMonitoring.montipotrampa}', 
        monnumerotrampas = '${rodentMonitoring.monnumerotrampas}', monceboutilizado = '${rodentMonitoring.monceboutilizado}', monroedoresmuertos = '${rodentMonitoring.monroedoresmuertos}', 
        monaccionestomadas = '${rodentMonitoring.monaccionestomadas}', monoperario = '${rodentMonitoring.monoperario}', moninspector = '${rodentMonitoring.moninspector}' WHERE monitoreoroedorid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al monitoreo roedor y 0 sino lo hizo.
    }
}