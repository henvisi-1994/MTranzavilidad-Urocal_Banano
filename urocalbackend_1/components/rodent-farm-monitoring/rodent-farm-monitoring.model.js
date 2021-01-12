// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const rodentFarmMonitoringDao = require('./rodent-farm-monitoring.dao');

module.exports = {
    async getRodentFarmMonitorings(){
        return rodentFarmMonitoringDao.getRodentFarmMonitorings();
    },

    async getRodentFarmMonitoring(id){
        return rodentFarmMonitoringDao.getRodentFarmMonitoring(id);
    },

    async createRodentFarmMonitoring(rodentFarmMonitoring){
        return rodentFarmMonitoringDao.createRodentFarmMonitoring(rodentFarmMonitoring);
    },

    async updateRodentFarmMonitoring(id, rodentFarmMonitoring){
        return rodentFarmMonitoringDao.updateRodentFarmMonitoring(id, rodentFarmMonitoring);
    },

    async deleteRodentFarmMonitoring(id){
        return rodentFarmMonitoringDao.deleteRodentFarmMonitoring(id);
    },
}