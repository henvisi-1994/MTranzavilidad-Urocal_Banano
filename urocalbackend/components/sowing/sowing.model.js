// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos

const sowingDao = require('./sowing.dao');

module.exports = {
    async getSowings(){
        return sowingDao.getSowings();
    },

    /*async getSowings(page, limit){
        return sowingDao.getSowings(page, limit);
    },*/

    //SELECT PARA DETALLES
    async getDatosDetalleSowing(){
        return sowingDao.getDatosDetalleSowing();
    },

    async getSowing(id){
        return sowingDao.getSowing(id);
    },

    async createSowing(sowing){
        return sowingDao.createSowing(sowing);
    },

    async updateSowing(id, sowing){
        return sowingDao.updateSowing(id, sowing);
    },

    // DELETE: Elimina un registro
    async deleteSowing(id){
        return sowingDao.deleteSowing(id);
    },
}