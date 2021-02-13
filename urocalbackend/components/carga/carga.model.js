const cargaDao = require('./carga.dao');

module.exports = {
    async getCargas(id){
        return cargaDao.getCargas(id);
    },
}