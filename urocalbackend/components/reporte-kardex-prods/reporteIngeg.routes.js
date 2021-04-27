const express = require("express");
const controller = require("./reporteIngeg.controller");

const router = express.Router();

router.get("/mes/:anio/:mes", controller.ingegPorMes);
router.get("/anio/:anio", controller.ingegPorAnio);
router.get("/rango/:inicio/:fin", controller.ingegPorRango);

module.exports = router;
