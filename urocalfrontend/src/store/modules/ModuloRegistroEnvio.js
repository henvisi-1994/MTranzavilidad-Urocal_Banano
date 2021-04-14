import RegistroEnvio from '@/models/ModeloRegistroEnvio';

export default {
    namespaced: true,

    state: {
        listaRegistroEnvioStore: [],
        listaCultivoStore: [],
        modeloRegistroEnvioStore: new RegistroEnvio('', '', '', '', ''), // Modelo RegistroEnvio
        formRegistroEnvioValido: false, // Indica si el formulario de RegistroEnvio es valido
        editarRegistroEnvio: false
    },

    mutations: {
        // Coloca un nuevo RegistroEnvio
        establecerModeloRegistroEnvioStore(state, nuevoRegistroEnvio) {
            state.modeloRegistroEnvioStore = nuevoRegistroEnvio
        },

        establecerListaRegistroEnvioStore(state, newState) {
            state.listaRegistroEnvioStore = newState;
        },

        // Vacia el modelo RegistroEnvio
        vaciarModeloRegistroEnvioStore(state) {
            state.modeloRegistroEnvioStore = new RegistroEnvio('', '', '', '', '')
        },

        // Cambia  el estado del Formulario RegistroEnvio
        cambiarEstadoValidoFormRegistroEnvio(state, nuevoEstado) {
            state.formRegistroEnvioValido = nuevoEstado
        },
        establecerEditarRegistroEnvio(state, newState) {
            state.editarRegistroEnvio = newState;
        },

        nuevoRegistroEnvio(state, nuevoRegistroEnvio) {
            state.modeloRegistroEnvioStore = nuevoRegistroEnvio
        },
        establecerListaCultivoStore(state, newState) {
            state.listaCultivoStore = newState;
        },

        limpiarListaCultivoStore(state) {
            state.listaCultivoStore = [];
        },
    },

    getters: {
        formRegistroEnvioValido: (state) => state.formRegistroEnvioValido, // Devuelve la variable formRegistroEnvioValido
        listaRegistroEnvioStore: (state) => state.listaRegistroEnvioStore,
        modeloRegistroEnvioStore: (state) => state.modeloRegistroEnvioStore,
        editarRegistroEnvio: (state) => state.editarRegistroEnvio,
        listaCultivoStore: (state) => state.listaCultivoStore,
    },
}