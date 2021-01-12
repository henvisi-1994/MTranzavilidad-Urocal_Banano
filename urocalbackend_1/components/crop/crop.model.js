// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const cropDao = require('./crop.dao');

module.exports = {
    async createCrop(crop) {
        return cropDao.createCrop(crop);
    },

    async getAllCrops() {
        return cropDao.getAllCrops();
    },

    async getCrop(id) {
        return cropDao.getCrop(id);
    },

    async updateCrop(id, crop) {
        return cropDao.updateCrop(id, crop);
    },

    async deleteCrop(id) {
        return cropDao.deleteCrop(id);
    }
}