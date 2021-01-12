const podaDao = require('./podas.dao');

module.exports = {
    async getPodas(){
        return podaDao.getPodas();
    },

    async getPoda(id){
        return podaDao.getPoda(id);
    },

    async createPoda(poda){
        return podaDao.createPoda(poda);
    },

    async updatePoda(id, poda){
        return podaDao.updatePoda(id, poda);
    },

    async deletePoda(id){
        return podaDao.deletePoda(id);
    },
}