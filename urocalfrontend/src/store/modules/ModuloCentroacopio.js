import ModeloCentroacopio from '@/models/ModeloCentroacopio';

export default {
    namespaced: true,

    state: {
        modeloCentroacopio: new ModeloCentroacopio('', '', ''), // Modelo Centroacopio
        listaCentroacopio: [],
        formCentroacopioValido: false, // Indica si el formulario de Centroacopio es valido
    },

    actions: {

    },

    mutations: {

        establecerListaCentroacopio(state, newState) {
            state.listaCentroacopio = newState;
        },

        establecerModeloCentroacopio(state, newState) {
            state.modeloCentroacopio = newState;
        },
        // LIMPIADORES
        vaciarCentroacopio(state) {
            state.modeloCentroacopio = new ModeloCentroacopio('', '', '');
        },

        limpiarListaCentroacopio(state) {
            state.listaCentroacopio = [];
        },


        // VALIDATORS
        cambiarEstadoFormCentroacopioValido(state, nuevoEstado) {
            state.formCentroacopioValido = nuevoEstado
        },
        // Coloca un nuevo
        nuevoCentroacopio(state, nuevoCentroacopio) {
            state.centroacopio = nuevoCentroacopio
        },

    },

    getters: {
        formCentroacopioValido: (state) => state.formCentroacopioValido, // Devuelve la variable formCentroacopioValidomodeloConductorPersonaStore: (state) => state.modeloConductorPersonaStore,
        listaCentroacopio: (state) => state.listaCentroacopio,   
        modeloCentroacopio:(state)=> state.modeloCentroacopio,
    
    },
}
