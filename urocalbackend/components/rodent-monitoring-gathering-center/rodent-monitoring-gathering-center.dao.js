// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async createRodentMonitoringGatheringCenter(rodentMonitoringGatheringCenter) {

        let query, result;

        // Registro en tabla monitoreo roedor
        query = `INSERT INTO monitoreoroedor
                (monfechatrampeo, montipotrampa, monnumerotrampas, monceboutilizado, monroedoresmuertos, monaccionestomadas, monoperario, moninspector) VALUES 
                ('${rodentMonitoringGatheringCenter.monfechatrampeo}','${rodentMonitoringGatheringCenter.montipotrampa}','${rodentMonitoringGatheringCenter.monnumerotrampas}','${rodentMonitoringGatheringCenter.monceboutilizado}','${rodentMonitoringGatheringCenter.monroedoresmuertos}','${rodentMonitoringGatheringCenter.monaccionestomadas}', '${rodentMonitoringGatheringCenter.monoperario}', '${rodentMonitoringGatheringCenter.moninspector}')
                RETURNING monitoreoroedorid;`;
        result = await pool.query(query);

        // Registro en tabla monitoreo roedor centro acopio
        query = `INSERT INTO monitoreoroedor_centroacopio
                    (monitoreoroedorid, centroacopioid) VALUES 
                    ('${result.rows[0].monitoreoroedorid}','${rodentMonitoringGatheringCenter.centroacopioid}')
                    RETURNING monitoreoroedorid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return rodentMonitoringGatheringCenter;
    },

    async getRodentMonitoringGatheringCenters() {
        let query = `SELECT mr.monitoreoroedorid, TO_CHAR(mr.monfechatrampeo, 'YYYY-MM-DD') as monfechatrampeo, mr.montipotrampa, mr.monnumerotrampas, mr.monceboutilizado, mr.monroedoresmuertos,
        mr.monaccionestomadas, mr.monoperario, mr.moninspector, mrca.centroacopioid, ca.centroacopionombre FROM monitoreoroedor_centroacopio mrca, monitoreoroedor mr, centroacopio ca WHERE
        mrca.monitoreoroedorid = mr.monitoreoroedorid AND mrca.centroacopioid = ca.centroacopioid`;
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

        query = `DELETE FROM monitoreoroedor WHERE monitoreoroedorid = '${id}'`;
        result = await pool.query(query);
        
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al monitoreo roedor centro acopio y 0 sino lo hizo.
    },

    async updateRodentMonitoringGatheringCenter(id, rodentMonitoringGatheringCenter) {

        let query = `UPDATE monitoreoroedor SET monfechatrampeo = '${rodentMonitoringGatheringCenter.monfechatrampeo}', montipotrampa = '${rodentMonitoringGatheringCenter.montipotrampa}', 
        monnumerotrampas = '${rodentMonitoringGatheringCenter.monnumerotrampas}', monceboutilizado = '${rodentMonitoringGatheringCenter.monceboutilizado}', monroedoresmuertos = '${rodentMonitoringGatheringCenter.monroedoresmuertos}', 
        monaccionestomadas = '${rodentMonitoringGatheringCenter.monaccionestomadas}', monoperario = '${rodentMonitoringGatheringCenter.monoperario}', moninspector = '${rodentMonitoringGatheringCenter.moninspector}' WHERE monitoreoroedorid = ${id}`;
        let result = await pool.query(query);

        query = `UPDATE monitoreoroedor_centroacopio SET  centroacopioid = '${rodentMonitoringGatheringCenter.centroacopioid}' WHERE monitoreoroedorid = ${id}`;
        result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al monitoreo roedor centro acopio y 0 sino lo hizo.
    }
}