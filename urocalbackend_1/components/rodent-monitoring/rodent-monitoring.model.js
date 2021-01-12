// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const rodentMonitoringDao = require('./rodent-monitoring.dao');

module.exports = {
    async getRodentMonitorings(){
        return rodentMonitoringDao.getRodentMonitorings();
    },

    async getRodentMonitoring(id){
        return rodentMonitoringDao.getRodentMonitoring(id);
    },

    async createRodentMonitoring(rodentMonitoring){
        return rodentMonitoringDao.createRodentMonitoring(rodentMonitoring);
    },

    async updateRodentMonitoring(id, rodentMonitoring){
        return rodentMonitoringDao.updateRodentMonitoring(id, rodentMonitoring);
    },

    async deleteRodentMonitoring(id){
        return rodentMonitoringDao.deleteRodentMonitoring(id);
    },
}