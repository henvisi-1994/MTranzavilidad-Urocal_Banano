// Data Access Object
// Se comunica con la base de datos
//const bcrypt = require('bcryptjs');
const pool = require('../../services/postgresql/index');
//const { getUser, updatePasswd } = require('./users.model');

module.exports = {
    async createSeed(seed) {

        let query, result, hashedPassword, salt;

        // Registro en tabla CalidadSemilla * Ojo con el tipo booleano, SieSignosPlaga *
        query = `INSERT INTO calidadsemilla
                    (siecriterioaltura, siecriteriopeso, siesignosplaga, sieproductoaplicado, sieingredienteactivo, siedosishectarea, sietotalproducto, siemetodoaplicacion, siemaquinaria, siembraid) VALUES 
                    ('${seed.siecriterioaltura}','${seed.siecriteriopeso}','${seed.siesignosplaga}','${seed.sieproductoaplicado}','${seed.sieingredienteactivo}','${seed.siedosishectarea}', '${seed.sietotalproducto}', '${seed.siemetodoaplicacion}', '${seed.siemaquinaria}', '${seed.siembraid}')
                    RETURNING calidadsemillaid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return seed;
    },

    async getSeeds() {
        let query = `SELECT * FROM calidadsemilla`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los registros de calidad de semilla
    },

    async getSeed(id) {
        let query = `SELECT * FROM calidadsemilla WHERE calidadsemillaid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del registro encontrado
    },

    async deleteSeed(id) {
        //Borrado logico
        let query = `DELETE FROM calidadsemilla WHERE calidadsemillaid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró el registro y 0 sino lo hizo.
    },

    async updateSeed(id, seed) {
        let query = `UPDATE calidadsemilla SET siecriterioaltura = '${seed.siecriterioaltura}', siecriteriopeso = '${seed.siecriteriopeso}', 
        siesignosplaga = '${seed.siesignosplaga}', sieproductoaplicado = '${seed.sieproductoaplicado}', sieingredienteactivo = '${seed.sieingredienteactivo}', 
        siedosishectarea = '${seed.siedosishectarea}', sietotalproducto = '${seed.sietotalproducto}', siemetodoaplicacion = '${seed.siemetodoaplicacion}', 
        siemaquinaria = '${seed.siemaquinaria}', siembraid = '${seed.siembraid}' WHERE calidadsemillaid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al registro y 0 sino lo hizo.
    },

}