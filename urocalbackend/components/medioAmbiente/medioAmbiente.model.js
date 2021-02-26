// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const medioAmbienteDao = require('./medioAmbiente.dao');

module.exports = {
    async crearMedioAmbiente(medioAmbiente) {
        return medioAmbienteDao.crearMedioAmbiente(medioAmbiente);
    },

    async obtenerTodosMedioAmbiente() {
        return medioAmbienteDao.obtenerTodosMedioAmbiente();
    },

    async obtenerMedioAmbiente(id) {
        return medioAmbienteDao.obtenerMedioAmbiente(id);
    },

    async actualizarMedioAmbiente(id, medioAmbiente) {
        return medioAmbienteDao.actualizarMedioAmbiente(id, medioAmbiente);
    },

    async eliminarMedioAmbiente(id) {
        return medioAmbienteDao.eliminarMedioAmbiente(id);
    }
}