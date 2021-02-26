// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async crearMedioAmbiente(medioAmbiente) {
        // Registro en tabla medioambiente
        query = `INSERT INTO medioambiente (medtemperaturapromedio, medaltitud, medtopografia, medhumedadrelativa, medpluviosidad, medotros, 
                                                medtomamuestra, lotecultivadoid) VALUES 
                    (${medioAmbiente.medtemperaturapromedio},${medioAmbiente.medaltitud}, '${medioAmbiente.medtopografia}', 
                    ${medioAmbiente.medhumedadrelativa}, '${medioAmbiente.medpluviosidad}', '${medioAmbiente.medotros}', 
                    '${medioAmbiente.medtomamuestra}', ${medioAmbiente.lotecultivadoid})`;
        result = await pool.query(query);
    },

    async obtenerTodosMedioAmbiente() {
        let query = `SELECT medioambienteid, medtemperaturapromedio, medaltitud, medtopografia, medhumedadrelativa, 
                            medpluviosidad, medotros, TO_CHAR(medtomamuestra, 'YYYY-MM-DD') as medtomamuestra, lotecultivadoid 
                        FROM medioambiente`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de medio ambientes
    },

    async obtenerMedioAmbiente(id) {
        let query = `SELECT medioambienteid, medtemperaturapromedio, medaltitud, medtopografia, medhumedadrelativa, 
                            medpluviosidad, medotros, TO_CHAR(medtomamuestra, 'YYYY-MM-DD') as medtomamuestra, lotecultivadoid
                    FROM medioambiente 
                    WHERE lotecultivadoid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve objeto de medio ambiente
    },

    async actualizarMedioAmbiente(id, medioAmbiente) {
        let query = `UPDATE medioambiente SET medtemperaturapromedio = ${medioAmbiente.medtemperaturapromedio}, medaltitud = ${medioAmbiente.medaltitud}, 
        medtopografia = '${medioAmbiente.medtopografia}', medhumedadrelativa = ${medioAmbiente.medhumedadrelativa}, medpluviosidad = '${medioAmbiente.medpluviosidad}', 
        medotros = '${medioAmbiente.medotros}', medtomamuestra = '${medioAmbiente.medtomamuestra}'
        WHERE lotecultivadoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si actualizó el medio ambiente y 0 sino lo hizo.
    },

    async eliminarMedioAmbiente(id) {
        let query = `DELETE FROM medioambiente WHERE lotecultivadoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si borró el medio ambiente y 0 sino lo hizo.
    }
}