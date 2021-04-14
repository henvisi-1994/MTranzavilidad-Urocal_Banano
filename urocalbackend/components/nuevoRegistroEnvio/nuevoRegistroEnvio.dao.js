
const pool = require('../../services/postgresql/index');

module.exports = {
    async createnuevoRegistroEnvio(registroenvio) {
        // Registro en tabla RegistroEnvio
        query = `INSERT INTO registroenvio (regfecha, reglote, regdestino, regtipo, regorganico, regspp) VALUES 
                    ('${registroenvio.regfecha}','${registroenvio.reglote}',
                    '${registroenvio.regdestino}', '${registroenvio.regtipo}',
                    '${registroenvio.regorganico}', '${registroenvio.regspp}')`;
        result = await pool.query(query);
    },

    async getnuevoRegistroEnvios() {
        let query = `SELECT * FROM registroenvio`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de registro envios
    },

    async getnuevoRegistroEnvio(id) {
        let query = `SELECT * FROM registroenvio WHERE registroenvioid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve objeto de registro envios
    },

    async updatenuevoRegistroEnvio(id, registroenvio) {
        //console.log(id);
        //console.log(registroenvio);
        
        let query = `UPDATE registroenvio SET regfecha = '${registroenvio.regfecha}', reglote = '${registroenvio.reglote}', 
        regdestino = '${registroenvio.regdestino}', regtipo = '${registroenvio.regtipo}', 
        regorganico = '${registroenvio.regorganico}', regspp = '${registroenvio.regspp}'
        WHERE registroenvioid = ${id}`;
        let result = await pool.query(query);
        return result.rowCount; // Devuelve 1 si actualizó el registro envio y 0 sino lo hizo.

    },

    async deletenuevoRegistroEnvio(id) {
        let query = `DELETE FROM registroenvio WHERE registroenvioid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si borró el producto y 0 sino lo hizo.
    },

    async getTiposnuevoRegistroEnvio() {
        let query = `select distinct regtipo from registroenvio where regtipo is not null`;
        let result = await pool.query(query);
        // console.log(result.rows); // Devuelve el array de json que contiene a todos los usuarios

        // let query = `SELECT * FROM poda`;
        // let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los usuarios
    },

}