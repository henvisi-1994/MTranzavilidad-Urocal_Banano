import ModeloReporteDatosProductor from '../../models/ModeloReporteDatosProductor';

export default {
    namespaced: true,

    state: {
        //listaCiudadStore: [],
        listaReporteDatosProductor: [],
        modeloReporteDatosProductor: new ModeloReporteDatosProductor('', '', '', '', '', '', '', '', '', '', '', ''), 
        //formProductorPersonaValido: false, // Indica si el formulario de lote es valido
    },

    mutations: {

        // SETTERS
        establecerModeloProductorPersonaStore(state, nuevaPersona) {
            state.modeloReporteDatosProductor = nuevaPersona;
        },

        establecerListaProductorPersonaStore(state, newState) {
            state.listaReporteDatosProductor = newState;
        },

    },

    getters: {
        modeloReporteDatosProductor: (state) => state.modeloReporteDatosProductor,
        listaReporteDatosProductor: (state) => state.listaReporteDatosProductor,
    },
}