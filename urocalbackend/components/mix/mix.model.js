// Realiza llamadas a la base de datos
const mixDao = require('./mix.dao');

module.exports = {
    async getMix() {
        return mixDao.getMix();
    },
    async getMixs(id) {
        return mixDao.getMixs(id);
    },

    async deleteMix(id) {
        return mixDao.deleteMix(id);
    },
    
    async createMix(mix) {
        return mixDao.createMix(mix);
    },
    async updateMix(id, mix) {
        return mixDao.updateMix(id, mix);
    },

}