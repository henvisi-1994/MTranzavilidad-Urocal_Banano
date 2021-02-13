// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async createRodentFarmMonitoring(rodentFarmMonitoring) {

        let query, result;

        // Registro en tabla monitoreo roedor
        query = `INSERT INTO monitoreoroedor
                (monfechatrampeo, montipotrampa, monnumerotrampas, monceboutilizado, monroedoresmuertos, monaccionestomadas, monoperario, moninspector) VALUES 
                ('${rodentFarmMonitoring.monfechatrampeo}','${rodentFarmMonitoring.montipotrampa}','${rodentFarmMonitoring.monnumerotrampas}','${rodentFarmMonitoring.monceboutilizado}','${rodentFarmMonitoring.monroedoresmuertos}','${rodentFarmMonitoring.monaccionestomadas}', '${rodentFarmMonitoring.monoperario}', '${rodentFarmMonitoring.moninspector}')
                RETURNING monitoreoroedorid;`;
        result = await pool.query(query);

        // Registro en tabla monitoreo roedor finca
        query = `INSERT INTO monitoreoroedores_finca
                    (monitoreoroedorid, fincaid) VALUES 
                    ('${result.rows[0].monitoreoroedorid}','${rodentFarmMonitoring.fincaid}')
                    RETURNING monitoreoroedorid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return rodentFarmMonitoring;
    },

    async getRodentFarmMonitorings() {
        let query = `SELECT mr.monitoreoroedorid, TO_CHAR(mr.monfechatrampeo, 'YYYY-MM-DD') as monfechatrampeo, mr.montipotrampa, mr.monnumerotrampas, mr.monceboutilizado, mr.monroedoresmuertos,
        mr.monaccionestomadas, mr.monoperario, mr.moninspector, mrf.fincaid, f.finnombrefinca FROM monitoreoroedores_finca mrf, monitoreoroedor mr, finca f WHERE
        mrf.monitoreoroedorid = mr.monitoreoroedorid AND mrf.fincaid = f.fincaid`;
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

        query = `DELETE FROM monitoreoroedor WHERE monitoreoroedorid = '${id}'`;
        result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al monitoreo roedor finca y 0 sino lo hizo.
    },

    async updateRodentFarmMonitoring(id, rodentFarmMonitoring) {

        let query = `UPDATE monitoreoroedor SET monfechatrampeo = '${rodentFarmMonitoring.monfechatrampeo}', montipotrampa = '${rodentFarmMonitoring.montipotrampa}', 
        monnumerotrampas = '${rodentFarmMonitoring.monnumerotrampas}', monceboutilizado = '${rodentFarmMonitoring.monceboutilizado}', monroedoresmuertos = '${rodentFarmMonitoring.monroedoresmuertos}', 
        monaccionestomadas = '${rodentFarmMonitoring.monaccionestomadas}', monoperario = '${rodentFarmMonitoring.monoperario}', moninspector = '${rodentFarmMonitoring.moninspector}' WHERE monitoreoroedorid = ${id}`;
        let result = await pool.query(query);

         query = `UPDATE monitoreoroedores_finca SET  fincaid = '${rodentFarmMonitoring.fincaid}' WHERE monitoreoroedorid = ${id}`;
         result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al monitoreo roedor finca y 0 sino lo hizo.
    }
}