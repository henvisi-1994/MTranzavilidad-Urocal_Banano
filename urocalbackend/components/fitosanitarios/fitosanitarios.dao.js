
const pool = require('../../services/postgresql/index');

module.exports = {
    async getFitosanitarios() {
        let query = `SELECT f.fitosanitarioid, fitciclo, TO_CHAR(fitfecha, 'YYYY-MM-DD')as fitfecha,
        fitnombrecomercial, fitingredienteactivo, fitautorizaciontecnica,
        fitnombrecomun, fitdosis, fitcantidadtotal,
        fitareaaplicada, fitequipoaplicacion, fitmetodo,
        fitplazoseguridad, fitoperario,concat(pernombres, ' ',perapellidos) as operario, f.cultivoid, 
        l.lotecultivadoid, lotnumero, p.productoid, 
        concat(pronombre, ' ', provariedad) as cultivo, fc.fincaid, fincodigo
        FROM fitosanitario f 
                                JOIN cultivo c ON c.cultivoid =f.cultivoid
                                join producto p on c.productoid = p.productoid
                                JOIN lotecultivado l on l.lotecultivadoid=c.lotecultivadoid
                                JOIN finca fc ON fc.fincaid = l.fincaid
                                join persona pe on pe.personaid = to_number(f.fitoperario,'999999')`;
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
                    (fitciclo, fitfecha, fitnombrecomercial, fitingredienteactivo, fitautorizaciontecnica, fitnombrecomun, fitdosis, fitcantidadtotal, fitareaaplicada, fitequipoaplicacion, fitmetodo, fitplazoseguridad, fitoperario, cultivoid) VALUES
                    ('${fitosanitario.fitciclo}', '${fitosanitario.fitfecha}', '${fitosanitario.fitnombrecomercial}', '${fitosanitario.fitingredienteactivo}', '${fitosanitario.fitautorizaciontecnica}','${fitosanitario.fitnombrecomun}', '${fitosanitario.fitdosis}', '${fitosanitario.fitcantidadtotal}', '${fitosanitario.fitareaaplicada}', '${fitosanitario.fitequipoaplicacion}', '${fitosanitario.fitmetodo}', '${fitosanitario.fitplazoseguridad}', '${fitosanitario.fitoperario}', '${fitosanitario.cultivoid}' ) RETURNING fitosanitarioid;`

        console.log(query);
        result = await pool.query(query);
        
        return fitosanitario;
    },
    
    async updateFitosanitario(id, fitosanitario) {
        let query = `UPDATE fitosanitario SET fitciclo = '${fitosanitario.fitciclo}', 
        fitfecha = '${fitosanitario.fitfecha}', 
        fitnombrecomercial = '${fitosanitario.fitnombrecomercial}', 
        fitingredienteactivo = '${fitosanitario.fitingredienteactivo}', 
        fitnombrecomun = '${fitosanitario.fitnombrecomun}', 
        fitdosis = '${fitosanitario.fitdosis}', 
        fitcantidadtotal = '${fitosanitario.fitcantidadtotal}', 
        fitareaaplicada = '${fitosanitario.fitareaaplicada}',
        fitautorizaciontecnica = '${fitosanitario.fitautorizaciontecnica}',
        fitequipoaplicacion = '${fitosanitario.fitequipoaplicacion}', 
        fitmetodo = '${fitosanitario.fitmetodo}', 
        fitplazoseguridad = '${fitosanitario.fitplazoseguridad}', fitoperario = '${fitosanitario.fitoperario}', cultivoid = '${fitosanitario.cultivoid}' WHERE fitosanitarioid = ${id}`;
       
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