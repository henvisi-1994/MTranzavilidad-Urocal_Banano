// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const vehiculoDao = require('./vehiculo.dao');

module.exports = {

    async obtenerTodosVehiculo() {
        return vehiculoDao.obtenerTodosVehiculo();
    },
}