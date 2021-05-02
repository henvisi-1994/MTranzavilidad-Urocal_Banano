// Data Access Object
// Se comunica con la base de datos
const bcrypt = require('bcryptjs');
const pool = require('../../services/postgresql/index');

module.exports = {
    async createCollectioncenter(collectioncenter) {
        //centroacopioid, centroacopionombre, responsableacopioid
        let query, result;

        /*
        // Validacion centro_acopio
        query = `SELECT centroacopioid FROM centroacopio WHERE centroacopioid = '${collectioncenter.centroacopioid}'`;
        result = await pool.query(query);
        if (result.rowCount > 0) return { message: "Este id ya está siendo utilizado.", tipo: 'error' };
        */
        // Registro en tabla centroacopio
        query = `INSERT INTO centroacopio
                    (centroacopionombre, responsableacopioid) VALUES 
                    ('${collectioncenter.centroacopionombre}','${collectioncenter.responsableacopioid}')
                    RETURNING centroacopioid;`;
        result = await pool.query(query);
        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return collectioncenter;
    },

    async getCollectioncenters() {
        let query = `SELECT * FROM centroacopio`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los usuarios
    },

    async getCollectioncenter(id) {
        let query = `SELECT * FROM centroacopio WHERE centroacopioid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del usuario encontrado
    },

    async deleteCollectioncenter(id) {
        query = `DELETE FROM centroacopio WHERE centroacopioid = '${id}'`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al usuario y 0 sino lo hizo.
    },

    async updateCollectioncenter(id, collectioncenter) {
        //centroacopioid, centroacopionombre, responsableacopioid
        let query = `UPDATE centroacopio SET centroacopionombre = '${collectioncenter.centroacopionombre}',
        responsableacopioid = '${collectioncenter.responsableacopioid}' WHERE centroacopioid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al usuario y 0 sino lo hizo.
    },
}