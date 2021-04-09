// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async obtenerTodosVehiculo() {
        let query = `SELECT * FROM vehiculo inner join finca on finca.fincaid=vehiculo.fincaid`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de productos
    },
    async obtenerVehiculoFinca(id) {
        let query = `SELECT * FROM vehiculo inner join finca on finca.fincaid=vehiculo.fincaid where finca.fincaid='${id}'`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de productos
    },

    async obtenerVehiculo(id) {
        let query = `SELECT *from vehiculo where vehiculoid='${id}'`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de productos
    },

    async createVehiculo(vehiculo) {
        let query, result;
        query = `INSERT INTO vehiculo
                    (vehplaca, vehmarca, vehdescripcion, vehlona, vehcaseta, vehpuerta, fincaid) VALUES
                    ('${vehiculo.vehplaca}', '${vehiculo.vehmarca}','${vehiculo.vehdescripcion}','${vehiculo.vehlona}','${vehiculo.vehcaseta}','${vehiculo.vehpuerta}','${vehiculo.fincaid}') RETURNING vehiculoid;`
        
        result = await pool.query(query);
        
        return vehiculo;
    },

    async updateVehiculo(id, vehiculo) {
        let query = `UPDATE vehiculo SET vehplaca = '${vehiculo.vehplaca}', vehmarca = '${vehiculo.vehmarca}', vehdescripcion = '${vehiculo.vehdescripcion}', vehlona = '${vehiculo.vehlona}', vehcaseta = '${vehiculo.vehcaseta}', vehpuerta = '${vehiculo.vehpuerta}', fincaid = '${vehiculo.fincaid}' WHERE vehiculoid = ${id}`;
        console.log(query);
        let result = await pool.query(query);

        return result.rowCount;
    },
    
    async deleteVehiculo(id) {
        //Borrado logico
        let query = `DELETE FROM vehiculo WHERE vehiculoid = '${id}'`;
        let result = await pool.query(query);

        query = `DELETE FROM vehiculo WHERE vehiculoid = '${id}'`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al usuario y 0 sino lo hizo.
    },


    
}