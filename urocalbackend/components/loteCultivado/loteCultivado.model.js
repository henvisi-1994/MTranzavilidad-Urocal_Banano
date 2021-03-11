// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const loteCultivadoDao = require('./loteCultivado.dao');

module.exports = {
    async crearLoteCultivado(loteCultivado) {
        return loteCultivadoDao.crearLoteCultivado(loteCultivado);
    },

    async obtenerTodosLoteCultivado() {
        return loteCultivadoDao.obtenerTodosLoteCultivado();
    },

    async obtenerTodosLoteCultivadoDeFinca(id) {
        return loteCultivadoDao.obtenerTodosLoteCultivadoDeFinca(id);
    },

    async obtenerLoteCultivado(id) {
        return loteCultivadoDao.obtenerLoteCultivado(id);
    },

    async actualizarLoteCultivado(id, loteCultivado) {
        return loteCultivadoDao.actualizarLoteCultivado(id, loteCultivado);
    },

    async eliminarLoteCultivado(id) {
        return loteCultivadoDao.eliminarLoteCultivado(id);
    }
}