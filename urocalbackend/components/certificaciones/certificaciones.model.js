// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const certificacionDao = require('./certificaciones.dao');

module.exports = {
    async obtenerCertificaciones(){
        return certificacionDao.obtenerCertificaciones();
    },

    async obtenerCertificacion(id){
        return certificacionDao.obtenerCertificacion(id);
    },

    async crearCertificacion(certificacion){
        return certificacionDao.crearCertificacion(certificacion);
    },

    async actualizarCertificacion(id, certificacion){
        return certificacionDao.actualizarCertificacion(id, certificacion);
    },

    async eliminarCertificacion(id){
        return certificacionDao.eliminarCertificacion(id);
    },
}