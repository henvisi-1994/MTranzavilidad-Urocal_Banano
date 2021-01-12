// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const cleaningToolDao = require('./cleaning-tool.dao');

module.exports = {
    async getCleaningTools(){
        return cleaningToolDao.getCleaningTools();
    },

    async getCleaningTool(id){
        return cleaningToolDao.getCleaningTool(id);
    },

    async createCleaningTool(cleaningTool){
        return cleaningToolDao.createCleaningTool(cleaningTool);
    },

    async updateCleaningTool(id, cleaningTool){
        return cleaningToolDao.updateCleaningTool(id, cleaningTool);
    },

    async deleteCleaningTool(id){
        return cleaningToolDao.deleteCleaningTool(id);
    },
}