const guiaremisionDao = require('./guiaremision.dao');

module.exports = {
    async getGuiaRemisiones(){
        return guiaremisionDao.getGuiaRemisiones();
    },

    async getGuiaRemision(id){
        return guiaremisionDao.getGuiaRemision(id);
    },

    async createGuiaRemision(fertilizacion){
        return guiaremisionDao.createGuiaRemision(fertilizacion);
    },

    async updateGuiaRemision(id, fertilizacion){
        return guiaremisionDao.updateGuiaRemision(id, fertilizacion);
    },

    async deleteGuiaRemision(id){
        return guiaremisionDao.deleteGuiaRemision(id);
    },
}