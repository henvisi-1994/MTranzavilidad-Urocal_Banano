// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const vehiculoDao = require('./vehiculo.dao');

module.exports = {

    async obtenerTodosVehiculo() {
        return vehiculoDao.obtenerTodosVehiculo();
    },
    async obtenerVehiculoFinca(id){
        return vehiculoDao.obtenerVehiculoFinca(id);

    },
    async obtenerVehiculo(id){
        return vehiculoDao.obtenerVehiculo(id);
    },

    async createVehiculo(vehiculo){
        return vehiculoDao.createVehiculo(vehiculo);
    },

    async updateVehiculo(id, vehiculo){
        return vehiculoDao.updateVehiculo(id, vehiculo);
    },

    async deleteVehiculo(id){
        return vehiculoDao.deleteVehiculo(id);
    },


}