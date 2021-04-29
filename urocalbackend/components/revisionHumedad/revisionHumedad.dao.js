// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');
const validation = require('../../utils/validations');

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
        let query = `select * from revisionhumedad WHERE almacenamientoid = '${id}'`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del usuario encontrado
    },
    async deleteRevisionHumedad(id) {
        query = `DELETE FROM revisionhumedad WHERE revisionhumedadid = '${id}'`;
        result = await pool.query(query);
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
    async updateRevisionHumedad(revisionHumedad) {
        //buscando la id de la almacenamiento
        /*let query = `SELECT almacenamientoid FROM public.almacenamiento WHERE almcontrato = '${revisionHumedad.almacenamientoid}'`;
        let result = await pool.query(query);
        var c = result.rows[0].almacenamientoid
        console.log(c)*/
        revisionHumedad.forEach(await function(revHumedad){

                 if(revHumedad.revisionhumedadid === 0){
                    let queryI = `INSERT INTO public.revisionhumedad(revporcentajehumedad, 
                        revfechaingresosecadora, revhoraingresosecadora, revfechasalidasecadora, revhorasalidasecadora, 
                        almacenamientoid) VALUES
                        (${revHumedad.revporcentajehumedad},'${validation.validarFecha(revHumedad.revfechaingresosecadora)}','
                        ${revHumedad.revhoraingresosecadora}','${validation.validarFecha(revHumedad.revfechasalidasecadora)}',
                        '${revHumedad.revhorasalidasecadora}', ${revHumedad.almacenamientoid});`;
                     result = pool.query(queryI);
                 } else{
                    let query = `UPDATE public.revisionhumedad SET revporcentajehumedad = ${revHumedad.revporcentajehumedad}, 
                    revfechaingresosecadora = '${validation.validarFecha(revHumedad.revfechaingresosecadora)}' , 
                    revhoraingresosecadora = '${revHumedad.revhoraingresosecadora}',
                    revfechasalidasecadora = '${validation.validarFecha(revHumedad.revfechasalidasecadora)}',
                    revhorasalidasecadora = '${revHumedad.revhorasalidasecadora}' 
                 WHERE revisionhumedadid = ${revHumedad.revisionhumedadid}`;
                 result = pool.query(query);
                 }
                 
        
        });
        return 1; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al usuario y 0 sino lo hizo.
    }
}

function validarFecha(fecha) {     
    const [day, month, year] = fecha.split("/");
    return `${year}-${month}-${day}`;
}
