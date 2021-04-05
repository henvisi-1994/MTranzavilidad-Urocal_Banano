import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//Modulos
import ModuloAutenticacion from './modules/ModuloAutenticacion';
import ModuloValidacionForm from './modules/ModuloValidacionForm';
import ModuloGestionDialogos from './modules/ModuloGestionDialogos';
import ModuloBarraLateralOpciones from './modules/ModuloBarraLateralOpciones';

import ModuloLote from './modules/ModuloLote';
import ModuloProducto from './modules/ModuloProducto';
import ModuloMedioAmbiente from './modules/ModuloMedioAmbiente';
import ModuloSuelo from './modules/ModuloSuelo';
import ModuloUsuarioPersona from './modules/ModuloUsuarioPersona';
import ModuloConductorPersona from './modules/ModuloConductorPersona';
import ModuloOperarioPersona from './modules/ModuloOperarioPersona';
import ModuloProductorPersona from './modules/ModuloProductorPersona';
import ModuloMaleza from './modules/ModuloMaleza';
import ModuloSiembra from './modules/ModuloSiembra';
import ModuloLimpiezaHerramienta from './modules/ModuloLimpiezaHerramienta';
import ModuloMonitoreoRoedorCentroAcopio from './modules/ModuloMonitoreoRoedorCentroAcopio';
import ModuloMonitoreoRoedorFinca from './modules/ModuloMonitoreoRoedorFinca';
import ModuloLimpiezaVehiculo from './modules/ModuloLimpiezaVehiculo';
import ModuloVehiculo from './modules/ModuloVehiculo';
import ModuloPoda from './modules/ModuloPoda';
import ModuloFertilizante from './modules/ModuloFertilizante';
import ModuloFitosanitario from './modules/ModuloFitosanitario';
import ModuloRiego from './modules/ModuloRiego';
import ModuloCentroacopio from './modules/ModuloCentroacopio';
import ModuloEgresoInsumo from './modules/ModuloEgresoInsumo';
import ModuloIngresoInsumo from './modules/ModuloIngresoInsumo';
import ModuloCosecha from './modules/ModuloCosecha';
import ModuloTratamiento from './modules/ModuloTratamiento';
import ModuloRespacopio from './modules/ModuloRespacopio';
import ModuloFinca from './modules/ModuloFinca';
import ModuloAsociacion from './modules/ModuloAsociacion';
import ModuloPais from './modules/ModuloPais';
import ModuloProvincia from './modules/ModuloProvincia';
import ModuloCiudad from './modules/ModuloCiudad';
import ModuloSitio from './modules/ModuloSitio';
import ModuloAlmacenamiento from './modules/ModuloAlmacenamiento';
import ModuloRevisionHumedad from './modules/ModuloRevisionHumedad';
import ModuloCompra from './modules/ModuloCompra';
import ModuloDetalleCompra from './modules/ModuloDetalleCompra';
import ModuloLimpiezaCentroAcopio from './modules/ModuloLimpiezaCentroAcopio';
import ModuloDespacho from './modules/ModuloDespacho';
import ModuloDetalleDespacho from './modules/ModuloDetalleDespacho';
import ModuloInspectorPersona from './modules/ModuloInspectorPersona';
import ModuloExportadorPersona from './modules/ModuloExportadorPersona';
import ModuloGuiaRemision from './modules/ModuloGuiaRemision';
import ModuloFacturaExport from './modules/ModuloFacturaExport';

import ModuloCultivo from './modules/ModuloCultivo';

export default new Vuex.Store({
  state: {
    layout: 'layout-login',        // Variable que indica el layout a renderizar
    barraLateral: false,          // Variable que indica si se abre la barra lateral
    miniBarraLateral: false,      // Variable que indica si se abre la mini barra lateral
  },

  mutations: {
    //  Modifica el contenido de la variable layout
    colocarLayout(state, newLayout) {
      state.layout = newLayout
    },

    // Modifica el contenido de la variable barraLateral
    toggleBarraLateral(state, newState) {
      state.barraLateral = newState;
    },

    // Modifica el contenido de la variable miniBarraLateral
    toggleMiniBarraLateral(state, newState) {
      state.miniBarraLateral = newState;
    },
  },

  actions: {
  },

  getters: {
    barraLateral: (state) => state.barraLateral,                          // Devuelve la variable barraLateral
    miniBarraLateral: (state) => state.miniBarraLateral                   // Devuelve la variable miniBarraLateral
  },

  modules: {
    // Generales
    moduloAutenticacion: ModuloAutenticacion,                               // Instancia al ModuloAutenticacion
    validacionForm: ModuloValidacionForm,                                   // Instancia al ModuloValidacionForm
    gestionDialogos: ModuloGestionDialogos,                                 // Instancia al ModuloGestionDialogos
    moduloBarraLateralOpciones: ModuloBarraLateralOpciones,                 // Instancia al modulo ModuloBarraLateralOpciones

    // Tablas
    moduloLote: ModuloLote,                                                 // Instancia al ModuloLote
    moduloCentroacopio: ModuloCentroacopio,                                 // Instancia al ModuloCentroacopio
    moduloProducto: ModuloProducto,                                         // Instancia al ModuloProducto
    moduloMedioAmbiente: ModuloMedioAmbiente,                               // Instancia al ModuloMedioAmbiente
    moduloSuelo: ModuloSuelo,                                               // Instancia al ModuloSuelo
    moduloUsuarioPersona: ModuloUsuarioPersona,                             // Instancia al ModuloUsuarioPersona
    moduloConductorPersona: ModuloConductorPersona,                         // Instancia al ModuloUsuarioPersona
    moduloOperarioPersona: ModuloOperarioPersona,                           // Instancia al ModuloOperarioPersona
    moduloProductorPersona: ModuloProductorPersona,                         // Instancia al ModuloProductorPersona
    moduloMaleza: ModuloMaleza,                                             // Instancia al ModuloMaleza
    moduloSiembra: ModuloSiembra,                                           // Instancia al ModuloSiembra
    moduloLimpiezaHerramienta: ModuloLimpiezaHerramienta,                   // Instancia al ModuloLimpiezaHerramienta
    moduloMonitoreoRoedorCentroAcopio: ModuloMonitoreoRoedorCentroAcopio,   // Instancia al ModuloMonitoreoRoedorCentroAcopio
    moduloMonitoreoRoedorFinca: ModuloMonitoreoRoedorFinca,                 // Instancia al ModuloMonitoreoRoedorFinca
    moduloLimpiezaVehiculo: ModuloLimpiezaVehiculo,                         // Instancia al ModuloLimpiezaVehiculo
    moduloVehiculo: ModuloVehiculo,                                         // Instancia al ModuloVehiculo
    moduloPoda: ModuloPoda,                                                 // Instancia al ModuloPoda
    moduloFertilizante: ModuloFertilizante,                                 // Instancia al ModuloFertilizante
    moduloFitosanitario: ModuloFitosanitario,                               // Instancia al ModuloFitosanitario
    moduloRiego: ModuloRiego,                                               // Instancia al ModuloRiego
    moduloEgresoInsumo: ModuloEgresoInsumo,                                 // Instancia al ModuloEgresoInsumo
    moduloIngresoInsumo: ModuloIngresoInsumo,                               // Instancia al ModuloIngresoInsumo
    moduloCosecha: ModuloCosecha,                                           // Instancia al ModuloCosecha
    moduloTratamiento: ModuloTratamiento,                                   // Instancia al ModuloTratamiento
    moduloRespacopio: ModuloRespacopio,                                     // Instancia al ModuloTratamiento
    moduloFinca: ModuloFinca,                                               // Instancia al ModuloFinca
    moduloAsociacion: ModuloAsociacion,                                     // Instancia al ModuloAsociación
    moduloPais: ModuloPais,                                                 // Instancia al ModuloPaís
    moduloProvincia: ModuloProvincia,                                       // Instancia al ModuloProvincia
    moduloCiudad: ModuloCiudad,                                             // Instancia al ModuloCiudad
    moduloSitio: ModuloSitio,                                               // Instancia al ModuloSitio
    moduloAlmacenamiento: ModuloAlmacenamiento,                             // Instancia al ModuloAlmacenamiento
    moduloRevisionHumedad: ModuloRevisionHumedad,                           // Instancia al ModuloRevisionHumedad
    moduloCompra: ModuloCompra,                                             // Instancia al ModuloCompra
    moduloDetalleCompra: ModuloDetalleCompra,                               // Instancia al ModuloDetalleCompra
    moduloLimpiezaCentroAcopio: ModuloLimpiezaCentroAcopio,                 // Instancia al ModuloLimpiezaCentroAcopio
    moduloDespacho: ModuloDespacho,                                         // Instancia al ModuloDespacho
    moduloDetalleDespacho: ModuloDetalleDespacho,                           // Instancia al ModuloDetalleDespacho
    moduloInspectorPersona: ModuloInspectorPersona,                         // Instancia al ModuloInspectorPersona
    moduloCultivo: ModuloCultivo,                                           // Instancia al ModuloCultivo
    moduloExportadorPersona: ModuloExportadorPersona,                       // Instancia al ModuloExportadorPersona
    moduloGuiaRemision: ModuloGuiaRemision,
    moduloFacturaExport: ModuloFacturaExport,
  }
})
