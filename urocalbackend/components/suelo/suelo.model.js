// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const sueloDao = require('./suelo.dao');

module.exports = {
    async crearSuelo(suelo) {
        return sueloDao.crearSuelo(suelo);
    },

    async obtenerTodosSuelo() {
        return sueloDao.obtenerTodosSuelo();
    },

    async obtenerSuelo(id) {
        return sueloDao.obtenerSuelo(id);
    },

    async actualizarSuelo(id, suelo) {
        return sueloDao.actualizarSuelo(id, suelo);
    },

    async eliminarSuelo(id) {
        return sueloDao.eliminarSuelo(id);
    }
}