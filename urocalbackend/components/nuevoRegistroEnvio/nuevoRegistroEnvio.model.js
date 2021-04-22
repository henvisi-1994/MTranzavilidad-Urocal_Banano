const nuevoRegistroEnvioDao = require('./nuevoRegistroEnvio.dao');

module.exports = {
    async getnuevoRegistroEnvios(){
        return nuevoRegistroEnvioDao.getnuevoRegistroEnvios();
    },

    async getnuevoRegistroEnvio(id){
        return nuevoRegistroEnvioDao.getnuevoRegistroEnvio(id);
    },
    async getDetalleEnvio(id){
        return nuevoRegistroEnvioDao.getDetalleEnvio(id);
    },

    async createnuevoRegistroEnvio(nuevoRegistroEnvio){
        return nuevoRegistroEnvioDao.createnuevoRegistroEnvio(nuevoRegistroEnvio);
    },

    async updatenuevoRegistroEnvio(id, nuevoRegistroEnvio){
        return nuevoRegistroEnvioDao.updatenuevoRegistroEnvio(id, nuevoRegistroEnvio);
    },

    async deletenuevoRegistroEnvio(id){
        return nuevoRegistroEnvioDao.deletenuevoRegistroEnvio(id);
    },
    async getTiposnuevoRegistroEnvio(){
        return nuevoRegistroEnvioDao.getTiposnuevoRegistroEnvio();
    },
    async getSeleccionDetalles(){
        return nuevoRegistroEnvioDao.getSeleccionDetalles();
    },
}