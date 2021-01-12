
const pool = require('../../services/postgresql/index');

module.exports = {
    async getFitosanitarios() {
        let query = `SELECT * FROM fitosanitario`;
        let result = await pool.query(query);
        console.log(result);
        return result.rows; // Devuelve el array de json que contiene a todos los usuarios
    },

    async getFitosanitario(id) {
        let query = `SELECT * FROM fitosanitario WHERE fitosanitarioid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del usuario encontrado
    },

    async createFitosanitario(fitosanitario) {
        let query, result;

        query = `INSERT INTO fitosanitario
                    (fitciclo, fitfecha, fitnombrecomercial, fitingredienteactivo, fitautorizaciontecnica, fitnombrecomun, fitdosis, fitcantidadtotal, fitareaplicada, fitequipoaplicacion, fitmetodo, fitplazoseguridad, fitoperario, cultivoid, condicionclimaticaid) VALUES
                    ('${fitosanitario.fitciclo}', '${fitosanitario.fitfecha}', '${fitosanitario.fitnombrecomercial}', '${fitosanitario.fitingredienteactivo}', '${fitosanitario.fitnombrecomun}', '${fitosanitario.fitdosis}', '${fitosanitario.fitcantidadtotal}', '${fitosanitario.fitareaplicada}, '${fitosanitario.fitequipoaplicacion}, '${fitosanitario.fitmetodo}, '${fitosanitario.fitplazoseguridad}, '${fitosanitario.fitoperario}, '${fitosanitario.cultivoid}, '${fitosanitario.condicionclimaticaid}) RETURNING fitosanitarioid;`

        result = await pool.query(query);

        return fitosanitario;
    },
    
    async updateFitosanitario(id, fitosanitario) {
        let query = `UPDATE fitosanitario SET fitciclo = '${fitosanitario.fitciclo}', fitfecha = '${fitosanitario.fitfecha}', fitnombrecomercial = '${fitosanitario.fitnombrecomercial}', fitingredienteactivo = '${fitosanitario.fitingredienteactivo}', fitnombrecomun = '${fitosanitario.fitnombrecomun}', fitdosis = '${fitosanitario.fitdosis}', fitcantidadtotal = '${fitosanitario.fitcantidadtotal}', fitareaplicada = '${fitosanitario.fitareaplicada}' fitequipoaplicacion = '${fitosanitario.fitequipoaplicacion}', fitmetodo = '${fitosanitario.fitmetodo}', fitplazoseguridad = '${fitosanitario.fitplazoseguridad}', fitoperario = '${fitosanitario.fitoperario}', cultivoid = '${fitosanitario.cultivoid}', condicionclimaticaid = '${fitosanitario.condicionclimaticaid}' WHERE fitosanitarioid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount;
    },
    
    async deleteFitosanitario(id) {
        let query = `DELETE FROM fitosanitario WHERE fitosanitarioid = '${id}'`;
        let result = await pool.query(query);

        query = `DELETE FROM fitosanitario WHERE fitosanitarioid = '${id}'`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al usuario y 0 sino lo hizo.
    },
    
}