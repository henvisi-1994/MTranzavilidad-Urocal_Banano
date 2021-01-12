const riegoDao = require('./riegos.dao');

module.exports = {
    async getRiegos(){
        return riegoDao.getRiegos();
    },

    async getRiego(id){
        return riegoDao.getRiego(id);
    },

    async createRiego(riego){
        return riegoDao.createRiego(riego);
    },

    async updateRiego(id, riego){
        return riegoDao.updateRiego(id, riego);
    },

    async deleteRiego(id){
        return riegoDao.deleteRiego(id);
    },
}