// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const rodentMonitoringGatheringCenterDao = require('./rodent-monitoring-gathering-center.dao');

module.exports = {
    async getRodentMonitoringGatheringCenters(){
        return rodentMonitoringGatheringCenterDao.getRodentMonitoringGatheringCenters();
    },

    async getRodentMonitoringGatheringCenter(id){
        return rodentMonitoringGatheringCenterDao.getRodentMonitoringGatheringCenter(id);
    },

    async createRodentMonitoringGatheringCenter(rodentMonitoringGatheringCenter){
        return rodentMonitoringGatheringCenterDao.createRodentMonitoringGatheringCenter(rodentMonitoringGatheringCenter);
    },

    async updateRodentMonitoringGatheringCenter(id, rodentMonitoring){
        return rodentMonitoringGatheringCenterDao.updateRodentMonitoringGatheringCenter(id, rodentMonitoring);
    },

    async deleteRodentMonitoringGatheringCenter(id){
        return rodentMonitoringGatheringCenterDao.deleteRodentMonitoringGatheringCenter(id);
    },
}