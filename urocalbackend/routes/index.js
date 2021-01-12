const express = require('express');
const router = express.Router();

const auth = require('../components/login/auth.routes');
const users = require('../components/users/users.routes');
const fert = require('../components/fertilizacion/fertilizaciones.routes');
const podas = require('../components/podas/podas.routes');
const riegos = require('../components/riegos/riegos.routes');
const fitosanitarios = require('../components/fitosanitarios/fitosanitarios.routes');
const cultivatedLot = require('../components/cultivatedLot/cultivatedLot.routes');
const product = require('../components/product/product.routes');
const crop = require('../components/crop/crop.routes');
const soil = require('../components/soil/soil.routes');
const environment = require('../components/environment/environment.routes');
const maleza = require('../components/malezacontrol/maleza.routes');
const seeds = require('../components/seedquality/seeds.routes');
const sowing = require('../components/sowing/sowing.routes');
const collcenter = require('../components/collectioncenter/collectioncenter.routes');
const respcoll = require('../components/responsiblecollection/responsiblecollection.routes');
const cleaningTool = require('../components/cleaning-tool/cleaning-tool.routes');
const rodentMonitoring = require('../components/rodent-monitoring/rodent-monitoring.routes');
const rodentFarmMonitoring = require('../components/rodent-farm-monitoring/rodent-farm-monitoring.routes');
const rodentMonitoringGatheringCenter = require('../components/rodent-monitoring-gathering-center/rodent-monitoring-gathering-center.routes');

const VERSION = "/v1";

router.use(VERSION + '/', auth); 
router.use(VERSION + '/users', users);                      // Usuarios
router.use(VERSION + '/fertilizacion', fert);               // Fertilizacion
router.use(VERSION + '/podas', podas);                      // Podas
router.use(VERSION + '/riegos', riegos);                    // Riegos
router.use(VERSION + '/fitosanitarios', fitosanitarios);    // Fitosanitario
router.use(VERSION + '/cultivated-lot', cultivatedLot);     // LoteCultivado
router.use(VERSION + '/product', product);                  // Producto
router.use(VERSION + '/crop', crop);                        // Cultivo
router.use(VERSION + '/soil', soil);                        // Suelo
router.use(VERSION + '/environment', environment);          // MedioAmbiente
router.use(VERSION + '/malezacontrol', maleza);             // ControlMaleza
router.use(VERSION + '/seedquality', seeds);                // CalidadSemilla
router.use(VERSION + '/sowing', sowing);                    // Siembra
router.use(VERSION + '/collcenter', collcenter);            // CentroAcopio
router.use(VERSION + '/respcoll', respcoll);                // ResponsableAcopio
router.use(VERSION + '/cleaningTool', cleaningTool);                                        // LimpiezaHerramienta
router.use(VERSION + '/rodentMonitoring', rodentMonitoring);                                // MonitoreoRoedor
router.use(VERSION + '/rodentFarmMonitoring', rodentFarmMonitoring);                        // MonitoreoRoedor_Finca
router.use(VERSION + '/rodentMonitoringGatheringCenter', rodentMonitoringGatheringCenter);  // MonitoreoRoedor_CentroAcopio

module.exports = router;