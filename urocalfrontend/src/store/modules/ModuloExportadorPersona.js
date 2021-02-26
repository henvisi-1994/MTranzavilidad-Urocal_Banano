import ModeloExportadorPersona from '../../models/ModeloExportadorPersona';

export default {
    namespaced: true,

    state: {
        listaCiudadStore: [],
        listaExportadorPersonaStore: [],
        modeloExportadorPersonaStore: new ModeloExportadorPersona('', '', '', '', '', '', '', '', '', '', ''), 
        formExportadorPersonaValido: false, // Indica si el formulario de lote es valido
    },

    actions: {

    },

    mutations: {

        // SETTERS
        establecerModeloExportadorPersonaStore(state, nuevaPersona) {
            state.modeloExportadorPersonaStore = nuevaPersona;
        },

        establecerListaCiudadStore(state, newState) {
            state.listaCiudadStore = newState;
        },

        establecerListaExportadorPersonaStore(state, newState) {
            state.listaExportadorPersonaStore = newState;
        },


        // LIMPIADORES
        vaciarModeloExportadorPersonaStore(state) {
            state.modeloExportadorPersonaStore = new ModeloExportadorPersona('', '', '', '', '', '', '', '', '', '', '');
        },


        // VALIDATORS
        cambiarEstadoFormExportadorPersonaValido(state, nuevoEstado) {
            state.formExportadorPersonaValido = nuevoEstado
        },
    },

    getters: {
        formExportadorPersonaValido: (state) => state.formExportadorPersonaValido, // Devuelve la variable formUsuarioValido
        modeloExportadorPersonaStore: (state) => state.modeloExportadorPersonaStore,
        listaCiudadStore: (state) => state.listaCiudadStore,
        listaExportadorPersonaStore: (state) => state.listaExportadorPersonaStore,
    },
}