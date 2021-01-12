const jwt = require('jsonwebtoken');
const usersModel = require('../components/users/users.model');

// Funcion que valida la existencia de un token por usuario
/*let verifyToken = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({ message: "No esta autorizado para ver esto" });
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') return res.status(401).json({ message: "No esta autorizado para ver esto" });

    let payload = jwt.verify(token, 'urocalskey');
    req.user_email = payload._id;
    next();
}*/

// Funcion que valida la existencia de un token por usuario
verificarToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) return res.status(403).send({ message: "No token provided!" });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ message: "Unauthorized!" });
        req.userId = decoded.id;
        next();
    });
};

// Verificar si el usuario es administrador
isAdmin = (req, res, next) => {
    console.log("Dentro de isAdmin: " + req.body);
    usersModel.getUserByPk(req.id).then(user => {
        if (user.usutipo === "administrador") {
            next();
            return;
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
    });


    /*User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });*/
};//----
/*
isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Moderator Role!"
            });
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }

                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Moderator or Admin Role!"
            });
        });
    });
};*/

const authJwt = { verificarToken, isAdmin };
module.exports = authJwt;