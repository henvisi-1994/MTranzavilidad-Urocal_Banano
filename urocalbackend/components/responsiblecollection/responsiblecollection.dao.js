// Data Access Object
// Se comunica con la base de datos
const bcrypt = require('bcryptjs');
const pool = require('../../services/postgresql/index');

module.exports = {
    async createResponsiblecollection(responsiblecollection) {
        //responsableacopioid
        let query, result;

        // Validacion centro_acopio
        query = `SELECT responsableacopioid FROM responsableacopio WHERE responsableacopioid = '${responsiblecollection.responsableacopioid}'`;
        result = await pool.query(query);
        if (result.rowCount > 0) return { message: "Este id ya está siendo utilizado.", tipo: 'error' };
        // Registro en tabla responsableacopio
        query = `INSERT INTO responsableacopio
                    (responsableacopioid) VALUES 
                    ('${responsiblecollection.responsableacopioid}')
                    RETURNING responsableacopioid;`;
        result = await pool.query(query);
        return responsiblecollection;
    },

    async getResponsiblecollections() {
        let query = `SELECT * FROM responsableacopio`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los responsables de acopio
    },

    async getResponsiblecollection(id) {
        let query = `SELECT * FROM responsableacopio WHERE responsableacopioid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del responsable de acopio encontrado
    },

    async deleteResponsiblecollection(id) {
        query = `DELETE FROM responsableacopio WHERE responsableacopioid = '${id}'`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al usuario y 0 sino lo hizo.
    },

    async updateResponsiblecollection(id, responsiblecollection) {
        //centroacopioid, centroacopionombre, responsableacopioid
        let query = `UPDATE responsableacopio SET responsableacopioid = '${responsiblecollection.responsableacopioid}' WHERE responsableacopioid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al usuario y 0 sino lo hizo.
    },
}