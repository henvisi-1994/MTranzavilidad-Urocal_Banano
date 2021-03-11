
const fertilizacionesModel = require('./fertilizaciones.model');

module.exports = {
    async getFertilizaciones(req, res) {
        const fertilizaciones = await fertilizacionesModel.getFertilizaciones();
        return res.status(200).send(fertilizaciones);
    },

    async getFertilizacion(req, res) {
        const { id } = req.params;
        const rows = await fertilizacionesModel.getFertilizacion(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Fertilizacion no encontrado" });
    },


    async createFertilizacion(req, res) {

        // Añadir capa de validación

        const { ferciclo, ferfecha, fernombrecomercial, ferelementos, ferconcentracion, ferareaaplicada, fercantidadaplicada, ferunidadmedida, ferequipoaplicacion, fermetodoaplicacion, feroperario, cultivoid } = req.body;

        try {
            await fertilizacionesModel.createFertilizacion({
                ferciclo: ferciclo,
                ferfecha: ferfecha,
                fernombrecomercial: fernombrecomercial,
                ferelementos: ferelementos,
                ferconcentracion: ferconcentracion,
                ferareaaplicada: ferareaaplicada,
                fercantidadaplicada: fercantidadaplicada,
                ferunidadmedida: ferunidadmedida,
                ferequipoaplicacion: ferequipoaplicacion,
                fermetodoaplicacion: fermetodoaplicacion,
                feroperario: feroperario,
                cultivoid: cultivoid
            });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
        }

        return res.status(201).send({ message: "Registro exitoso" });
    },

    async updateFertilizacion(req, res) {
        const { id } = req.params;
        const { ferciclo, ferfecha, fernombrecomercial, ferelementos, ferconcentracion, ferareaaplicada, fercantidadaplicada, ferunidadmedida, ferequipoaplicacion, fermetodoaplicacion, feroperario, cultivoid } = req.body;

        const rowCount = await fertilizacionesModel.updateFertilizacion(id, {
            ferciclo: ferciclo,
            ferfecha: ferfecha,
            fernombrecomercial: fernombrecomercial,
            ferelementos: ferelementos,
            ferconcentracion: ferconcentracion,
            ferareaaplicada: ferareaaplicada,
            fercantidadaplicada: fercantidadaplicada,
            ferunidadmedida: ferunidadmedida,
            ferequipoaplicacion: ferequipoaplicacion,
            fermetodoaplicacion: fermetodoaplicacion,
            feroperario: feroperario,
            cultivoid: cultivoid
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

    async deleteFertilizacion(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await fertilizacionesModel.deleteFertilizacion(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Fertilizacion no registrado", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar fertilizacion", tipo: "error" });
        }
    },
}