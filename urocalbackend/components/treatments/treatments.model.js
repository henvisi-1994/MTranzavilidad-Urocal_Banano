// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos

const { deleteTreatment } = require('./treatments.controller');
const treatmentDao = require('./treatments.dao');

module.exports = {
    async getTreatments(){
        return treatmentDao.getTreatments();
    },

    async getTreatments(page, limit){
        return treatmentDao.getTreatments(page, limit);
    },
    async getDetalleTreatment(id){
        return treatmentDao.getDetalleTreatment(id);
    },
    async getTreatment(id){
        return treatmentDao.getTreatment(id);
    },

    async createTreatment(treatment){
        return treatmentDao.createTreatment(treatment);
    },

    async updateTreatment(id, treatment){
        return treatmentDao.updateTreatment(id, treatment);
    },

    async deleteTreatment(id){
        return treatmentDao.deleteTreatment(id);
    },
    async deleteDetalleTreatment(id){
        return treatmentDao.deleteDetalleTreatment(id);
    },
}