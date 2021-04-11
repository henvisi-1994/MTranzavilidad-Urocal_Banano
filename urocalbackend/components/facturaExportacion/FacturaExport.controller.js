const modeloFacturaExport = require('./FacturaExport.model');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {
    // INSERT: Agrega un registro
    async crearFacturaExport(req, res) {

        const { facnumero, compradorid, vendedorid, facfecha, facpuertoembarque, facpuertodestino, facvapor, facsubtotal12, facsubtotal0, facsubtotalsiniva, facsubtotalivaexcento, facsubtotalsinimpuestos, factotaldesc, facice, faciva12, facirbpn, facvalortotal, facformapago, facplazo, factiempo, facdae, facpesoneto, facpesobruto, faclote, faccontenedor, facsemana, facfechazarpe, facmarca, faccertificaciones } = req.body;

        try {
            await modeloFacturaExport.crearFacturaExport({
                facnumero,
                compradorid,
                vendedorid,
                facfecha,
                facpuertoembarque,
                facpuertodestino,
                facvapor,
                facsubtotal12,
                facsubtotal0,
                facsubtotalsiniva,
                facsubtotalivaexcento,
                facsubtotalsinimpuestos,
                factotaldesc,
                facice,
                faciva12,
                facirbpn,
                facvalortotal,
                facformapago,
                facplazo,
                factiempo,
                facdae,
                facpesoneto,
                facpesobruto,
                faclote,
                faccontenedor,
                facsemana,
                facfechazarpe,
                facmarca,
                faccertificaciones
            });
            return res.status(201).send({ message: "Registro exitoso" });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Registro fallido" });
        }
    },


    // SELECT: Devuelve todos los registros
    async obtenerFacturaExportes(req, res) {
        const rowsExportadorPersonas = await modeloFacturaExport.obtenerFacturaExportes();
        return res.status(200).send(rowsExportadorPersonas);
    },

    // SELECT: Devuelve todos los registros
    async obtenerFacturaExportacion(req, res) {
        const { id } = req.params;
        const rowsExportadorPersonas = await modeloFacturaExport.obtenerFacturaExportacion(id);
        return res.status(200).send(rowsExportadorPersonas);
    },

    // UPDATE: Actualiza un registro
    async actualizarFacturaExport(req, res) {
        const { id } = req.params;
        const { facnumero, compradorid, vendedorid, facfecha, facpuertoembarque, facpuertodestino, facvapor, facsubtotal12, facsubtotal0, facsubtotalsiniva, facsubtotalivaexcento, facsubtotalsinimpuestos, factotaldesc, facice, faciva12, facirbpn, facvalortotal, facformapago, facplazo, factiempo, facdae, facpesoneto, facpesobruto, faclote, faccontenedor, facsemana, facfechazarpe, facmarca, faccertificaciones } = req.body;

        const rowCount = await modeloFacturaExport.actualizarFacturaExport(id, {
            facnumero,
            compradorid,
            vendedorid,
            facfecha,
            facpuertoembarque,
            facpuertodestino,
            facvapor,
            facsubtotal12,
            facsubtotal0,
            facsubtotalsiniva,
            facsubtotalivaexcento,
            facsubtotalsinimpuestos,
            factotaldesc,
            facice,
            faciva12,
            facirbpn,
            facvalortotal,
            facformapago,
            facplazo,
            factiempo,
            facdae,
            facpesoneto,
            facpesobruto,
            faclote,
            faccontenedor,
            facsemana,
            facfechazarpe,
            facmarca,
            faccertificaciones
        });
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });
    },


    // DELETE: Elimina un registro
    async eliminarFacturaExport(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await modeloFacturaExport.eliminarFacturaExport(id);
            return rowCount == 1 ? res.status(200).send({ message: "Eliminado exitosamente" }) : res.status(404).send({ message: "Conductor no encontrado" });
        } catch (err) {
            return res.status(500).send({ message: "Error al tratar de eliminar exportador" });
        }
    },
}