// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const asociacionDao = require('./asociacion.dao');

module.exports = {
    async obtenerAsociaciones(){
        return asociacionDao.obtenerAsociaciones();
    },

    async obtenerResponsable(){
        return asociacionDao.obtenerResponsable();
    },

    async crearAsociacion(asociacion){
        return asociacionDao.crearAsociacion(asociacion);
    },

    async actualizarAsociacion(id, asociacion){
        return asociacionDao.actualizarAsociacion(id, asociacion);
    },

    async eliminarAsociacion(id){
        return asociacionDao.eliminarAsociacion(id);
    },
}