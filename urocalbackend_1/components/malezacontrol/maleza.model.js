// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
//const { updatePasswd } = require('./users.controller');
const malezaDao = require('./maleza.dao');

module.exports = {
    async getMaleza(){
        return malezaDao.getMaleza();
    },

    async getMaleza(page, limit){
        return malezaDao.getMaleza(page, limit);
    },

    async getIdMaleza(id){
        return malezaDao.getIdMaleza(id);
    },

    async createMaleza(maleza){
        return malezaDao.createMaleza(maleza);
    },

    async updateMaleza(id, maleza){
        return malezaDao.updateMaleza(id, maleza);
    },

    async deleteMaleza(id){
        return malezaDao.deleteMaleza(id);
    },
}