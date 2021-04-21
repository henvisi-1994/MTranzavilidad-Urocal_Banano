import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // ------------------------------------- AUTENTICACION -------------------------------------
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/BaseLogin.vue'),
  },
  // -----------------------------------------------------------------------------------------

  // ------------------------------------- ADMINISTRADOR -------------------------------------
  // ------------------------------ ADMINISTRADOR - CONFIGURACION ----------------------------
  {
    path: '/configuracion/usuario',
    name: 'BaseUsuarioPersona',
    component: () => import('@/views/BaseUsuarioPersona.vue'),
  },
  {
    path: '/configuracion/asociacion',
    name: 'BaseAsociacion',
    component: () => import('@/views/BaseAsociacion.vue'),
  },
  {
    path: '/configuracion/finca',
    name: 'BaseFinca',
    component: () => import('@/views/BaseFinca.vue'),
  },
  {
    path: '/configuracion/centroacopio',
    name: 'BaseCentroacopio',
    component: () => import('@/views/BaseCentroacopio.vue'),
  },
  {
    path: '/configuracion/conductor',
    name: 'BaseConductorPersona',
    component: () => import('@/views/BaseConductorPersona.vue'),
  },
  {
    path: '/configuracion/inspector',
    name: 'BaseInspectorPersona',
    component: () => import('@/views/BaseInspectorPersona.vue'),
  },
  {
    path: '/configuracion/exportador',
    name: 'BaseExportadorPersona',
    component: () => import('@/views/BaseExportadorPersona.vue'),
  },
  {
    path: '/configuracion/operario',
    name: 'BaseOperarioPersona',
    component: () => import('@/views/BaseOperarioPersona.vue'),
  },
  {
    path: '/configuracion/productor',
    name: 'BaseProductorPersona',
    component: () => import('@/views/BaseProductorPersona.vue'),
  },
  {
    path: '/configuracion/respcentroacopio',
    name: 'BaseRespacopio',
    component: () => import('@/views/BaseRespacopio.vue'),
  },
  {
    path: '/configuracion/pais',
    name: 'BasePais',
    component: () => import('@/views/BasePais.vue'),
  },
  {
    path: '/configuracion/provincia',
    name: 'BaseProvincia',
    component: () => import('@/views/BaseProvincia.vue'),
  },
  {
    path: '/configuracion/ciudad',
    name: 'BaseCiudad',
    component: () => import('@/views/BaseCiudad.vue'),
  },
  {
    path: '/configuracion/sitio',
    name: 'BaseSitio',
    component: () => import('@/views/BaseSitio.vue'),
  },
  // -----------------------------------------------------------------------------------------

  // ------------------------------------- PRODUCTOR -----------------------------------------
  // -------------------------------- PRODUCTOR - BANANO ------------------------------------- 

  // -------------------------------- PRODUCTOR - CACAO -------------------------------------- 
  {
    path: '/cacao/siembra',
    name: 'BaseSiembra',
    component: () => import('@/views/BaseSiembra.vue'),
  },
  {
    path: '/cacao/limpiezaherramienta',
    name: 'BaseLimpiezaHerramienta',
    component: () => import('@/views/BaseLimpiezaHerramienta.vue'),
  },
  {
    path: '/cacao/poda',
    name: 'BasePoda',
    component: () => import('@/views/BasePoda.vue')
  },
  {
    path: '/cacao/fertilizacion',
    name: 'BaseFertilizacion',
    component: () => import('@/views/BaseFertilizacion.vue')
  },
  {
    path: '/cacao/maleza',
    name: 'BaseMalezaControl',
    component: () => import('@/views/BaseMalezaControl.vue')
  },
  {
    path: '/cacao/fitosanitario',
    name: 'BaseFitosanitario',
    component: () => import('@/views/BaseFitosanitario.vue')
  },
  {
    path: '/cacao/riego',
    name: 'BaseRiego',
    component: () => import('@/views/BaseRiego.vue')
  },
  {
    path: '/cacao/cosecha',
    name: 'BaseCosecha',
    component: () => import('@/views/BaseCosecha.vue'),
  },
  {
    path: '/cacao/guiaremision',
    name: 'BaseGuiaRemision',
    component: () => import('@/views/BaseGuiaRemision.vue'),
  },
  {
    path: '/cacao/tratamiento',
    name: 'BaseTratamiento',
    component: () => import('@/views/BaseTratamiento.vue'),
  },
  // -------------------------------- PRODUCTOR - FINCA ------------------------------------  
  {
    path: '/finca/lote',
    name: 'BaseLote',
    component: () => import('@/views/BaseLote.vue'),
  },
  {
    path: '/finca/monitoreoroedor',
    name: 'MonitoreoRoedorFinca',
    component: () => import('@/views/BaseMonitoreoRoedorFinca.vue'),
  },
  {
    path: '/finca/limpiezavehiculo',
    name: 'BaseFincaLimpiezaVehiculo',
    component: () => import('@/views/BaseLimpiezaVehiculo.vue'),
  },
  // ---------------------------------------------------------------------------------------

  // -------------------------------- CENTRO ACOPIO ----------------------------------------
  // --------------------------- CENTRO ACOPIO - BANANO ------------------------------------
  // --------------------------- CENTRO ACOPIO - CACAO -------------------------------------
  {
    path: '/centroacopio/compra',
    name: 'BaseCompra',
    component: () => import('@/views/BaseCompra.vue'),
  },
  {
    path: '/centroacopio/almacenamiento',
    name: 'BaseAlmacenamiento',
    component: () => import('@/views/BaseAlmacenamiento.vue'),
  },
  {
    path: '/centroacopio/despacho',
    name: 'BaseDespacho',
    component: () => import('@/views/BaseDespacho.vue')
  },
  // --------------------------- CENTRO ACOPIO - CENTRO ACOPIO -----------------------------
  {
    path: '/centroacopio/monitoreoroedor',
    name: 'MonitoreoRoedorCentroAcopio',
    component: () => import('@/views/BaseMonitoreoRoedorCentroAcopio.vue'),
  },
  {
    path: '/centroacopio/vehiculo',
    name: 'BaseVehiculo',
    component: () => import('@/views/BaseVehiculo.vue'),
  },
  {
    path: '/centroacopio/limpiezavehiculo',
    name: 'BaseCentroAcopioLimpiezaVehiculo',
    component: () => import('@/views/BaseLimpiezaVehiculo.vue'),
  },
  {
    path: '/centroacopio/limpiezacentroacopio',
    name: 'BaseLimpiezaCentroAcopio',
    component: () => import('@/views/BaseLimpiezaCentroAcopio.vue')
  },
  {
    path: '/centroacopio/insumosEgresos',
    name: 'BaseEgresoInsumo',
    component: () => import('@/views/BaseEgresoInsumo.vue'),
  },
  {
    path: '/centroacopio/insumosIngresos',
    name: 'BaseIngresoInsumo',
    component: () => import('@/views/BaseIngresoInsumo.vue'),
  },
  // -----------------------------------------------------------------------------------------

  // ------------------------------------- EXPORTADOR ----------------------------------------
  // -------------------------------- EXPORTADOR - BANANO ------------------------------------
  // -------------------------------- EXPORTADOR - CACAO -------------------------------------
  {
    path: '/cacao/registroEnvio',
    name: 'BaseRegistroEnvio',
    component: () => import('@/views/BaseRegistroEnvio.vue'),
  },
  {
    path: '/puerto/facturaExportacion',
    name: 'BaseFactExport',
    component: () => import('@/views/BaseFactExport.vue'),
  },
    /// Empresa
    {
      path: '/configuracion/Empresa',
      name: 'BaseEmpresa',
      component: () => import('@/views/BaseEmpresa.vue'),
    },
      /// Certificaciones
  {
    path: '/configuracion/Certificaciones',
    name: 'BaseEmpresa',
    component: () => import('@/views/BaseCertificaciones.vue'),
  },
     // ------------------------------------- REPORTES ----------------------------------------
  // -------------------------------- INGRESO INSUMO ------------------------------------
  // -------------------------------- EGRESO INSUMO -------------------------------------
  {
    path: '/reportes/ingreso-insumo',
    name: 'BaseIngresoInsumo',
    component: () => import('@/views/BaseReporteIngresoInsumo.vue'),
  },
  {
    path: '/reportes/egreso-insumo',
    name: 'BaseEgresoInsumo',
    component: () => import('@/views/BaseReporteEgresoInsumo.vue'),
  },
  // -----------------------------------------------------------------------------------------
// --------------------------- REPORTES -----------------------------
   {
    path: '/reporte/reporteCompra',
    name: 'BaseReporteCompra',
    component: () => import('@/views/BaseReporteCompra.vue'),
  },
  {
    path: '/reporte/reporteKardexProductos',
    name: 'BaseReporteKardexProductos',
    component: () => import('@/views/BaseReporteKardexProductos.vue'),
  },

  {
    path: '/reporte/reporteKardexIngresosEgresos',
    name: 'BaseReporteKardexIngresosEgresos',
    component: () => import('@/views/BaseReporteKardexIngresosEgresos.vue'),
  },
  {
    path: "/reportes/ventas",
    name: "BaseReporteVentas",
    component: () => import("@/views/BaseReporteVentas.vue"),
  },
  {
    path: '/reporte/fincaproductor',
    name: 'BaseReporteFincaProductor',
    component: () => import('@/views/BaseReporteFincaProductor.vue'),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


export default router
