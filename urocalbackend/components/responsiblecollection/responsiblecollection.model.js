// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
//const { updatePasswd } = require('./collectioncenter.controller');
const responsiblecollectionDao = require('./responsiblecollection.dao');

module.exports = {
    async getResponsiblecollections(){
        return responsiblecollectionDao.getResponsiblecollections();
    },

    async getResponsiblecollections(page, limit){
        return responsiblecollectionDao.getResponsiblecollections(page, limit);
    },

    async getResponsiblecollection(id){
        return responsiblecollectionDao.getResponsiblecollection(id);
    },

    async createResponsiblecollection(responsiblecollection){
        return responsiblecollectionDao.createResponsiblecollection(responsiblecollection);
    },

    async updateResponsiblecollection(id, responsiblecollection){
        return responsiblecollectionDao.updateResponsiblecollection(id, responsiblecollection);
    },

    async deleteResponsiblecollection(id){
        return responsiblecollectionDao.deleteResponsiblecollection(id);
    },
}