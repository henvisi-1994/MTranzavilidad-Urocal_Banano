import ModeloReporteFinca from '../../models/ModeloReporteFinca';

export default {
    namespaced: true,

    state: {
        //listaCiudadStore: [],
        listaReporteFinca: [],
        modeloReporteFinca: new ModeloReporteFinca('', '', '', '', '', '', '', '', '', '', '', ''), 
        //formProductorPersonaValido: false, // Indica si el formulario de lote es valido
    },

    mutations: {

        // SETTERS
        establecerModeloProductorFincaStore(state, nuevaPersona) {
            state.modeloReporteFinca = nuevaPersona;
        },

        establecerListaFincaStore(state, newState) {
            state.listaReporteFinca = newState;
        },

    },

    getters: {
        modeloReporteFinca: (state) => state.modeloReporteFinca,
        listaReporteFinca: (state) => state.listaReporteFinca,
    },
}