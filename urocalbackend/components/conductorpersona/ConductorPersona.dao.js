const bcrypt = require('bcryptjs');
const pool = require('../../services/postgresql/index');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {


    // INSERT: Agrega un registro
    async crearConductor(user) {

        let query, result;

        query = `SELECT peremail FROM persona WHERE peremail = '${user.peremail}'`;                                 // Validacion email ya registrado
        result = await pool.query(query);
        if (result.rowCount > 0) return { message: "Este correo ya está siendo utilizado.", tipo: 'error' };
        
        query = `SELECT percedula FROM persona WHERE percedula = '${user.percedula}'`;                              // Validacion cedula ya registrada
        result = await pool.query(query);
        if (result.rowCount > 0) return { message: "La cédula ingresada ya se encuentra registrada.", tipo: 'error' };

        // Registro en tabla persona
        query = `INSERT INTO persona
                    (percedula, perapellidos, pernombres, pergenero, perfechanacimiento, perdireccion, pertelefono, perwhatsapp, peremail, ciudadnacimientoid) VALUES 
                    ('${user.percedula}','${user.perapellidos}','${user.pernombres}','${user.pergenero}','${user.perfechanacimiento}','${user.perdireccion}', '${user.pertelefono}', '${user.perwhatsapp}', '${user.peremail}', '${user.ciudadnacimientoid}')
                    RETURNING personaid;`;
        result = await pool.query(query);

        // Registro en tabla usuario
        query = `INSERT INTO conductor (conductorid, conductorlicencia) VALUES 
                    (${result.rows[0].personaid}, ${user.conductorlicencia});`;
        result = await pool.query(query);

        return user;
    },


    // SELECT: Devuelve todos los registros
    async obtenerConductores() {
        let query = `SELECT p.personaid, p.percedula, p.perapellidos, p.pernombres, p.perdireccion, p.pertelefono, p.perwhatsapp, p.peremail, p.pergenero, p.perfechanacimiento, c.ciudadid, c.ciudadnombre, con.conductorlicencia FROM persona p, ciudad c, conductor con WHERE p.ciudadnacimientoid = c.ciudadid AND p.personaid = con.conductorid;`;
        let result = await pool.query(query);
        return result.rows;                     // Devuelve el array de json
    },


    // UPDATE: Actualiza un registro
    async actualizarConductor(id, user) {
        console.log("Dentro de actualizar id: " + id);
        console.log(user);
        let query = `UPDATE persona SET pernombres = '${user.pernombres}', perapellidos = '${user.perapellidos}', 
        perdireccion = '${user.perdireccion}', pergenero = '${user.pergenero}', pertelefono = '${user.pertelefono}', 
        perwhatsapp = '${user.perwhatsapp}', peremail = '${user.peremail}', ciudadnacimientoid = '${user.ciudadnacimientoid}', 
        perfechanacimiento = '${user.perfechanacimiento}' WHERE personaid = '${id}'`;
        let result = await pool.query(query);

        query = `UPDATE conductor SET conductorlicencia = ${user.conductorlicencia} WHERE conductorid = '${id}'`;
        result = await pool.query(query);

        return result.rowCount;                 // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al usuario y 0 sino lo hizo.
    },


    // DELETE: Elimina un registro
    async eliminarConductor(id) {

        let query = `DELETE FROM conductor WHERE conductorid = '${id}'`;
        let result = await pool.query(query);
        
        query = `DELETE FROM persona WHERE personaid = '${id}'`;
        result = await pool.query(query);

        return result.rowCount;                 // Devuelve la cantidad de filas afectadas.
    },
}