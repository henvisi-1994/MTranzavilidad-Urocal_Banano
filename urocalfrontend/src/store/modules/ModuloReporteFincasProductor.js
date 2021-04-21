import ModeloReporteFincasProductor from '../../models/ModeloReporteFinca';

export default {
    namespaced: true,

    state: {
        //listaCiudadStore: [],
        listaReporteFincasProductor: [],
        modeloReporteFincasProductor: new ModeloReporteFincasProductor('', '', '', '', '', '', '', '', '', '', '', ''), 
        //formProductorPersonaValido: false, // Indica si el formulario de lote es valido
    },

    mutations: {

        // SETTERS
        establecerModeloProductorFincaStore(state, nuevaPersona) {
            state.modeloReporteFincasProductor = nuevaPersona;
        },

        establecerListaFincasProductorStore(state, newState) {
            state.listaReporteFincasProductor = newState;
        },

    },

    getters: {
        modeloReporteFincasProductor: (state) => state.modeloReporteFincasProductor,
        listaReporteFincasProductor: (state) => state.listaReporteFincasProductor,
    },
}