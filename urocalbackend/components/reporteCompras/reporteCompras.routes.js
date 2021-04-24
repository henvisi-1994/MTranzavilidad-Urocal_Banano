const express = require("express");
const controller = require("./reporteCompras.controller");

const router = express.Router();

router.get("/mes/:year/:month/:productor", controller.comprasPorMes);
router.get("/anio/:year/:productor", controller.comprasPorAnio);
router.get("/rango/:desde/:hasta/:productor", controller.comprasPorRango);

module.exports = router;
