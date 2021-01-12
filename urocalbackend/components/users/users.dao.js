// Data Access Object
// Se comunica con la base de datos
const bcrypt = require('bcryptjs');
const pool = require('../../services/postgresql/index');
//const { getUser, updatePasswd } = require('./users.model');

module.exports = {
    async createUser(user) {

        let query, result, hashedPassword, salt;
        const temporal = user.percedula.substring(0, 5);

        // Validacion email ya registrado
        query = `SELECT peremail FROM persona WHERE peremail = '${user.peremail}'`;
        result = await pool.query(query);
        if (result.rowCount > 0) return { message: "Este correo ya está siendo utilizado.", tipo: 'error' };

        // Validacion cedula ya registrada
        query = `SELECT percedula FROM persona WHERE percedula = '${user.percedula}'`;
        result = await pool.query(query);
        if (result.rowCount > 0) return { message: "La cédula ingresada ya se encuentra registrada.", tipo: 'error' };

        // Registro en tabla persona
        query = `INSERT INTO persona
                    (percedula, perapellidos, pernombres, pergenero, perfechanacimiento, perdireccion, pertelefono, perwhatsapp, peremail, ciudadnacimientoid) VALUES 
                    ('${user.percedula}','${user.perapellidos}','${user.pernombres}','${user.pergenero}','${user.perfechanacimiento}','${user.perdireccion}', '${user.pertelefono}', '${user.perwhatsapp}', '${user.peremail}', '${user.ciudadnacimientoid}')
                    RETURNING personaid;`;
        result = await pool.query(query);

        // Cifrar clave temporal
        salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hashSync(temporal, salt);

        // Registro en tabla usuario
        query = `INSERT INTO usuario (personaid, usuclave, usutipo, usuactivo) VALUES 
                    ('${result.rows[0].personaid}','${hashedPassword}','${user.usutipo}', false)
                    RETURNING personaid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return user;
    },

    async getUsers() {
        let query = `SELECT * FROM persona`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los usuarios
    },

    async getPersona(id) {
        let query = `SELECT * FROM persona WHERE personaid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del usuario encontrado
    },

    async getUserByPk(id) {
        let query = `SELECT * FROM usuario WHERE personaid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del usuario encontrado
    },

    async deleteUser(id) {
        //Borrado logico
        let query = `DELETE FROM usuario WHERE personaid = '${id}'`;
        let result = await pool.query(query);

        query = `DELETE FROM persona WHERE personaid = '${id}'`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al usuario y 0 sino lo hizo.
    },

    async updateUser(id, user) {
        let query = `UPDATE persona SET pernombres = '${user.pernombres}', perapellidos = '${user.perapellidos}', 
        perdireccion = '${user.perdireccion}', pergenero = '${user.pergenero}', pertelefono = '${user.pertelefono}', 
        perwhatsapp = '${user.perwhatsapp}', peremail = '${user.peremail}', ciudadnacimientoid = '${user.ciudadnacimientoid}', 
        perfechanacimiento = '${user.perfechanacimiento}' WHERE personaid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al usuario y 0 sino lo hizo.
    },

    async updatePasswd(id, oldpasswd, newpasswd) {
        let query = `SELECT usuclave FROM usuario WHERE personaid = ${id}`;
        let result = await pool.query(query);
        console.log(result)
        if (result.rowCount == 0) return false;

        let validatePassword = await bcrypt.compareSync(oldpasswd, result.rows[0].usuclave);
        // Si no son iguales
        if (!validatePassword) return false;

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hashSync(newpasswd, salt);

        query = `UPDATE usuario SET usuclave = '${hashedPassword}' WHERE personaid = ${id}`;
        await pool.query(query);
        return true;
    }
}