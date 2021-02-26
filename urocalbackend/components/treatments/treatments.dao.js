// Data Access Object
// Se comunica con la base de datos
const bcrypt = require('bcryptjs');
const pool = require('../../services/postgresql/index');
const { updateTreatment } = require('./treatments.model');
//const { getUser, updatePasswd } = require('./users.model');

module.exports = {
    async createTreatment(treatment) {

        //traFechaInicioFermentacion, traFechaFinFermentacion, traTipoSecado, traFechaInicioSecado, traFechaFinSecado, traVolumenSeco, traConversion, traObservacion, traOperario 
        // Registro en tabla tratamiento
        query = `INSERT INTO tratamiento
                    (traFechaInicioFermentacion, traFechaFinFermentacion, traTipoSecado, traFechaInicioSecado, traFechaFinSecado, traVolumenSeco, traConversion, traObservacion, traOperario) VALUES 
                    ('${treatment.traFechaInicioFermentacion}','${treatment.traFechaFinFermentacion}','${treatment.traTipoSecado}','${treatment.traFechaInicioSecado}','${treatment.traFechaFinSecado}','${treatment.traVolumenSeco}', '${treatment.traConversion}', '${treatment.traObservacion}', '${treatment.traOperario}')
                    RETURNING tratamientoId;`;
        result = await pool.query(query);

               
        return treatment;
    },

    async getTreatments() {
        let query = `SELECT * FROM tratamiento`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los tratamientos
    },

    async getTreatment(id) {
        let query = `SELECT * FROM tratamiento WHERE tratamientoId = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del tratamiento encontrado
    },

    async deleteTreatment(id) {
        //Borrado logico
        query = `DELETE FROM tratamiento WHERE tratamientoid = '${id}'`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró el tratamiento y 0 sino lo hizo.
    },

    async updateTreatment(id, treatment) {
        //tratamientoid, trafechainiciofermentacion, trafechafinfermentacion, tratiposecado, 
        //trafechainiciosecado, trafechafinsecado, travolumenseco, traconversion, traobservacion, traoperario)
        let query = `UPDATE tratamiento SET traFechainiciofermentacion = '${treatment.trafechainiciofermentacion}',  trafechafinfermentacion = '${treatment.trafechafinfermentacion}', 
        tratiposecado = '${treatment.tratiposecado}', trafechainiciosecado = '${treatment.trafechainiciosecado}', trafechafinsecado = '${treatment.trafechafinsecado}', 
        travolumenseco = '${treatment.travolumenseco}', traconversion = '${treatment.traconversion}', traobservacion = '${treatment.traobservacion}', traoperario  = '${treatment.traoperario}'
        WHERE tratamientoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó y 0 sino lo hizo.
    }

}