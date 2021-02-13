import Ciudad from '@/models/ModeloCiudad';

export default {
    namespaced: true,

    state: {
        listaProvinciaStore: [],
        listaCiudadStore: [],
        ciudad: new Ciudad('', '', ''), // Modelo Ciudad
        formCiudadValido: false, // Indica si el formulario de Ciudad es valido
    },

    mutations: {
        // Coloca un nuevo Ciudad
        nuevoCiudad(state, nuevoCiudad) {
            state.ciudad = nuevoCiudad
        },

        // Vacia el modelo Ciudad
        vaciarCiudad(state) {
            state.ciudad = new Ciudad('', '', '')
        },

        // Cambia  el estado del Formulario Ciudad
        cambiarEstadoValidoFormCiudad(state, nuevoEstado) {
            state.formCiudadValido = nuevoEstado
        },

        establecerListaProvinciaStore(state, newState) {
            state.listaProvinciaStore = newState;
        },

        limpiarListaProvinciaStore(state) {
            state.listaProvinciaStore = [];
        },

        establecerListaCiudadStore(state, newState) {
            state.listaCiudadStore = newState;
        },
    },

    getters: {
        formCiudadValido: (state) => state.formCiudadValido, // Devuelve la variable validarFormularioCiudad
        ciudad: (state) => state.ciudad,
        listaProvinciaStore: (state) => state.listaProvinciaStore,
        listaCiudadStore: (state) => state.listaCiudadStore,
    },
}