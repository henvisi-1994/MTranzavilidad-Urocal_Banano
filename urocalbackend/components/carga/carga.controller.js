
const cargaModel = require('./carga.model');

module.exports = {
    async getCargas(req, res) {
        const { id } = req.params;
        const rows = await cargaModel.getCargas(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Cargas no encontradas" });
    },
}