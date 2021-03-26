const fitosanitariosDao = require('./fitosanitarios.dao');

module.exports = {
    async getFitosanitarios(){
        return fitosanitariosDao.getFitosanitarios();
    },

    async getFitosanitario(id){
        return fitosanitariosDao.getFitosanitario(id);
    },

    async createFitosanitario(fitosanitario){
        return fitosanitariosDao.createFitosanitario(fitosanitario);
    },

    async updateFitosanitario(id, fitosanitario){
        return fitosanitariosDao.updateFitosanitario(id, fitosanitario);
    },

    async deleteFitosanitario(id){
        return fitosanitariosDao.deleteFitosanitario(id);
    },
}