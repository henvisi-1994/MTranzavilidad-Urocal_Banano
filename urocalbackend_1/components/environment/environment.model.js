// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const environmentDao = require('./environment.dao');

module.exports = {
    async createEnvironment(environment) {
        return environmentDao.createEnvironment(environment);
    },

    async getAllEnvironment() {
        return environmentDao.getAllEnvironment();
    },

    async getEnvironment(id) {
        return environmentDao.getEnvironment(id);
    },

    async updateEnvironment(id, environment) {
        return environmentDao.updateEnvironment(id, environment);
    },

    async deleteEnvironment(id) {
        return environmentDao.deleteEnvironment(id);
    }
}