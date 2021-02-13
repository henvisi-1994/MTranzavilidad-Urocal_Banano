// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
//const { updatePasswd } = require('./collectioncenter.controller');
const { createCollectioncenter } = require('./collectioncenter.dao');
const collectioncenterDao = require('./collectioncenter.dao');

module.exports = {
    async getCollectioncenters(){
        return collectioncenterDao.getCollectioncenters();
    },

    async getCollectioncenters(page, limit){
        return collectioncenterDao.getCollectioncenters(page, limit);
    },

    async getCollectioncenter(id){
        return collectioncenterDao.getCollectioncenter(id);
    },

    async createCollectioncenter(user){
        return collectioncenterDao.createCollectioncenter(user);
    },

    async updateUser(id, user){
        return collectioncenterDao.updateCollectioncenter(id, user);
    },

    async deleteCollectioncenter(id){
        return collectioncenterDao.deleteCollectioncenter(id);
    },
}