import Respacopio from '@/models/ModeloRespacopio';

export default {
    namespaced: true,

    state: {
        listaCiudadStore: [],
        listaRespacopioStore: [],
        respacopio: new Respacopio('', '', '', '', '', '', '', '', '', '', '', ''), // Modelo Respacopio
        formRespacopioValido: false, // Indica si el formulario de Respacopio es valido
        noEditar: false,
    },

    mutations: {
        // Coloca un nuevo Respacopio
        nuevoRespacopio(state, nuevoRespacopio) {
            console.log(nuevoRespacopio);
            state.respacopio = nuevoRespacopio
        },

        establecerListaCiudadStore(state, newState) {
            state.listaCiudadStore = newState;
        },

        establecerlistaRespacopioStore(state, newState) {
            state.listaRespacopioStore = newState;
        },

        // Vacia el modelo Respacopio
        vaciarRespacopio(state) {
            state.respacopio = new Respacopio('', '', '', '', '', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario Respacopio
        cambiarEstadoValidoFormRespacopio(state, nuevoEstado) {
            state.formRespacopioValido = nuevoEstado
        },

        cambiarEstadoNoEditar(state, newState) {
            state.noEditar = newState
        },
    },

    getters: {
        formRespacopioValido: (state) => state.formRespacopioValido, // Devuelve la variable formRespacopioValido
        respacopio: (state) => state.respacopio,
        listaCiudadStore: (state) => state.listaCiudadStore,
        listaRespacopioStore: (state) => state.listaRespacopioStore,
        noEditar: (state) => state.noEditar,
    },
}