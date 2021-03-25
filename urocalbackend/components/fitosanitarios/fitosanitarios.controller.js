
const fitosanitariosModel = require('./fitosanitarios.model');

module.exports = {
    async getFitosanitarios(req, res) {
        const fitosanitarios = await fitosanitariosModel.getFitosanitarios();
        return res.status(200).send(fitosanitarios);
    },

    async getFitosanitario(req, res) {
        const { id } = req.params;
        const rows = await fitosanitariosModel.getFitosanitario(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Fitosanitario no encontrada" });
    },

    async createFitosanitario(req, res) {

        // Añadir capa de validación
        const { fitciclo, fitfecha, fitnombrecomercial, fitingredienteactivo, fitautorizaciontecnica, fitnombrecomun, fitdosis, fitcantidadtotal, fitareaplicada, fitequipoaplicacion, fitmetodo, fitplazoseguridad, fitoperario, cultivoid } = req.body;

        try {
            console.log("entro")
            await fitosanitariosModel.createFitosanitario({
            fitciclo, fitfecha, fitnombrecomercial, fitingredienteactivo, fitautorizaciontecnica, fitnombrecomun, fitdosis, fitcantidadtotal, fitareaplicada, fitequipoaplicacion, fitmetodo, fitplazoseguridad, fitoperario, cultivoid
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Registro fallido" , messagee:error });
        }

        return res.status(201).send({ message: "Registro exitoso" });
    },

    async updateFitosanitario(req, res) {
        const { id } = req.params;
        const { fitciclo, fitfecha, fitnombrecomercial, fitingredienteactivo, fitautorizaciontecnica, fitnombrecomun, fitdosis, fitcantidadtotal, fitareaplicada, fitequipoaplicacion, fitmetodo, fitplazoseguridad, fitoperario, cultivoid, condicionclimaticaid } = req.body;

        const rowCount = await fitosanitariosModel.updateFitosanitario(id, {
        fitciclo, fitfecha, fitnombrecomercial, fitingredienteactivo, fitautorizaciontecnica, fitnombrecomun, fitdosis, fitcantidadtotal, fitareaplicada, fitequipoaplicacion, fitmetodo, fitplazoseguridad, fitoperario, cultivoid, condicionclimaticaid
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

    async deleteFitosanitario(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await fitosanitariosModel.deleteFitosanitario(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Fitosanitario no registrada", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar fitosanitario", tipo: "error" });
        }
    },
}