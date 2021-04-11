const express = require('express');
const router = express.Router();

const auth = require('../components/login/auth.routes');
const users = require('../components/users/users.routes');
const fert = require('../components/fertilizacion/fertilizaciones.routes');
const podas = require('../components/podas/podas.routes');
const riegos = require('../components/riegos/riegos.routes');
const fitosanitarios = require('../components/fitosanitarios/fitosanitarios.routes');
const loteCultivado = require('../components/loteCultivado/loteCultivado.routes');
const producto = require('../components/producto/producto.routes');
const cultivo = require('../components/cultivo/cultivo.routes');
const suelo = require('../components/suelo/suelo.routes');
const medioAmbiente = require('../components/medioAmbiente/medioAmbiente.routes');
const maleza = require('../components/malezacontrol/maleza.routes');
const seeds = require('../components/seedquality/seeds.routes');
const sowing = require('../components/sowing/sowing.routes');
const collcenter = require('../components/collectioncenter/collectioncenter.routes');
const respcoll = require('../components/responsiblecollection/responsiblecollection.routes');
const cleaningTool = require('../components/cleaning-tool/cleaning-tool.routes');
const limpiezaVehiculo = require('../components/limpiezaVehiculos/limpiezaV.routes');
const rodentMonitoring = require('../components/rodent-monitoring/rodent-monitoring.routes');
const rodentFarmMonitoring = require('../components/rodent-farm-monitoring/rodent-farm-monitoring.routes');
const rodentMonitoringGatheringCenter = require('../components/rodent-monitoring-gathering-center/rodent-monitoring-gathering-center.routes');
const finca = require('../components/finca/finca.routes');
const asociacion = require('../components/asociacion/asociacion.routes');
const pais = require('../components/pais/pais.routes');
const provincia = require('../components/provincia/provincia.routes');
const ciudad = require('../components/ciudad/ciudad.routes');
const sitio = require('../components/sitio/sitio.routes');
const limpiezaca = require('../components/limpieza-centro-acopio/limpiezacentroacopio.routes');
const despacho = require('../components/despacho/despacho.routes');
const detalledespacho = require('../components/detalle-despacho/detalledespacho.routes');
const almacenamiento = require('../components/almacenamiento/almacenamiento.routes');
const mix = require('../components/mix/mix.routes');
const compra = require('../components/compra/compra.routes');
const detalleCompra = require('../components/detalleCompra/detalleCompra.routes');
const revisionHumedad = require('../components/revisionHumedad/revisionHumedad.routes');
const conductor = require('../components/conductorpersona/ConductorPersona.routes');
const inspector = require('../components/inspectorpersona/InspectorPersona.routes');
const harvest = require('../components/harvests/harvests.routes');
const treatment = require('../components/treatments/treatments.routes');
const exportador = require('../components/exportadorpersona/ExportadorPersona.routes');
const productor = require('../components/productorpersona/ProductorPersona.routes');
const operario = require('../components/operariopersona/OperarioPersona.routes');
const ingreso = require('../components/ingresoInsumo/income.routes');
const egreso = require('../components/egresoIsumo/egress.routes');
const vehiculo = require('../components/vehiculo/vehiculo.routes');
const guiaremision = require('../components/guiaremision/guiaremision.routes');
const carga = require('../components/carga/carga.routes');
const facturaExportacion = require('../components/facturaExportacion/FacturaExport.routes');
const empresa = require('../components/empresa/empresa.routes');

const VERSION = "/v1";
router.use(VERSION + '/', auth);
router.use(VERSION + '/users', users);                                                      // Usuarios
router.use(VERSION + '/fertilizacion', fert);                                               // Fertilizacion
router.use(VERSION + '/podas', podas);                                                      // Podas
router.use(VERSION + '/riegos', riegos);                                                    // Riegos
router.use(VERSION + '/fitosanitarios', fitosanitarios);                                    // Fitosanitario
router.use(VERSION + '/lote', loteCultivado);                                               // LoteCultivado
router.use(VERSION + '/producto', producto);                                                // Producto
router.use(VERSION + '/cultivo', cultivo);                                                  // Cultivo
router.use(VERSION + '/suelo', suelo);                                                      // Suelo
router.use(VERSION + '/medio_ambiente', medioAmbiente);                                     // MedioAmbiente
router.use(VERSION + '/malezacontrol', maleza);                                             // ControlMaleza
router.use(VERSION + '/seedquality', seeds);                                                // CalidadSemilla
router.use(VERSION + '/sowing', sowing);                                                    // Siembra
router.use(VERSION + '/centroacopio', collcenter);                                            // CentroAcopio
router.use(VERSION + '/respcoll', respcoll);                                                // ResponsableAcopio
router.use(VERSION + '/cleaningTool', cleaningTool);                                        // LimpiezaHerramienta
router.use(VERSION + '/limpiezaVehiculo', limpiezaVehiculo);                                // LimpiezaHerramienta
router.use(VERSION + '/rodentMonitoring', rodentMonitoring);                                // MonitoreoRoedor
router.use(VERSION + '/rodentFarmMonitoring', rodentFarmMonitoring);                        // MonitoreoRoedor_Finca
router.use(VERSION + '/rodentMonitoringGatheringCenter', rodentMonitoringGatheringCenter);  // MonitoreoRoedor_CentroAcopio
router.use(VERSION + '/finca', finca);                                                      // Finca
router.use(VERSION + '/asociacion', asociacion);                                            // Asociacion
router.use(VERSION + '/pais', pais);                                                        // Pais
router.use(VERSION + '/provincia', provincia);                                              // Provincia
router.use(VERSION + '/ciudad', ciudad);                                                    // Ciudad
router.use(VERSION + '/sitio', sitio);                                                      // Sitio
router.use(VERSION + '/conductor', conductor);                                              // Conductor
router.use(VERSION + '/limpiezaCentroAcopio', limpiezaca);                                  // LimpiezaCentroAcopio
router.use(VERSION + '/despacho', despacho);                                                // Eespacho
router.use(VERSION + '/detalledespacho', detalledespacho);                                  // DetalleDespacho
router.use(VERSION + '/almacenamiento', almacenamiento);                                    // Almacenamiento
router.use(VERSION + '/revisionHumedad', revisionHumedad);                                  // RevisionHumedad
router.use(VERSION + '/mix', mix);                                                          // Mix
router.use(VERSION + '/compra', compra);                                                    // Compra
router.use(VERSION + '/detalleCompra', detalleCompra);                                      // DetalleCompra
router.use(VERSION + '/inspector', inspector);                                              // Conductor
router.use(VERSION + '/harvests', harvest);                                                 // Cosecha
router.use(VERSION + '/treatments', treatment);                                             // Tratamiento
router.use(VERSION + '/exportador', exportador);                                            // Exportador
router.use(VERSION + '/productor', productor);                                              // Productor
router.use(VERSION + '/operario', operario);                                                // Operario
router.use(VERSION + '/ingreso_insumo', ingreso);                                           // Ingreso insumo
router.use(VERSION + '/egreso_insumo', egreso);                                             // Egreso insumo
router.use(VERSION + '/guiaremision', guiaremision);
router.use(VERSION + '/carga', carga);
router.use(VERSION + '/vehiculo', vehiculo);
router.use(VERSION + '/facturaExport',facturaExportacion);
router.use(VERSION + '/empresa',empresa);

module.exports = router;