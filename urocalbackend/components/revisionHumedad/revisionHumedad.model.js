// Realiza llamadas a la base de datos
const revisionHumedadDao = require('./revisionHumedad.dao');

module.exports = {
    async getRevisionHumedadByAlmacenamientoID(almacenamientoid) {
        return revisionHumedadDao.getRevisionHumedadByAlmacenamientoID(almacenamientoid);
    },
    async getRevisionHumedads(id) {
        return revisionHumedadDao.getRevisionHumedads(id);
    },
    async deleteRevisionHumedad(id) {
        return revisionHumedadDao.deleteRevisionHumedad(id);
    },
    async createRevisionHumedad(revisionHumedad) {
        return revisionHumedadDao.createRevisionHumedad(revisionHumedad);
    },
    async updateRevisionHumedad(revisionHumedad) {
        return revisionHumedadDao.updateRevisionHumedad(revisionHumedad);
    },

}