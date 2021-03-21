// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async obtenerTodosVehiculo() {
        let query = `SELECT * FROM vehiculo`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de productos
    },
    async obtenerVehiculoFinca(id) {
        let query = `SELECT *from vehiculo where fincaid='${id}'`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de productos
    },


    
}