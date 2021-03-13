const limpiezaVDao = require('./limpiezaV.dao');

module.exports = {
    async getLimpiezasV(){
        return limpiezaVDao.getLimpiezasV();
    },

    async getLimpiezaV(id){
        return limpiezaVDao.getLimpiezaV(id);
    },

    async createLimpiezaV(limpiezaV){
        return limpiezaVDao.createLimpiezaV(limpiezaV);
    },

    async updateLimpiezaV(id, limpiezaV){
        return limpiezaVDao.updateLimpiezaV(id, limpiezaV);
    },

    async deleteLimpiezaV(id){
        return limpiezaVDao.deleteLimpiezaV(id);
    },
}