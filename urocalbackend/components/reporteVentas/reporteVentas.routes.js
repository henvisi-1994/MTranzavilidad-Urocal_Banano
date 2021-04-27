const express = require("express");
const controller = require("./reporteVentas.controller");

const router = express.Router();

router.get("/mes/:year/:month/:exportador", controller.ventasPorMes);
router.get("/anio/:year/:exportador", controller.ventasPorAnio);
router.get("/rango/:desde/:hasta/:exportador", controller.ventasPorRango);

module.exports = router;
