// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const incomeDao = require('./income.dao');

module.exports = {
    async createincome(income) {
        return incomeDao.createincome(income);
    },

    async getAllincomes() {
        return incomeDao.getAllincomes();
    },

    async getincome(id) {
        return incomeDao.getincome(id);
    },

    async updateincome(id, income) {
        return incomeDao.updateincome(id, income);
    },

    async deleteincome(id) {
        return incomeDao.deleteincome(id);
    }
}