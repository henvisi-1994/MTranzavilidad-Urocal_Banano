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
import ModuloOperarioPersona from './modules/ModuloOperarioPersona';
import ModuloProductorPersona from './modules/ModuloProductorPersona';
import ModuloMaleza from './modules/ModuloMaleza';
import ModuloSiembra from './modules/ModuloSiembra';
import ModuloLimpiezaHerramienta from './modules/ModuloLimpiezaHerramienta';
import ModuloMonitoreoRoedorCentroAcopio from './modules/ModuloMonitoreoRoedorCentroAcopio';
import ModuloMonitoreoRoedorFinca from './modules/ModuloMonitoreoRoedorFinca';
import ModuloLimpiezaVehiculo from './modules/ModuloLimpiezaVehiculo';
import ModuloVehiculo from './modules/ModuloVehiculo';
import ModuloReporteEmbarque from './modules/ModuloReporteEmbarque';
import ModuloPoda from './modules/ModuloPoda';
import ModuloFertilizante from './modules/ModuloFertilizante';
import ModuloFitosanitario from './modules/ModuloFitosanitario';
import ModuloRiego from './modules/ModuloRiego';

export default new Vuex.Store({
  state: {
    layout: 'LayoutLogin',        // Variable que indica el layout a renderizar
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
    moduloProducto: ModuloProducto,                                         // Instancia al modulo ModuloProducto
    moduloMedioAmbiente: ModuloMedioAmbiente,                               // Instancia al ModuloMedioAmbiente
    moduloSuelo: ModuloSuelo,                                               // Instancia al ModuloSuelo
    moduloUsuarioPersona: ModuloUsuarioPersona,                             // Instancia al ModuloUsuarioPersona
    moduloOperarioPersona: ModuloOperarioPersona,                           // Instancia al ModuloOperarioPersona
    moduloProductorPersona: ModuloProductorPersona,                         // Instancia al ModuloProductorPersona
    moduloMaleza: ModuloMaleza,                                             // Instancia al modulo ModuloMaleza
    moduloSiembra: ModuloSiembra,                                           // Instancia al modulo ModuloSiembra
    moduloLimpiezaHerramienta: ModuloLimpiezaHerramienta,                   // Instancia al modulo ModuloLimpiezaHerramienta
    moduloMonitoreoRoedorCentroAcopio: ModuloMonitoreoRoedorCentroAcopio,   // Instancia al modulo ModuloMonitoreoRoedorCentroAcopio
    moduloMonitoreoRoedorFinca: ModuloMonitoreoRoedorFinca,                 // Instancia al modulo ModuloMonitoreoRoedorFinca
    moduloLimpiezaVehiculo: ModuloLimpiezaVehiculo,                         // Instancia al ModuloLimpiezaVehiculo
    moduloVehiculo: ModuloVehiculo,                                         // Instancia al ModuloVehiculo
    moduloReporteEmbarque: ModuloReporteEmbarque,
    moduloPoda: ModuloPoda,                                                 // Instancia al ModuloPoda
    moduloFertilizante: ModuloFertilizante,                                 // Instancia al ModuloFertilizante
    moduloFitosanitario: ModuloFitosanitario,                               // Instancia al ModuloFitosanitario
    moduloRiego: ModuloRiego,                                               // Instancia al ModuloRiego
  }
})
