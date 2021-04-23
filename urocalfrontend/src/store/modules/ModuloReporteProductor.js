import ModeloReporteProductor from '../../models/ModeloReporteProductor';

export default {
    namespaced: true,

    state: {
        listaProductorPersonaStore: [],
        modeloProductorPersonaStore: new ModeloReporteProductor('', '', '', '', '', '', '', '', '', '', '', '', '', ''), 
    },

    actions: {

    },

    mutations: {

        // SETTERS
        establecerModeloProductorPersonaStore(state, nuevaPersona) {
            state.modeloProductorPersonaStore = nuevaPersona;
        },

        establecerListaProductorPersonaStore(state, newState) {
            state.listaProductorPersonaStore = newState;
        },

    },

    getters: {
        modeloProductorPersonaStore: (state) => state.modeloProductorPersonaStore,
        listaProductorPersonaStore: (state) => state.listaProductorPersonaStore,
    },
}