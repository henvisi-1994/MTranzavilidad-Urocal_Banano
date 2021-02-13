// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const { updatePasswd } = require('./users.controller');
const userDao = require('./users.dao');

module.exports = {
    async getUsers(){
        return userDao.getUsers();
    },

    async getUsers(page, limit){
        return userDao.getUsers(page, limit);
    },

    async getPersona(id){
        return userDao.getPersona(id);
    },
    
    async getUserByPk(id){
        return userDao.getUserByPk(id);
    },

    async createUser(user){
        return userDao.createUser(user);
    },

    async updateUser(id, user){
        return userDao.updateUser(id, user);
    },

    async updatePasswd(id, oldpasswd, newpasswd){
        return userDao.updatePasswd(id, oldpasswd, newpasswd);
    },

    // Esto está funcional pero no se lo implementará para los usuarios
    /*async deleteUser(id){
        return userDao.deleteUser(id);
    },*/
}