import Provincia from '@/models/ModeloProvincia';

export default {
    namespaced: true,

    state: {
        listaPaisStore: [],
        listaProvinciaStore: [],
        provincia: new Provincia('', '', ''), // Modelo Provincia
        formProvinciaValido: false, // Indica si el formulario de Provincia es valido
    },

    mutations: {
        // Coloca un nuevo Provincia
        nuevoProvincia(state, nuevoProvincia) {
            state.provincia = nuevoProvincia
        },

        // Vacia el modelo Provincia
        vaciarProvincia(state) {
            state.provincia = new Provincia('', '', '')
        },

        // Cambia  el estado del Formulario Provincia
        cambiarEstadoValidoFormProvincia(state, nuevoEstado) {
            state.formProvinciaValido = nuevoEstado
        },

        establecerListaPaisStore(state, newState) {
            state.listaPaisStore = newState;
        },

        limpiarListaPaisStore(state) {
            state.listaPaisStore = [];
        },

        establecerListaProvinciaStore(state, newState) {
            state.listaProvinciaStore = newState;
        },
    },

    getters: {
        formProvinciaValido: (state) => state.formProvinciaValido, // Devuelve la variable validarFormularioProvincia
        provincia: (state) => state.provincia,
        listaPaisStore: (state) => state.listaPaisStore,
        listaProvinciaStore: (state) => state.listaProvinciaStore,
    },
}