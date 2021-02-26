import Pais from '@/models/ModeloPais';

export default {
    namespaced: true,

    state: {
        listaPaisStore: [],
        pais: new Pais('', ''), // Modelo País
        formPaisValido: false, // Indica si el formulario de País es valido
    },

    mutations: {
        // Coloca un nuevo Pais
        nuevoPais(state, nuevoPais) {
            state.pais = nuevoPais
        },

        // Vacia el modelo Pais
        vaciarPais(state) {
            state.pais = new Pais('', '')
        },

        // Cambia  el estado del Formulario Pais
        cambiarEstadoValidoFormPais(state, nuevoEstado) {
            state.formPaisValido = nuevoEstado
        },

        establecerListaPaisStore(state, newState) {
            state.listaPaisStore = newState;
        },
    },

    getters: {
        formPaisValido: (state) => state.formPaisValido, // Devuelve la variable validarFormularioPais
        pais: (state) => state.pais,
        listaPaisStore: (state) => state.listaPaisStore,
    },
}