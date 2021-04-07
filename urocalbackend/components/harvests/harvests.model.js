// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
//const { updatePasswd } = require('./users.controller');
const harvestDao = require('./harvests.dao');

module.exports = {
    async getHarvests() {
        return harvestDao.getHarvests();
    },

    async obtenerCosechasSinDetalleCompra() {
        return harvestDao.obtenerCosechasSinDetalleCompra();
    },

    async obtenerCosechasConDetalleCompra() {
        return harvestDao.obtenerCosechasConDetalleCompra();
    },

    async getHarvests(page, limit) {
        return harvestDao.getHarvests(page, limit);
    },

    async getHarvest(id) {
        return harvestDao.getHarvest(id);
    },

    async createHarvest(harvest) {
        return harvestDao.createHarvest(harvest);
    },

    async updateHarvest(id, harvest) {
        return harvestDao.updateHarvest(id, harvest);
    },

    async deleteHarvest(id) {
        
        return harvestDao.deleteHarvest(id);
    },
}