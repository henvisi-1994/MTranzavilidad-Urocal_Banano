import Sitio from '@/models/ModeloSitio';

export default {
    namespaced: true,

    state: {
        listaCiudadStore: [],
        listaSitioStore: [],
        sitio: new Sitio('', '', ''), // Modelo Sitio
        formSitioValido: false, // Indica si el formulario de Sitio es valido
    },

    mutations: {
        // Coloca un nuevo Sitio
        nuevoSitio(state, nuevoSitio) {
            state.sitio = nuevoSitio
        },

        // Vacia el modelo Sitio
        vaciarSitio(state) {
            state.sitio = new Sitio('', '', '')
        },

        // Cambia  el estado del Formulario Sitio
        cambiarEstadoValidoFormSitio(state, nuevoEstado) {
            state.formSitioValido = nuevoEstado
        },

        establecerListaCiudadStore(state, newState) {
            state.listaCiudadStore = newState;
        },

        limpiarListaCiudadStore(state) {
            state.listaCiudadStore = [];
        },

        establecerListaSitioStore(state, newState) {
            state.listaSitioStore = newState;
        },
    },

    getters: {
        formSitioValido: (state) => state.formSitioValido, // Devuelve la variable validarFormularioSitio
        sitio: (state) => state.sitio,
        listaCiudadStore: (state) => state.listaCiudadStore,
        listaSitioStore: (state) => state.listaSitioStore,
    },
}