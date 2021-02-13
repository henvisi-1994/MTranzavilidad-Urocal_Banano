import ModeloConductorPersona from '../../models/ModeloConductorPersona';

export default {
    namespaced: true,

    state: {
        listaCiudadStore: [],
        listaConductorPersonaStore: [],
        modeloConductorPersonaStore: new ModeloConductorPersona('', '', '', '', '', '', '', '', '', '', '', ''), 
        formConductorPersonaValido: false, // Indica si el formulario de lote es valido
    },

    actions: {

    },

    mutations: {

        // SETTERS
        establecerModeloConductorPersonaStore(state, nuevaPersona) {
            state.modeloConductorPersonaStore = nuevaPersona;
        },

        establecerListaCiudadStore(state, newState) {
            state.listaCiudadStore = newState;
        },

        establecerListaConductorPersonaStore(state, newState) {
            state.listaConductorPersonaStore = newState;
        },


        // LIMPIADORES
        vaciarModeloConductorPersonaStore(state) {
            state.modeloConductorPersonaStore = new ModeloConductorPersona('', '', '', '', '', '', '', '', '', '', '', '');
        },

        limpiarListaCiudadStore(state) {
            state.listaCiudadStore = [];
        },


        // VALIDATORS
        cambiarEstadoFormConductorPersonaValido(state, nuevoEstado) {
            state.formConductorPersonaValido = nuevoEstado
        },
    },

    getters: {
        formConductorPersonaValido: (state) => state.formConductorPersonaValido, // Devuelve la variable formUsuarioValido
        modeloConductorPersonaStore: (state) => state.modeloConductorPersonaStore,
        listaCiudadStore: (state) => state.listaCiudadStore,
        listaConductorPersonaStore: (state) => state.listaConductorPersonaStore,
    },
}