// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const paisDao = require('./pais.dao');

module.exports = {
    async obtenerPaises(){
        return paisDao.obtenerPaises();
    },

    async obtenerPais(id){
        return paisDao.obtenerPais(id);
    },

    async crearPais(pais){
        return paisDao.crearPais(pais);
    },

    async actualizarPais(id, pais){
        return paisDao.actualizarPais(id, pais);
    },

    async eliminarPais(id){
        return paisDao.eliminarPais(id);
    },
}