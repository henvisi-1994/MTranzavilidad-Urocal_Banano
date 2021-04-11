const empresaDao = require('./empresa.dao');
module.exports = {
    async createempresa(empresa) {
        return empresaDao.createempresa(empresa);
    },

    async getAllempresas() {
        return empresaDao.getAllempresas();
    },

    async getempresa(id) {
        return empresaDao.getempresa(id);
    },

    async updateempresa(id, empresa) {
        return empresaDao.updateempresa(id, empresa);
    },

    async deleteempresa(id) {
        return empresaDao.deleteempresa(id);
    }
}