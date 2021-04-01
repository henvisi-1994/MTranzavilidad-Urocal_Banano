const pool = require('../../services/postgresql/index');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {
    // INSERT: Agrega un registro
    async crearFacturaExport(factexport) {
        let query = `INSERT INTO public.facturaexportacion( facnumero, compradorid, vendedorid, facfecha, facpuertoembarque, facpuertodestino, facvapor, facsubtotal12, facsubtotal0, facsubtotalsiniva, facsubtotalivaexcento, facsubtotalsinimpuestos, factotaldesc, facice, faciva12, facirbpn, facvalortotal, facformapago, facplazo, factiempo, facdae, facpesoneto, facpesobruto, faclote, faccontenedor, facsemana, facfechazarpe, facmarca, faccertificaciones)
        VALUES (${factexport.facnumero},
                ${factexport.compradorid}, 
                ${factexport.vendedorid}, 
                ${factexport.facfecha}, 
                ${factexport.facpuertoembarque}, 
                ${factexport.facpuertodestino}, 
                ${factexport.facvapor}, 
                ${factexport.facsubtotal12}, 
                ${factexport.facsubtotal0},
                ${factexport.facsubtotalsiniva},
                ${factexport.facsubtotalivaexcento},
                ${factexport.facsubtotalsinimpuestos},
                ${factexport.factotaldesc},
                ${factexport.facice},
                ${factexport.faciva12},
                ${factexport.facirbpn}, 
                ${factexport.facvalortotal}, 
                ${factexport.facformapago}, }
                ${factexport.facplazo}, 
                ${factexport.factiempo}, 
                ${factexport.facdae}, 
                ${factexport.facpesoneto}, 
                ${factexport.facpesobruto}, 
                ${factexport.faclote}, 
                ${factexport.faccontenedor}, 
                ${factexport.facsemana}, 
                ${factexport.facfechazarpe}, 
                ${factexport.facmarca}, 
                ${factexport.faccertificaciones});`
        return factexport;
    },


    // SELECT: Devuelve todos los registros
    async obtenerFacturaExportes() {
        
        // return result.rows;                     // Devuelve el array de json
    },


    // UPDATE: Actualiza un registro
    async actualizarFacturaExport(id, factexport) {

        let query = `UPDATE public.facturaexportacion
        SET  facnumero=${factexport.facnumero}, 
        compradorid=${factexport.compradorid}, 
        vendedorid=${factexport.vendedorid}, 
        facfecha=${factexport.facfecha}, 
        facpuertoembarque=${factexport.facpuertoembarque}, 
        facpuertodestino=${factexport.facpuertodestino}, 
        facvapor=${factexport.facvapor}, 
        facsubtotal12=${factexport.facsubtotal12}, 
        facsubtotal0=${factexport.facsubtotal0}, 
        facsubtotalsiniva=${factexport.facsubtotalsiniva}, 
        facsubtotalivaexcento=${factexport.facsubtotalivaexcento}, 
        facsubtotalsinimpuestos=${factexport.facsubtotalsinimpuestos}, 
        factotaldesc=${factexport.factotaldesc}, 
        facice=${factexport.facice}, 
        faciva12=${factexport.faciva12}, 
        facirbpn=${factexport.facirbpn}, 
        facvalortotal=${factexport.facvalortotal}, 
        facformapago=${factexport.facformapago}, 
        facplazo=${factexport.facplazo}, 
        factiempo=${factexport.factiempo}, 
        facdae=${factexport.facdae}, 
        facpesoneto=${factexport.facpesoneto}, 
        facpesobruto=${factexport.facpesobruto}, 
        faclote=${factexport.faclote}, 
        faccontenedor=${factexport.faccontenedor}, 
        facsemana=${factexport.facsemana}, 
        facfechazarpe=${factexport.facfechazarpe}, 
        facmarca=${factexport.facmarca}, 
        faccertificaciones=${factexport.faccertificaciones}
        WHERE facturaexportacionid= '${id}'`;
        let result = await pool.query(query);

        return result.rowCount;                 // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al usuario y 0 sino lo hizo.
    },


    // DELETE: Elimina un registro
    async eliminarFacturaExport(id) {


        //return result.rowCount;                 // Devuelve la cantidad de filas afectadas.
    },
}