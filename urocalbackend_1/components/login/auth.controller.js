const pool = require('../../services/postgresql/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {

    // Recibe cedula y clave
    async login(req, res) {
        let query, userData, validatePassword, token;
        const { percedula, usuclave } = req.body;

        query = `SELECT personaid, usuclave, usutipo FROM usuario WHERE personaid=(SELECT personaid FROM persona WHERE percedula='${percedula}');`;
        userData = await pool.query(query);

        if (userData.rows == 0) return res.status(400).send({ message: "Este usuario no se encuentra registrado" });

        // Comparar contraseña con la guardada en la BD
        validatePassword = await bcrypt.compareSync(usuclave, userData.rows[0].usuclave);

        // Si no son iguales
        if (!validatePassword) return res.status(400).send({ message: "Contraseña incorrecta" });

        token = jwt.sign({ _id: usuclave }, process.env.SECRET);

        res.header('x-access-token', token).json({ accessToken: token, id: userData.rows[0].personaid, rol: userData.rows[0].usutipo });
    }
}
