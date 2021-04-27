const modeloProductor = require('./productorreporte.model');
const productorDto = require('./productorreporte.dto');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {

    // SELECT: Devuelve todos los registros
    async obtenerProductor(req, res) {
        const { id } = req.params;
        const finca = await modeloProductor.obtenerProductor(id);
        return finca != null ? res.status(200).send(productorDto.multipleProductorPersona(finca)) : res.status(404).send({ message: "Registro no encontrado" });
    },
}

