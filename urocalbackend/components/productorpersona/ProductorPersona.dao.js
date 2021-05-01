const bcrypt = require('bcryptjs');
const pool = require('../../services/postgresql/index');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {


    // INSERT: Agrega un registro
    async crearProductor(user) {

        console.log(user);

        let query, result;

        query = `SELECT peremail FROM persona WHERE peremail = '${user.peremail}'`;                                 // Validacion email ya registrado
        result = await pool.query(query);
        if (result.rowCount > 0) return { message: "Este correo ya está siendo utilizado." };

        query = `SELECT percedula FROM persona WHERE percedula = '${user.percedula}'`;                              // Validacion cedula ya registrada
        result = await pool.query(query);
        if (result.rowCount > 0) return { message: "La cédula ingresada ya se encuentra registrada." };

        // Registro en tabla persona
        query = `INSERT INTO persona
                    (percedula, perapellidos, pernombres, pergenero, perfechanacimiento, perdireccion, pertelefono, perwhatsapp, peremail, ciudadnacimientoid) VALUES 
                    ('${user.percedula}','${user.perapellidos}','${user.pernombres}','${user.pergenero}','${user.perfechanacimiento}','${user.perdireccion}', '${user.pertelefono}', '${user.perwhatsapp}', '${user.peremail}', '${user.ciudadnacimientoid}')
                    RETURNING personaid;`;
        result = await pool.query(query);
        console.log(result);

        // Registro en tabla usuario
        query = `INSERT INTO productor (productorid, productoridioma) VALUES (${result.rows[0].personaid}, '${user.productoridioma}');`;
        result = await pool.query(query);

        return user;
    },


    // SELECT: Devuelve todos los registros
    async obtenerProductores() {
        let query = `SELECT p.personaid, p.percedula, p.perapellidos, p.pernombres, p.perdireccion, p.pertelefono, p.perwhatsapp, p.peremail, p.pergenero, p.perfechanacimiento, c.ciudadid, c.ciudadnombre, prod.productoridioma FROM persona p, ciudad c, productor prod WHERE p.ciudadnacimientoid = c.ciudadid AND p.personaid = prod.productorid;`;
        let result = await pool.query(query);
        return result.rows;                     // Devuelve el array de json
    },
    // SELECT: Devuelve todos los registros
    async obtenerProductor(id) {
        let query = `SELECT prod.productorid, p.personaid, p.percedula, p.perapellidos, p.pernombres, p.perdireccion, p.pertelefono, p.perwhatsapp, p.peremail, p.pergenero, p.perfechanacimiento, c.ciudadid, c.ciudadnombre, prod.productoridioma FROM persona p, ciudad c, productor prod WHERE prod.productorid= ${id} AND p.ciudadnacimientoid = c.ciudadid AND p.personaid = prod.productorid;`;
        let result = await pool.query(query);
        return result.rows;                     // Devuelve el array de json
    },


    // UPDATE: Actualiza un registro
    async actualizarProductor(id, user) {

        let query, result;

        query = `UPDATE persona SET pernombres = '${user.pernombres}', perapellidos = '${user.perapellidos}', 
        perdireccion = '${user.perdireccion}', pergenero = '${user.pergenero}', pertelefono = '${user.pertelefono}', 
        perwhatsapp = '${user.perwhatsapp}', peremail = '${user.peremail}', ciudadnacimientoid = '${user.ciudadnacimientoid}', 
        perfechanacimiento = '${user.perfechanacimiento}' WHERE personaid = '${id}'`;
        result = await pool.query(query);

        query = `UPDATE productor SET productoridioma = '${user.productoridioma}' WHERE productorid = '${id}'`;
        result = await pool.query(query);

        return result.rowCount;                 // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al usuario y 0 sino lo hizo.
    },


    // DELETE: Elimina un registro
    async eliminarProductor(id) {

        let query = `DELETE FROM productor WHERE productorid = '${id}'`;
        let result = await pool.query(query);

        query = `DELETE FROM persona WHERE personaid = '${id}'`;
        result = await pool.query(query);

        return result.rowCount;                 // Devuelve la cantidad de filas afectadas.
    },
}