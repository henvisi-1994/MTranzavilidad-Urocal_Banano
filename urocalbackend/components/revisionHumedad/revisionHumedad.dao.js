// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async getRevisionHumedadByAlmacenamientoID(almacenamientoid) {
        let query = `SELECT r.almacenamientoid, r.revisionhumedadid, r.revporcentajehumedad, 
                        TO_CHAR(r.revhoraingresosecadora, 'HH24:MI') as revhoraingresosecadora,
                        TO_CHAR(r.revhorasalidasecadora, 'HH24:MI') as revhorasalidasecadora,
                        TO_CHAR(r.revfechaingresosecadora, 'DD/MM/YYYY') as revfechaingresosecadora,
                        TO_CHAR(r.revfechasalidasecadora, 'DD/MM/YYYY') as revfechasalidasecadora
                     FROM revisionhumedad r WHERE r.almacenamientoid = ${almacenamientoid}`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los usuarios
    },
    async getRevisionHumedads(id) {
        let query = `select * from revisionhumedad WHERE revisionhumedadid = '${id}'`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del usuario encontrado
    },
    async deleteRevisionHumedad(id) {
        query = `DELETE FROM revisionhumedad WHERE revisionhumedadid = '${id}'`;
        result = await pool.query(query);
        console.log(result);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al usuario y 0 sino lo hizo.

    },
    async createRevisionHumedad(revisionHumedad) {
        //buscando la id de la almacenamiento
        /*let query = `SELECT almacenamientoid FROM public.almacenamiento WHERE almcontrato = '${revisionHumedad.almacenamientoid}'`;
        let result = await pool.query(query);
        var c = result.rows[0].almacenamientoid
        console.log(c)*/
        // Registro en tabla almacenamiento
        query = `INSERT INTO public.revisionhumedad(revporcentajehumedad, 
                    revfechaingresosecadora, revhoraingresosecadora, revfechasalidasecadora, revhorasalidasecadora, 
                    almacenamientoid) VALUES
                    (${revisionHumedad.revporcentajehumedad},'${revisionHumedad.revfechaingresosecadora}','
                    ${revisionHumedad.revhoraingresosecadora}','${revisionHumedad.revfechasalidasecadora}',
                    '${revisionHumedad.revhorasalidasecadora}', ${revisionHumedad.almacenamientoid});`;
        result = await pool.query(query);
    },
    async updateRevisionHumedad(id, revisionHumedad) {
        //buscando la id de la almacenamiento
        /*let query = `SELECT almacenamientoid FROM public.almacenamiento WHERE almcontrato = '${revisionHumedad.almacenamientoid}'`;
        let result = await pool.query(query);
        var c = result.rows[0].almacenamientoid
        console.log(c)*/
        //modificando revision humedad
        query = `UPDATE public.revisionhumedad SET revporcentajehumedad = ${revisionHumedad.revporcentajehumedad}, 
                    revfechaingresosecadora = '${revisionHumedad.revfechaingresosecadora}' , 
                    revhoraingresosecadora = '${revisionHumedad.revhoraingresosecadora}',
                    revfechasalidasecadora = '${revisionHumedad.revfechasalidasecadora}',
                    revhorasalidasecadora = '${revisionHumedad.revhorasalidasecadora}' 
                 WHERE revisionhumedadid = ${id}`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al usuario y 0 sino lo hizo.
    }
}
