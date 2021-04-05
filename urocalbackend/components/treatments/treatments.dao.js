// Data Access Object
// Se comunica con la base de datos
const bcrypt = require('bcryptjs');
const pool = require('../../services/postgresql/index');
const { updateTreatment } = require('./treatments.model');
const format = require('pg-format');
//const { getUser, updatePasswd } = require('./users.model');

module.exports = {
    async createTreatment(treatment) {

        //traFechaInicioFermentacion, traFechaFinFermentacion, traTipoSecado, traFechaInicioSecado, traFechaFinSecado, traVolumenSeco, traConversion, traObservacion, traOperario 
        // Registro en tabla tratamiento
        query = `INSERT INTO tratamiento
        (traobservacion, traubicacion, trafecha, cultivoid, productorid, fincaid) VALUES 
                    ('${treatment.traobservacion}','${treatment.traubicacion}','${treatment.trafecha}','${treatment.cultivoid}','${treatment.productorid}','${treatment.fincaid}')
                    RETURNING tratamientoid;`;
        result = await pool.query(query);
        if (result.rows) {
            const newdetalleTreatment = treatment.detalle.map(dt => {
                return [
                    dt.dtratipo,
                    dt.dtraunidad,
                    dt.dtracantidad,
                    dt.dtrafechainicio,
                    dt.dtrafechafin,
                    result.rows[0].tratamientoid
                ]
            })
            query = format('INSERT INTO detalletratamiento (dtratipo, dtraunidad, dtracantidad, dtrafechainicio, dtrafechafin, tratamientoid) VALUES %L', newdetalleTreatment);
            result = await pool.query(query);
        }
        return treatment;
    },

    async getTreatments() {
<<<<<<< HEAD
        let query = `SELECT t.traobservacion,t.tratamientoid,traubicacion,TO_CHAR(t.trafecha, 'YYYY-MM-DD')as trafecha,t.cultivoid,concat(p.pronombre,' ',p.provariedad) as cultivo,t.productorid,concat(persona.pernombres,' ',persona.perapellidos) as productor,t.fincaid,f.finnombrefinca FROM tratamiento t 
        inner join cultivo c on t.cultivoid = c.cultivoid
=======
        let query = `SELECT t.traobservacion,t.tratamientoid,traubicacion,TO_CHAR(t.trafecha, 'YYYY-MM-DD')as trafecha,t.cultivoid,concat(p.pronombre,' ',p.provariedad) as cultivo,c.lotecultivadoid,t.productorid,concat(persona.pernombres,' ',persona.perapellidos) as productor,t.fincaid,f.finnombrefinca FROM tratamiento t 
        inner join cultivo c on t.cultivoid = c.cultivoid
		inner join lotecultivado l on l.lotecultivadoid = c.lotecultivadoid
>>>>>>> 8f2d20847df712c65189b6986e90c5e632f0850c
        inner join producto p on c.productoid= p.productoid 
        inner join productor  on t.productorid = productor.productorid
        inner join persona  on productor.productorid=persona.personaid
        inner join finca f on t.fincaid = f.fincaid`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los tratamientos
    },

    async getTreatment(id) {
<<<<<<< HEAD
        let query = `SELECT t.traobservacion,t.tratamientoid,traubicacion,TO_CHAR(t.trafecha, 'YYYY-MM-DD')as trafecha,t.cultivoid,concat(p.pronombre,' ',p.provariedad) as cultivo,t.productorid,concat(persona.pernombres,' ',persona.perapellidos) as productor,t.fincaid,f.finnombrefinca FROM tratamiento t 
        inner join cultivo c on t.cultivoid = c.cultivoid
        inner join producto p on c.productoid= p.productoid 
        inner join productor  on t.productorid = productor.productorid
        inner join persona  on productor.productorid=persona.personaid
        inner join finca f on t.fincaid = f.fincaid  WHERE tratamientoId = ${id}`;
=======
        let query = `SELECT t.traobservacion,t.tratamientoid,traubicacion,TO_CHAR(t.trafecha, 'YYYY-MM-DD')as trafecha,t.cultivoid,concat(p.pronombre,' ',p.provariedad) as cultivo,c.lotecultivadoid,t.productorid,concat(persona.pernombres,' ',persona.perapellidos) as productor,t.fincaid,f.finnombrefinca FROM tratamiento t 
        inner join cultivo c on t.cultivoid = c.cultivoid
		inner join lotecultivado l on l.lotecultivadoid = c.lotecultivadoid
        inner join producto p on c.productoid= p.productoid 
        inner join productor  on t.productorid = productor.productorid
        inner join persona  on productor.productorid=persona.personaid
        inner join finca f on t.fincaid = f.fincaid  WHERE t.tratamientoId = ${id}`;
>>>>>>> 8f2d20847df712c65189b6986e90c5e632f0850c
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del tratamiento encontrado
    },
    async getDetalleTreatment(id) {
        let query = `SELECT dtratipo,dtraunidad,dtracantidad,TO_CHAR(dtrafechainicio, 'YYYY-MM-DD')as dtrafechainicio ,TO_CHAR(dtrafechafin, 'YYYY-MM-DD')as dtrafechafin,tratamientoid,dtraid FROM detalletratamiento WHERE tratamientoId = ${id}`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el json del tratamiento encontrado
    },

    async deleteTreatment(id) {
        //Borrado logico
        queryd = `DELETE FROM detalletratamiento WHERE tratamientoid = '${id}'`
        query = `DELETE FROM tratamiento WHERE tratamientoid = '${id}'`;
        resultd = await pool.query(queryd);
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró el tratamiento y 0 sino lo hizo.
    },

    async updateTreatment(id, treatment) {
        //(traobservacion, traubicacion, trafecha, cultivoid, productorid, fincaid)
        let query = `UPDATE tratamiento SET traobservacion = '${treatment.traobservacion}',  traubicacion = '${treatment.traubicacion}', 
        trafecha = '${treatment.trafecha}', cultivoid = '${treatment.cultivoid}', productorid = '${treatment.productorid}', 
        fincaid = '${treatment.fincaid}'
        WHERE tratamientoid = ${id}`;

        let result = await pool.query(query);
        let queryd = `SELECT * FROM public.detalletratamiento where tratamientoid= ${id}`;
        let resultd = await pool.query(queryd);
        let actualizar = ''; 
        if (resultd.rows) {
            treatment.detalle.map(async dt  =>  {

                      
                if (typeof dt.dtraid === 'undefined') {
                actualizar = `Insert into public.detalletratamiento (dtratipo,dtraunidad,dtracantidad,dtrafechainicio,dtrafechafin,tratamientoid) values ('${dt.dtratipo}','${dt.dtraunidad}',${dt.dtracantidad},'${dt.dtrafechainicio}','${dt.dtrafechafin}',${id})`
                }else{
                actualizar = `UPDATE public.detalletratamiento SET dtratipo='${dt.dtratipo}', dtraunidad='${dt.dtraunidad}', dtracantidad=${dt.dtracantidad}, dtrafechainicio='${dt.dtrafechainicio}', dtrafechafin='${dt.dtrafechafin}', tratamientoid=${id} WHERE dtraid=${dt.dtraid}`
                
                resultd.rows.forEach(function(x){
                   
                    if(x.dtraid!=dt.dtraid && dt.dtraid!= 'undefined'){
                    
                    let detdelete = `DELETE FROM public.detalletratamiento where dtraid=${x.dtraid}`
                    console.log(detdelete)
                    pool.query(detdelete)
                    }
                })

                }

                console.log(actualizar)
                pool.query(actualizar)
                
            })
        }
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó y 0 sino lo hizo.
    }

}