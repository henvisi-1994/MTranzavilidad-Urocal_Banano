// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
//const { updatePasswd } = require('./users.controller');
const seedDao = require('./seeds.dao');

module.exports = {
    async getSeeds(){
        return seedDao.getSeeds();
    },

    async getSeeds(page, limit){
        return seedDao.getSeeds(page, limit);
    },

    async getSeed(id){
        return seedDao.getSeed(id);
    },

    async createSeed(seed){
        return seedDao.createSeed(seed);
    },

    async updateSeed(id, seed){
        return seedDao.updateSeed(id, seed);
    },

    async deleteSeed(id){
        return seedDao.deleteSeed(id);
    },
}