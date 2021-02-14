// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const egressDao = require('./egress.dao');

module.exports = {
    async createegress(egress) {

        console.log("esto tiene egress en egrees model", egress)
        return egressDao.createegress(egress);
    },

    async getAllegresss() {
        return egressDao.getAllegresss();
    },

    async getegress(id) {
        return egressDao.getegress(id);
    },

    async updateegress(id, egress) {
        return egressDao.updateegress(id, egress);
    },

    async deleteegress(id) {
        return egressDao.deleteegress(id);
    }
}