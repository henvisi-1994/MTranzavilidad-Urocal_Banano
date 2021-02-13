// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const provinciaDao = require('./provincia.dao');

module.exports = {
    async obtenerProvincias(){
        return provinciaDao.obtenerProvincias();
    },

    async obtenerProvincia(id){
        return provinciaDao.obtenerProvincia(id);
    },

    async crearProvincia(provincia){
        return provinciaDao.crearProvincia(provincia);
    },

    async actualizarProvincia(id, provincia){
        return provinciaDao.actualizarProvincia(id, provincia);
    },

    async eliminarProvincia(id){
        return provinciaDao.eliminarProvincia(id);
    },
}