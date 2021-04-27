const modeloProductor = require('./productorreporte.model');
const productorDto = require('./productorreporte.dto');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {

    // SELECT: Devuelve todos los registros
    async obtenerProductor(req, res) {
        const { id } = req.params;
        const rowsProductorPersonas = await modeloProductor.obtenerProductor(id);
        return rowsProductorPersonas != null ? res.status(200).send(productorDto.multipleProductorPersona(rowsProductorPersonas)) : res.status(404).send({ message: "Registro no encontrado" });
    },

    // SELECT: Devuelve todos los registros
    async obtenerProductores(req, res) {
        const rowsProductorPersonas = await modeloProductor.obtenerProductores();
        return rowsProductorPersonas != null ? res.status(200).send(productorDto.multipleProductorPersona(rowsProductorPersonas)) : res.status(404).send({ message: "Registro no encontrado" });
    },

    // SELECT: Devuelve todos los registros Masculinos
    async obtenerProductoresMasculino(req, res) {
        const rowsProductorPersonas = await modeloProductor.obtenerProductoresMasculino();
        return rowsProductorPersonas != null ? res.status(200).send(productorDto.multipleProductorPersona(rowsProductorPersonas)) : res.status(404).send({ message: "Registro no encontrado" });
    },

    // SELECT: Devuelve todos los registros Femenino
    async obtenerProductoresFemenino(req, res) {
        const rowsProductorPersonas = await modeloProductor.obtenerProductoresFemenino();
        return rowsProductorPersonas != null ? res.status(200).send(productorDto.multipleProductorPersona(rowsProductorPersonas)) : res.status(404).send({ message: "Registro no encontrado" });
    },
}
