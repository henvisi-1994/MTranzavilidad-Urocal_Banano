import ModeloProductorPersona from '../../models/ModeloProductorPersona';

export default {
    namespaced: true,

    state: {
        listaCiudadStore: [],
        listaProductorPersonaStore: [],
        modeloProductorPersonaStore: new ModeloProductorPersona('', '', '', '', '', '', '', '', '', '', '', ''), 
        formProductorPersonaValido: false, // Indica si el formulario de lote es valido
    },

    actions: {

    },

    mutations: {

        // SETTERS
        establecerModeloProductorPersonaStore(state, nuevaPersona) {
            state.modeloProductorPersonaStore = nuevaPersona;
        },

        establecerListaCiudadStore(state, newState) {
            state.listaCiudadStore = newState;
        },

        establecerListaProductorPersonaStore(state, newState) {
            state.listaProductorPersonaStore = newState;
        },


        // LIMPIADORES
        vaciarModeloProductorPersonaStore(state) {
            state.modeloProductorPersonaStore = new ModeloProductorPersona('', '', '', '', '', '', '', '', '', '', '', '');
        },


        // VALIDATORS
        cambiarEstadoFormProductorPersonaValido(state, nuevoEstado) {
            state.formProductorPersonaValido = nuevoEstado
        },
    },

    getters: {
        formProductorPersonaValido: (state) => state.formProductorPersonaValido, // Devuelve la variable formUsuarioValido
        modeloProductorPersonaStore: (state) => state.modeloProductorPersonaStore,
        listaCiudadStore: (state) => state.listaCiudadStore,
        listaProductorPersonaStore: (state) => state.listaProductorPersonaStore,
    },
}