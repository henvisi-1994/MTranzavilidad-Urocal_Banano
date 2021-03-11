const fertilizacionesDao = require('./fertilizaciones.dao');

module.exports = {
    async getFertilizaciones(){
        return fertilizacionesDao.getFertilizaciones();
    },
 

    async getFertilizacion(id){
        return fertilizacionesDao.getFertilizacion(id);
    },

    async createFertilizacion(fertilizacion){
        return fertilizacionesDao.createFertilizacion(fertilizacion);
    },

    async updateFertilizacion(id, fertilizacion){
        return fertilizacionesDao.updateFertilizacion(id, fertilizacion);
    },

    async deleteFertilizacion(id){
        return fertilizacionesDao.deleteFertilizacion(id);
    },
}