// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async createEnvironment(environment) {
        // Registro en tabla medioambiente
        query = `INSERT INTO medioambiente (medtemperaturapromedio, medaltitud, medtopografia, medhumedadrelativa, medpluviosidad, medotros, 
                                                medtomamuestra, lotecultivadoid) VALUES 
                    (${environment.medtemperaturapromedio},${environment.medaltitud}, '${environment.medtopografia}', 
                    ${environment.medhumedadrelativa}, '${environment.medpluviosidad}', '${environment.medotros}', 
                    '${environment.medtomamuestra}', ${environment.lotecultivadoid})`;
        result = await pool.query(query);
    },

    async getAllEnvironment() {
        let query = `SELECT medtemperaturapromedio, medaltitud, medtopografia, medhumedadrelativa, 
                            medpluviosidad, medotros, TO_CHAR(medtomamuestra, 'YYYY-MM-DD') as medtomamuestra, lotecultivadoid 
                        FROM medioambiente`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de medio ambientes
    },

    async getEnvironment(id) {
        let query = `SELECT medtemperaturapromedio, medaltitud, medtopografia, medhumedadrelativa, 
                            medpluviosidad, medotros, TO_CHAR(medtomamuestra, 'YYYY-MM-DD') as medtomamuestra, medtomamuestra 
                    FROM medioambiente 
                    WHERE medioambienteid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve objeto de medio ambiente
    },

    async updateEnvironment(id, environment) {
        let query = `UPDATE medioambiente SET medtemperaturapromedio = ${environment.medtemperaturapromedio}, medaltitud = ${environment.medaltitud}, 
        medtopografia = '${environment.medtopografia}', medhumedadrelativa = ${environment.medhumedadrelativa}, medpluviosidad = '${environment.medpluviosidad}', 
        medotros = '${environment.medotros}', medtomamuestra = '${environment.medtomamuestra}', lotecultivadoid = ${environment.lotecultivadoid} 
        WHERE medioambienteid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si actualizó el medio ambiente y 0 sino lo hizo.
    },

    async deleteEnvironment(id) {
        let query = `DELETE FROM medioambiente WHERE lotecultivadoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si borró el medio ambiente y 0 sino lo hizo.
    }
}