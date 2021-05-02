// Data Access Object
// Se comunica con la base de datos
const bcrypt = require('bcryptjs');
const pool = require('../../services/postgresql/index');

module.exports = {
    async createResponsiblecollection(responsiblecollection) {
        //responsableacopioid
        let query, result;

        query = `SELECT peremail FROM persona WHERE peremail = '${responsiblecollection.peremail}'`;                                 // Validacion email ya registrado
        result = await pool.query(query);
        if (result.rowCount > 0) return { message: "Este correo ya está siendo utilizado."};
        
        query = `SELECT percedula FROM persona WHERE percedula = '${responsiblecollection.percedula}'`;                              // Validacion cedula ya registrada
        result = await pool.query(query);
        if (result.rowCount > 0) return { message: "La cédula ingresada ya se encuentra registrada."};

        // Registro en tabla persona
        query = `INSERT INTO persona
                    (percedula, perapellidos, pernombres, pergenero, perfechanacimiento, perdireccion, pertelefono, perwhatsapp, peremail, ciudadnacimientoid) VALUES 
                    ('${responsiblecollection.percedula}','${responsiblecollection.perapellidos}','${responsiblecollection.pernombres}','${responsiblecollection.pergenero}','${responsiblecollection.perfechanacimiento}','${responsiblecollection.perdireccion}', '${responsiblecollection.pertelefono}', '${responsiblecollection.perwhatsapp}', '${responsiblecollection.peremail}', '${responsiblecollection.ciudadnacimientoid}')
                    RETURNING personaid;`;
        result = await pool.query(query);
        let idpersona = result.rows[0].personaid;

        // Validacion centro_acopio
        query = `SELECT responsableacopioid FROM responsableacopio WHERE responsableacopioid = '${idpersona}'`;
        result = await pool.query(query);
        if (result.rowCount > 0) return { message: "Este id ya está siendo utilizado.", tipo: 'error' };

        // Registro en tabla responsableacopio
        query = `INSERT INTO responsableacopio
                    (responsableacopioid) VALUES 
                    (${idpersona})
                    RETURNING responsableacopioid;`;
        result = await pool.query(query);
        return responsiblecollection;
    },

    async getResponsiblecollections() {

        //let query = `SELECT * FROM responsableacopio`;
        let query = `SELECT r.responsableacopioid, concat(p.perapellidos, ' ' , p.pernombres) as responsable, p.personaid, p.percedula, p.perapellidos, p.pernombres, p.perdireccion, p.pertelefono, p.perwhatsapp, p.peremail, p.pergenero, p.perfechanacimiento, c.ciudadid, c.ciudadnombre FROM persona p, ciudad c, responsableacopio r WHERE p.ciudadnacimientoid = c.ciudadid AND p.personaid = r.responsableacopioid;`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los responsables de acopio
    },

    async getResponsiblecollection(id) {
        let query = `SELECT p.personaid, p.percedula, p.perapellidos, p.pernombres, p.perdireccion, p.pertelefono, p.perwhatsapp, p.peremail, p.pergenero, p.perfechanacimiento, c.ciudadid, c.ciudadnombre FROM persona p, ciudad c, responsableacopio r WHERE p.ciudadnacimientoid = c.ciudadid AND p.personaid = r.responsableacopioid AND responsableacopioid = ${id};`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del responsable de acopio encontrado
    },

    async deleteResponsiblecollection(id) {
        let query = `DELETE FROM responsableacopio WHERE responsableacopioid = '${id}'`;
        let result = await pool.query(query);

        query = `DELETE FROM persona WHERE personaid = '${id}'`;
        result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al usuario y 0 sino lo hizo.
    },

    async updateResponsiblecollection(id, responsiblecollection) {
        //centroacopioid, centroacopionombre, responsableacopioid
        /*
        let query = `UPDATE responsableacopio SET responsableacopioid = '${responsiblecollection.responsableacopioid}' WHERE responsableacopioid = ${id}`;
        */
       let query = `UPDATE persona SET pernombres = '${responsiblecollection.pernombres}', perapellidos = '${responsiblecollection.perapellidos}', 
        perdireccion = '${responsiblecollection.perdireccion}', pergenero = '${responsiblecollection.pergenero}', pertelefono = '${responsiblecollection.pertelefono}', 
        perwhatsapp = '${responsiblecollection.perwhatsapp}', peremail = '${responsiblecollection.peremail}', ciudadnacimientoid = '${responsiblecollection.ciudadnacimientoid}', 
        perfechanacimiento = '${responsiblecollection.perfechanacimiento}' WHERE personaid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al usuario y 0 sino lo hizo.
    },
}