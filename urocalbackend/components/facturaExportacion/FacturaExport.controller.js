const modeloFacturaExport = require('./FacturaExport.model');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {
    // INSERT: Agrega un registro
    async crearFacturaExport(req, res) {

        const { facnumero, compradorid, vendedorid, facfecha, facpuertoembarque, facpuertodestino, facvapor, facsubtotal12, facsubtotal0, facsubtotalsiniva, facsubtotalivaexcento, facsubtotalsinimpuestos, factotaldesc, facice, faciva12, facirbpn, facvalortotal, facformapago, facplazo, factiempo, facdae, facpesoneto, facpesobruto, faclote, faccontenedor, facsemana, facfechazarpe, facmarca, faccertificaciones,detalle } = req.body;

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
                faccertificaciones,
                detalle
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
        const rows = await modeloFacturaExport.obtenerFacturaExportacion(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Factura no encontrada" });
    },

    //  Obtener detallefacturaExport por id
    async obtenerDetalleFacturaExportacion(req, res) {
        const { id } = req.params;
        const rows = await modeloFacturaExport.obtenerDetalleFacturaExportacion(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Factura no encontrada" });
    },

    // UPDATE: Actualiza un registro
    async actualizarFacturaExport(req, res) {
        const { id } = req.params;
        const { facnumero, compradorid, vendedorid, facfecha, facpuertoembarque, facpuertodestino, facvapor, facsubtotal12, facsubtotal0, facsubtotalsiniva, facsubtotalivaexcento, facsubtotalsinimpuestos, factotaldesc, facice, faciva12, facirbpn, facvalortotal, facformapago, facplazo, factiempo, facdae, facpesoneto, facpesobruto, faclote, faccontenedor, facsemana, facfechazarpe, facmarca, faccertificaciones,detalle } = req.body;

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
            faccertificaciones,
            detalle
        });
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });
    },


    // DELETE: Elimina un registro
    async eliminarFacturaExport(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await modeloFacturaExport.eliminarFacturaExport(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Factura no registrada", tipo: "error" });
        } catch (err) {
            console.log(err);
            return res.json({ message: "Error al tratar de eliminar la factura", tipo: "error" });
        }
    },
        // DELETE: Elimina un registro
        async eliminarDetalleFacturaExport(req, res) {
            const { id } = req.params;
    
            try {
                let rowCount = await modeloFacturaExport.eliminarDetalleFacturaExport(id);
                return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Factura no registrada", tipo: "error" });
            } catch (err) {
                console.log(err);
                return res.json({ message: "Error al tratar de eliminar la factura", tipo: "error" });
            }
        },
}