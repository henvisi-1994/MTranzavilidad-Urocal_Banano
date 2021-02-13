import ModeloOperarioPersona from '../../models/ModeloOperarioPersona';

export default {
    namespaced: true,

    state: {
        listaCiudadStore: [],
        listaOperarioPersonaStore: [],
        modeloOperarioPersonaStore: new ModeloOperarioPersona('', '', '', '', '', '', '', '', '', '', '', '', ''), 
        formOperarioPersonaValido: false, // Indica si el formulario de lote es valido
    },

    actions: {

    },

    mutations: {

        // SETTERS
        establecerModeloOperarioPersonaStore(state, nuevaPersona) {
            state.modeloOperarioPersonaStore = nuevaPersona;
        },

        establecerListaCiudadStore(state, newState) {
            state.listaCiudadStore = newState;
        },

        establecerListaOperarioPersonaStore(state, newState) {
            state.listaOperarioPersonaStore = newState;
        },


        // LIMPIADORES
        vaciarModeloOperarioPersonaStore(state) {
            state.modeloOperarioPersonaStore = new ModeloOperarioPersona('', '', '', '', '', '', '', '', '', '', '', '', '');
        },


        // VALIDATORS
        cambiarEstadoFormOperarioPersonaValido(state, nuevoEstado) {
            state.formOperarioPersonaValido = nuevoEstado
        },
    },

    getters: {
        formOperarioPersonaValido: (state) => state.formOperarioPersonaValido, // Devuelve la variable formUsuarioValido
        modeloOperarioPersonaStore: (state) => state.modeloOperarioPersonaStore,
        listaCiudadStore: (state) => state.listaCiudadStore,
        listaOperarioPersonaStore: (state) => state.listaOperarioPersonaStore,
    },
}