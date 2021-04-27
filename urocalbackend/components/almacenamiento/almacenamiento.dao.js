// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async getAlmacenamiento() {
        let query = `SELECT a.almacenamientoid, a.almcontrato, a.almnumerobultos, a.almpesobulto, a.almpesototalingreso, 
                        a.almsaldo, a.almobservaciones, TO_CHAR(a.almfechaacopio, 'YYYY-MM-DD') as almfechaacopio, 
                        TO_CHAR(a.almfechaingresobodega, 'YYYY-MM-DD') as almfechaingresobodega, t.tratamientoid , 
                        c.centroacopioid , c.centroacopionombre 
                     FROM almacenamiento a, tratamiento t, centroacopio c
                     WHERE a.tratamientoid = t.tratamientoid and a.centroacopioid = c.centroacopioid`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los usuarios
    },
    async getAlmacenamientos(id) {
        let query = `SELECT a.almacenamientoid, a.almcontrato, a.almnumerobultos, a.almpesobulto, a.almpesototalingreso, 
                        a.almsaldo, a.almobservaciones, TO_CHAR(a.almfechaacopio, 'YYYY-MM-DD') as almfechaacopio, 
                        TO_CHAR(a.almfechaingresobodega, 'YYYY-MM-DD') as almfechaingresobodega, t.tratamientoid ,  
                        c.centroacopioid , c.centroacopionombre 
                    FROM almacenamiento a, tratamiento t, centroacopio c
                    WHERE a.tratamientoid = t.tratamientoid and a.centroacopioid = c.centroacopioid and almacenamientoid = '${id}'`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del usuario encontrado
    },
    async deleteAlmacenamiento(id) {
        let mixQuery = `DELETE FROM mix WHERE almacenamientoid = ${id}`;
        await pool.query(mixQuery);


        query = `DELETE FROM public.revisionhumedad WHERE almacenamientoid = '${id}'`;
    
        result = await pool.query(query);

        mixQuery = `DELETE FROM detalledespacho where almacenamientoid = ${id}`;
        await pool.query(mixQuery);

        mixQuery = `DELETE FROM almacenamiento where almacenamientoid = ${id}`;
        await pool.query(mixQuery);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al usuario y 0 sino lo hizo.
    },
    async createAlmacenamiento(almacenamiento) {
        /*//buscando la id de la centroacopio
        let query = `SELECT centroacopioid FROM public.centroacopio WHERE centroacopionombre = '${almacenamiento.centroacopioid}'`;
        let result = await pool.query(query);
        var c = result.rows[0].centroacopioid
        console.log(c)
        //buscando la id del tratamiento
        query = `SELECT tratamientoid FROM public.tratamiento WHERE trafechainiciofermentacion = '${almacenamiento.tratamientoid}'`;
        result = await pool.query(query);
        var t = result.rows[0].tratamientoid
        console.log(t)*/
        // Registro en tabla almacenamiento
        query = `INSERT INTO public.almacenamiento(almcontrato, almfechaacopio, almfechaingresobodega, almnumerobultos,
                    almpesobulto, almpesototalingreso, almsaldo, almobservaciones, tratamientoid, centroacopioid) VALUES
                    ('${almacenamiento.almcontrato}','${almacenamiento.almfechaacopio}','
                    ${almacenamiento.almfechaingresobodega}',${almacenamiento.almnumerobultos},${almacenamiento.almpesobulto},
                    ${almacenamiento.almpesototalingreso},${almacenamiento.almsaldo},'${almacenamiento.almobservaciones}'
                    ,${almacenamiento.tratamientoid},${almacenamiento.centroacopioid})
                    RETURNING almacenamientoid;`;
        let result = await pool.query(query);
        //console.log(query)
        //console.log(result)
        return result.rows[0];
    },
    async updateAlmacenamiento(id, almacenamiento) {
        /*//buscando la id de la centroacopio
        let query = `SELECT centroacopioid FROM public.centroacopio WHERE centroacopionombre = '${almacenamiento.centroacopioid}'`;
        let result = await pool.query(query);
        var c = result.rows[0].centroacopioid
        console.log(c)
        //buscando la id del tratamiento
        query = `SELECT tratamientoid FROM public.tratamiento WHERE trafechainiciofermentacion = '${almacenamiento.tratamientoid}'`;
        result = await pool.query(query);
        var t = result.rows[0].tratamientoid
        console.log(t)*/
        //modificando almacenamiento
        query = `UPDATE public.almacenamiento SET almcontrato='${almacenamiento.almcontrato}', almfechaacopio = '${almacenamiento.almfechaacopio}', 
                    almfechaingresobodega = '${almacenamiento.almfechaingresobodega}' , almnumerobultos = ${almacenamiento.almnumerobultos},
                    almpesobulto = ${almacenamiento.almpesobulto},almpesototalingreso = ${almacenamiento.almpesototalingreso},
                    almsaldo = ${almacenamiento.almsaldo}, almobservaciones = '${almacenamiento.almobservaciones}',
                    tratamientoid = ${almacenamiento.tratamientoid}, centroacopioid = ${almacenamiento.centroacopioid} 
                WHERE almacenamientoid = '${id}'`;
        result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al usuario y 0 sino lo hizo.
    }
}
