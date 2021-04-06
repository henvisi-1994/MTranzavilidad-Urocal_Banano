
const pool = require('../../services/postgresql/index');

module.exports = {

    async getFertilizaciones() {
        let query = `SELECT fertilizacionid, ferciclo,TO_CHAR(ferfecha, 'YYYY-MM-DD') as ferfecha, fernombrecomercial, 
        ferelementos, ferconcentracion, ferareaaplicada, fercantidadaplicada, ferunidadmedida, ferequipoaplicacion, fermetodoaplicacion,
        feroperario, c.cultivoid, concat(pronombre, ' ', provariedad) as cultivo, lc.lotecultivadoid, lotnumero,
		f.fincaid, finnombrefinca, fincodigo
                       
                    FROM  fertilizacion 
					inner join cultivo c on c.cultivoid = fertilizacion.cultivoid
					inner join producto p on p.productoid = c.productoid
					inner join lotecultivado lc on lc.lotecultivadoid = c.lotecultivadoid
					inner join finca f on f.fincaid = lc.fincaid`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los usuarios
    },
 
    async getFertilizacion(id) {
        let query = `SELECT fertilizacionid, ferciclo,TO_CHAR(ferfecha, 'YYYY-MM-DD') as ferfecha, fernombrecomercial, 
        ferelementos, ferconcentracion, ferareaaplicada, fercantidadaplicada, ferunidadmedida, ferequipoaplicacion, fermetodoaplicacion,
        feroperario, c.cultivoid, concat(pronombre, ' ', provariedad) as cultivo, lc.lotecultivadoid, lotnumero,
		f.fincaid, finnombrefinca, fincodigo
                       
                    FROM  fertilizacion 
					inner join cultivo c on c.cultivoid = fertilizacion.cultivoid
					inner join producto p on p.productoid = c.productoid
					inner join lotecultivado lc on lc.lotecultivadoid = c.lotecultivadoid
					inner join finca f on f.fincaid = lc.fincaid WHERE fertilizacion.fertilizacionid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del usuario encontrado
    },

    async createFertilizacion(fertilizacion) {
        let query, result;

        query = `INSERT INTO fertilizacion
                    (ferciclo, ferfecha, fernombrecomercial, ferelementos, ferconcentracion, ferareaaplicada, fercantidadaplicada, ferunidadmedida, ferequipoaplicacion, fermetodoaplicacion, feroperario, cultivoid) VALUES
                    ('${fertilizacion.ferciclo}', '${fertilizacion.ferfecha}','${fertilizacion.fernombrecomercial}','${fertilizacion.ferelementos}','${fertilizacion.ferconcentracion}','${fertilizacion.ferareaaplicada}','${fertilizacion.fercantidadaplicada}','${fertilizacion.ferunidadmedida}','${fertilizacion.ferequipoaplicacion}','${fertilizacion.fermetodoaplicacion}','${fertilizacion.feroperario}','${fertilizacion.cultivoid}') RETURNING fertilizacionid;`
        result = await pool.query(query);

        return fertilizacion;
    },

    async updateFertilizacion(id, fertilizacion) {
        let query = `UPDATE fertilizacion SET ferciclo = '${fertilizacion.ferciclo}', ferfecha = '${fertilizacion.ferfecha}', fernombrecomercial = '${fertilizacion.fernombrecomercial}', ferelementos = '${fertilizacion.ferelementos}', ferconcentracion = '${fertilizacion.ferconcentracion}', ferareaaplicada = '${fertilizacion.ferareaaplicada}', fercantidadaplicada = '${fertilizacion.fercantidadaplicada}', ferunidadmedida = '${fertilizacion.ferunidadmedida}', ferequipoaplicacion = '${fertilizacion.ferequipoaplicacion}', fermetodoaplicacion = '${fertilizacion.fermetodoaplicacion}', feroperario = '${fertilizacion.feroperario}', cultivoid = '${fertilizacion.cultivoid}' WHERE fertilizacionid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount;
    },
    
    async deleteFertilizacion(id) {
        //Borrado logico
        let query = `DELETE FROM fertilizacion WHERE fertilizacionid = '${id}'`;
        let result = await pool.query(query);

        query = `DELETE FROM fertilizacion WHERE fertilizacionid = '${id}'`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al usuario y 0 sino lo hizo.
    },
    
}