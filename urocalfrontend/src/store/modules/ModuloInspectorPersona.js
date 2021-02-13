import ModeloInspectorPersona from '../../models/ModeloInspectorPersona';

export default {
    namespaced: true,

    state: {
        listaCiudadStore: [],
        listaInspectorPersonaStore: [],
        modeloInspectorPersonaStore: new ModeloInspectorPersona('', '', '', '', '', '', '', '', '', '', ''), 
        formInspectorPersonaValido: false, // Indica si el formulario de lote es valido
    },

    actions: {

    },

    mutations: {

        // SETTERS
        establecerModeloInspectorPersonaStore(state, nuevaPersona) {
            state.modeloInspectorPersonaStore = nuevaPersona;
        },

        establecerListaCiudadStore(state, newState) {
            state.listaCiudadStore = newState;
        },

        establecerListaInspectorPersonaStore(state, newState) {
            state.listaInspectorPersonaStore = newState;
        },


        // LIMPIADORES
        vaciarModeloInspectorPersonaStore(state) {
            state.modeloInspectorPersonaStore = new ModeloInspectorPersona('', '', '', '', '', '', '', '', '', '', '');
        },


        // VALIDATORS
        cambiarEstadoFormInspectorPersonaValido(state, nuevoEstado) {
            state.formInspectorPersonaValido = nuevoEstado
        },
    },

    getters: {
        formInspectorPersonaValido: (state) => state.formInspectorPersonaValido, // Devuelve la variable formUsuarioValido
        modeloInspectorPersonaStore: (state) => state.modeloInspectorPersonaStore,
        listaCiudadStore: (state) => state.listaCiudadStore,
        listaInspectorPersonaStore: (state) => state.listaInspectorPersonaStore,
    },
}