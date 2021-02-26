import ModeloUsuarioPersona from '../../models/ModeloUsuarioPersona';

export default {
    namespaced: true,

    state: {
        listaCiudadStore: [],
        listaUsuarioPersonaStore: [],
        modeloUsuarioPersonaStore: new ModeloUsuarioPersona('', '', '', '', '', '', '', '', '', '', '', '', ''), 
        formUsuarioPersonaValido: false, // Indica si el formulario de lote es valido
    },

    actions: {

    },

    mutations: {

        // SETTERS
        establecerModeloUsuarioPersonaStore(state, nuevaPersona) {
            state.modeloUsuarioPersonaStore = nuevaPersona;
        },

        establecerListaCiudadStore(state, newState) {
            state.listaCiudadStore = newState;
        },

        establecerListaUsuarioPersonaStore(state, newState) {
            state.listaUsuarioPersonaStore = newState;
        },


        // CLEANERS
        vaciarModeloUsuarioPersona(state) {
            state.modeloUsuarioPersonaStore = new ModeloUsuarioPersona('', '', '', '', '', '', '', '', '', '', '', '', '')
        },

        limpiarListaCiudadStore(state) {
            state.listaCiudadStore = [];
        },


        // VALIDATORS
        cambiarEstadoFormUsuarioPersonaValido(state, nuevoEstado) {
            state.formUsuarioPersonaValido = nuevoEstado
        },
    },

    getters: {
        formUsuarioPersonaValido: (state) => state.formUsuarioPersonaValido, // Devuelve la variable formUsuarioValido
        modeloUsuarioPersonaStore: (state) => state.modeloUsuarioPersonaStore,
        listaCiudadStore: (state) => state.listaCiudadStore,
        listaUsuarioPersonaStore: (state) => state.listaUsuarioPersonaStore,
    },
}