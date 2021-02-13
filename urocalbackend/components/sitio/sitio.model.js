// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const sitioDao = require('./sitio.dao');

module.exports = {
    async obtenerSitios(){
        return sitioDao.obtenerSitios();
    },

    async obtenerSitio(id){
        return sitioDao.obtenerSitio(id);
    },

    async crearSitio(sitio){
        return sitioDao.crearSitio(sitio);
    },

    async actualizarSitio(id, sitio){
        return sitioDao.actualizarSitio(id, sitio);
    },

    async eliminarSitio(id){
        return sitioDao.eliminarSitio(id);
    },
}