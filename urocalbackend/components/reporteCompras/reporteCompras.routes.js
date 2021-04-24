const express = require("express");
const controller = require("./reporteCompras.controller");

const router = express.Router();

router.get("/mes/:year/:month", controller.comprasPorMes);
router.get("/anio/:year", controller.comprasPorAnio);
router.get("/rango/:desde/:hasta", controller.comprasPorRango);

module.exports = router;
