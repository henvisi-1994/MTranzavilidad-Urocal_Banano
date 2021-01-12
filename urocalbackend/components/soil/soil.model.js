// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const soilDao = require('./soil.dao');

module.exports = {
    async createSoil(soil) {
        return soilDao.createSoil(soil);
    },

    async getAllSoils() {
        return soilDao.getAllSoils();
    },

    async getSoil(id) {
        return soilDao.getSoil(id);
    },

    async updateSoil(id, soil) {
        return soilDao.updateSoil(id, soil);
    },

    async deleteSoil(id) {
        return soilDao.deleteSoil(id);
    }
}