// Realiza llamadas a la base de datos
//const { createProbando } = require('./vehicle.dao');
const almacenamientoDao = require('./almacenamiento.dao');

module.exports = {
    async getAlmacenamiento(){
        return almacenamientoDao.getAlmacenamiento();
    },
    async getAlmacenamientos(id){
        return almacenamientoDao.getAlmacenamientos(id);
    },
    async deleteAlmacenamiento(id){
        return almacenamientoDao.deleteAlmacenamiento(id);
    },
    async createAlmacenamiento(almacenamiento){
        return almacenamientoDao.createAlmacenamiento(almacenamiento);
    },
    async updateAlmacenamiento(id, almacenamiento){
        return almacenamientoDao.updateAlmacenamiento(id, almacenamiento);
    },

}