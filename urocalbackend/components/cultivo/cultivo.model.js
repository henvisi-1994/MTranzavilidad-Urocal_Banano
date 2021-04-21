// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const { eliminarCultivolotecultivadoid } = require('./cultivo.dao');
const cultivoDao = require('./cultivo.dao');

module.exports = {
    async crearCultivo(cultivo) {
        return cultivoDao.crearCultivo(cultivo);
    },

    async obtenerTodosCultivo() {
        return cultivoDao.obtenerTodosCultivo();
    },
    
    async obtenerTodosCultivoDetalles() {
        return cultivoDao.obtenerTodosCultivoDetalles();
    },

    async obtenerCultivoDetalles(id) {
        return cultivoDao.obtenerCultivoDetalles(id);
    },

    async obtenerCultivo(id) {
        return cultivoDao.obtenerCultivo(id);
    },

    async actualizarCultivo(id, cultivo) {        
        return cultivoDao.actualizarCultivo(id, cultivo);
    },

    async eliminarCultivo(id) {
        return cultivoDao.eliminarCultivo(id);
    },
    async eliminarCultivolotecultivadoid(id) {
        return cultivoDao.eliminarCultivolotecultivadoid(id);
    }
}