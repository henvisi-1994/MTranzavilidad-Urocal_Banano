// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
//const { updatePasswd } = require('./users.controller');
const malezaDao = require('./maleza.dao');

module.exports = {

    // SELECT: Devuelve todos los registros
    async getMaleza(){
        return malezaDao.getMaleza();
    },

    /*async getMaleza(page, limit){
        return malezaDao.getMaleza(page, limit);
    },*/

    //SELECT PARA DETALLES
    async getDatosAdicionalesMaleza(){
        return malezaDao.getDatosAdicionalesMaleza();
    },

    async getIdMaleza(id){
        return malezaDao.getIdMaleza(id);
    },

    // INSERT: Agrega un registro
    async createMaleza(maleza){
        return malezaDao.createMaleza(maleza);
    },

    // UPDATE: Actualiza un registro
    async updateMaleza(id, maleza){
        return malezaDao.updateMaleza(id, maleza);
    },

    // DELETE: Elimina un registro
    async deleteMaleza(id){
        return malezaDao.deleteMaleza(id);
    },
}