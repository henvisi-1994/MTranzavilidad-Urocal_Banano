const bcrypt = require('bcryptjs');
const pool = require('../../services/postgresql/index');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {

    // SELECT: Devuelve un registro
    async obtenerProductor(id) {
        let query = `SELECT p.personaid, p.percedula, p.perapellidos, p.pernombres, p.perdireccion, p.pertelefono, p.perwhatsapp, p.peremail, p.pergenero, p.perfechanacimiento, 
                        extract(year from current_date) - extract(year from (SELECT TO_DATE(p.perfechanacimiento,'YYYY-MM-DD'))) AS edad, 
                        c.ciudadid, c.ciudadnombre, prod.productoridioma 
                        FROM persona p, ciudad c, productor prod 
                        WHERE p.personaid = ${id} AND  p.ciudadnacimientoid = c.ciudadid AND p.personaid = prod.productorid;`;
        let result = await pool.query(query);
        return result.rows;                     // Devuelve el array de json
    },

    // SELECT: Devuelve todos los registros
    async obtenerProductores() {
        let query = `SELECT p.personaid, p.percedula, p.perapellidos, p.pernombres, p.perdireccion, p.pertelefono, p.perwhatsapp, 
                        p.peremail, p.pergenero, p.perfechanacimiento, c.ciudadid, 
                        extract(year from current_date) - extract(year from (SELECT TO_DATE(p.perfechanacimiento,'YYYY-MM-DD'))) AS edad,
                        c.ciudadnombre, prod.productoridioma FROM persona p, ciudad c, productor prod 
                        WHERE p.ciudadnacimientoid = c.ciudadid AND p.personaid = prod.productorid;`;
        let result = await pool.query(query);
        return result.rows;                     // Devuelve el array de json
    },

    // SELECT: Devuelve todos los registros por genero masculino
    async obtenerProductoresMasculino() {
        let query = `SELECT p.personaid, p.percedula, p.perapellidos, p.pernombres, p.perdireccion, p.pertelefono, p.perwhatsapp, p.peremail, p.pergenero, p.perfechanacimiento, 
        extract(year from current_date) - extract(year from (SELECT TO_DATE(p.perfechanacimiento,'YYYY-MM-DD'))) AS edad, 
        c.ciudadid, c.ciudadnombre, prod.productoridioma 
        FROM persona p, ciudad c, productor prod 
        WHERE p.pergenero = 'Masculino' AND  p.ciudadnacimientoid = c.ciudadid AND p.personaid = prod.productorid;`;
        let result = await pool.query(query);
        return result.rows;                     // Devuelve el array de json
    },

    // SELECT: Devuelve todos los registros por genero femenino
    async obtenerProductoresFemenino() {
        let query = `SELECT p.personaid, p.percedula, p.perapellidos, p.pernombres, p.perdireccion, p.pertelefono, p.perwhatsapp, p.peremail, p.pergenero, p.perfechanacimiento, 
        extract(year from current_date) - extract(year from (SELECT TO_DATE(p.perfechanacimiento,'YYYY-MM-DD'))) AS edad, 
        c.ciudadid, c.ciudadnombre, prod.productoridioma 
        FROM persona p, ciudad c, productor prod 
        WHERE p.pergenero = 'Femenino' AND  p.ciudadnacimientoid = c.ciudadid AND p.personaid = prod.productorid;`;
        let result = await pool.query(query);
        return result.rows;                     // Devuelve el array de json
    },

    /*
    // SELECT: Devuelve un registro
    async obtenerProductor(id) {
        let query = `SELECT p.personaid, p.percedula, p.perapellidos, p.pernombres, p.perdireccion, p.pertelefono, p.perwhatsapp, p.peremail, p.pergenero, p.perfechanacimiento, 
                        extract(year from current_date) - extract(year from (SELECT TO_DATE(p.perfechanacimiento,'DD/MM/YYYY'))) AS edad, 
                        c.ciudadid, c.ciudadnombre, prod.productoridioma 
                        FROM persona p, ciudad c, productor prod 
                        WHERE p.personaid = ${id} AND  p.ciudadnacimientoid = c.ciudadid AND p.personaid = prod.productorid;`;
        let result = await pool.query(query);
        return result.rows;                     // Devuelve el array de json
    },

    // SELECT: Devuelve todos los registros
    async obtenerProductores() {
        let query = `SELECT p.personaid, p.percedula, p.perapellidos, p.pernombres, p.perdireccion, p.pertelefono, p.perwhatsapp, 
                        p.peremail, p.pergenero, p.perfechanacimiento, c.ciudadid, 
                        extract(year from current_date) - extract(year from (SELECT TO_DATE(p.perfechanacimiento,'DD/MM/YYYY'))) AS edad,
                        c.ciudadnombre, prod.productoridioma FROM persona p, ciudad c, productor prod 
                        WHERE p.ciudadnacimientoid = c.ciudadid AND p.personaid = prod.productorid;`;
        let result = await pool.query(query);
        return result.rows;                     // Devuelve el array de json
    },

    // SELECT: Devuelve todos los registros por genero masculino
    async obtenerProductoresMasculino() {
        let query = `SELECT p.personaid, p.percedula, p.perapellidos, p.pernombres, p.perdireccion, p.pertelefono, p.perwhatsapp, p.peremail, p.pergenero, p.perfechanacimiento, 
        extract(year from current_date) - extract(year from (SELECT TO_DATE(p.perfechanacimiento,'DD/MM/YYYY'))) AS edad, 
        c.ciudadid, c.ciudadnombre, prod.productoridioma 
        FROM persona p, ciudad c, productor prod 
        WHERE p.pergenero = 'Masculino' AND  p.ciudadnacimientoid = c.ciudadid AND p.personaid = prod.productorid;`;
        let result = await pool.query(query);
        return result.rows;                     // Devuelve el array de json
    },

    // SELECT: Devuelve todos los registros por genero femenino
    async obtenerProductoresFemenino() {
        let query = `SELECT p.personaid, p.percedula, p.perapellidos, p.pernombres, p.perdireccion, p.pertelefono, p.perwhatsapp, p.peremail, p.pergenero, p.perfechanacimiento, 
        extract(year from current_date) - extract(year from (SELECT TO_DATE(p.perfechanacimiento,'DD/MM/YYYY'))) AS edad, 
        c.ciudadid, c.ciudadnombre, prod.productoridioma 
        FROM persona p, ciudad c, productor prod 
        WHERE p.pergenero = 'Femenino' AND  p.ciudadnacimientoid = c.ciudadid AND p.personaid = prod.productorid;`;
        let result = await pool.query(query);
        return result.rows;                     // Devuelve el array de json
    },
    */
}