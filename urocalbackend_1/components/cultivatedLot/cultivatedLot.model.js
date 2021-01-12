// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const cultivatedLotDao = require('./cultivatedLot.dao');

module.exports = {
    async createCultivatedLot(cultivatedLot) {
        return cultivatedLotDao.createCultivatedLot(cultivatedLot);
    },

    async getAllCultivatedLot() {
        return cultivatedLotDao.getAllCultivatedLot();
    },

    async getCultivatedLot(id) {
        return cultivatedLotDao.getCultivatedLot(id);
    },

    async updateCultivateLot(id, cultivatedLot) {
        return cultivatedLotDao.updateCultivateLot(id, cultivatedLot);
    },

    async deleteCultivatedLot(id) {
        return cultivatedLotDao.deleteCultivatedLot(id);
    }
}