
const guiaremisionModel = require('./guiaremision.model');

module.exports = {
    async getGuiaRemisiones(req, res) {
        const guiaremisiones = await guiaremisionModel.getGuiaRemisiones();
        return res.status(200).send(guiaremisiones);
    },

    async getGuiaRemision(req, res) {
        const { id } = req.params;
        const rows = await guiaremisionModel.getGuiaRemision(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "GuiaRemision no encontrado" });
    },

    async createGuiaRemision(req, res) {

        // Añadir capa de validación

        const { guiserie, guinumero, guifechaemision, guifechainicio, guihorainicio, guifechafin, guihorafin, guipuntoinicio, guipuntofin, guicomprobanteventa, guimotivo, guidestinatario, guiformapago, guiobservacion, guiemiteurocal, conductorid, vehiculoid, productorid, carga } = req.body;

        try {
            await guiaremisionModel.createGuiaRemision({
                guiserie: guiserie,
                guinumero: guinumero,
                guifechaemision: guifechaemision,
                guifechainicio: guifechainicio,
                guihorainicio: guihorainicio,
                guifechafin: guifechafin,
                guihorafin: guihorafin,
                guipuntoinicio, guipuntofin,
                guicomprobanteventa: guicomprobanteventa,
                guimotivo: guimotivo,
                guidestinatario: guidestinatario,
                guiformapago: guiformapago,
                guiobservacion: guiobservacion,
                guiemiteurocal: guiemiteurocal,
                conductorid: conductorid,
                vehiculoid: vehiculoid,
                productorid: productorid,
                carga: carga
            });
        } catch (error) {
            
            return res.status(500).send({ message: "Registro fallido" });
        }

        return res.status(201).send({ message: "Registro exitoso" });
    },

    async updateGuiaRemision(req, res) {
        const { id } = req.params;
        const { guiserie, guinumero, guifechaemision, guifechainicio, guihorainicio, guifechafin, guihorafin, guipuntoinicio, guipuntofin, guicomprobanteventa, guimotivo, guidestinatario, guiformapago, guiobservacion, guiemiteurocal, conductorid, vehiculoid, productorid, carga} = req.body;

        const rowCount = await guiaremisionModel.updateGuiaRemision(id, {
            guiserie: guiserie,
            guinumero: guinumero,
            guifechaemision: guifechaemision,
            guifechainicio: guifechainicio,
            guihorainicio: guihorainicio,
            guifechafin: guifechafin,
            guihorafin: guihorafin,
            guipuntoinicio, guipuntofin,
            guicomprobanteventa: guicomprobanteventa,
            guimotivo: guimotivo,
            guidestinatario: guidestinatario,
            guiformapago: guiformapago,
            guiobservacion: guiobservacion,
            guiemiteurocal: guiemiteurocal,
            conductorid: conductorid,
            vehiculoid: vehiculoid,
            productorid: productorid,
            carga: carga
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

    async deleteGuiaRemision(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await guiaremisionModel.deleteGuiaRemision(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "GuiaRemision no registrado", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar guia remisiom", tipo: "error" });
        }
    },

    async deleteCarga(req, res){
        const { id } = req.params;

        try {
            let rowCount = await guiaremisionModel.deleteCarga(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "GuiaRemision no registrado", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar guia remisiom", tipo: "error" });
        }

    },
}