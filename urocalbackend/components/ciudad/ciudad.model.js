// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const ciudadDao = require('./ciudad.dao');

module.exports = {
    async obtenerCiudades(){
        return ciudadDao.obtenerCiudades();
    },

    async obtenerCiudad(id){
        return ciudadDao.obtenerCiudad(id);
    },

    async crearCiudad(ciudad){
        return ciudadDao.crearCiudad(ciudad);
    },

    async actualizarCiudad(id, ciudad){
        return ciudadDao.actualizarCiudad(id, ciudad);
    },

    async eliminarCiudad(id){
        return ciudadDao.eliminarCiudad(id);
    },
}