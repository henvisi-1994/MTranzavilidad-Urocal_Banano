// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
//const userDto = require('./users.dto');

const modeloProducto = require('./producto.model');
const validation = require('../../utils/validations');

module.exports = {
    // Agrega un nuevo producto
    async crearProducto(req, res) {
        const { pronombre, provariedad, procaracteristica, procodigo } = req.body;

        // Valida que las variables no esten vacias
        if (validation.emptyField(pronombre) || validation.emptyField(provariedad) || validation.emptyField(procaracteristica) ||
            validation.emptyField(procodigo)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                await modeloProducto.crearProducto({ pronombre, provariedad, procaracteristica, procodigo })

                return res.status(201).send({ message: 'Producto registrado' });
            } catch (error) {
                if (error.code == '23505') {
                    res.status(400).send({ message: "Ya existe un producto con el código que ha ingresado" });
                } else {
                    return res.status(500).send({ message: "Error al registrar producto" });
                }
            }
        }
    },

    // Obtener todos los productos
    async obtenerTodosProducto(req, res) {
        const result = await modeloProducto.obtenerTodosProducto()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(result); // <--
    },

    // Obtener un producto por ID
    async obtenerProducto(req, res) {
        const { id } = req.params;
        const product = await modeloProducto.obtenerProducto(id);
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return product === undefined ? res.status(200).send({}) : res.status(200).send(product);
    },

    // Actualiza un producto
    async actualizarProducto(req, res) {
        const { id } = req.params;
        const { pronombre, provariedad, procaracteristica, procodigo } = req.body;

        if (validation.emptyField(pronombre) || validation.emptyField(provariedad) || validation.emptyField(procaracteristica) ||
            validation.emptyField(procodigo)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                const rowCount = await modeloProducto.actualizarProducto(id, { pronombre, provariedad, procaracteristica, procodigo })

                return rowCount == 1 ? res.status(200).send({ message: "Producto actualizado" }) : res.status(400).send({ message: "Producto no registrado" });
            } catch (error) {
                if (error.code == '23505') {
                    return res.status(400).send({ message: "Ya existe un producto con el código que ha ingresado" });
                }

                return res.status(400).send({ message: "Error al actualizar producto" });
            }
        }
    },

    // Elimina un producto
    async eliminarProducto(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await modeloProducto.eliminarProducto(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "Producto eliminado" });
            } else {
                return res.status(400).send({ message: "Producto no registrado" });
            }

        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "El producto a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                return res.status(400).send({ message: "Error al eliminar producto" });
            }
        }
    },
    // Obtener todos los productos cacao con sus detalles
    async obtenerDetallesCacao(req, res) {
        const result = await modeloProducto.obtenerDetallesCacao()
        return res.status(200).send(result);
    },
}