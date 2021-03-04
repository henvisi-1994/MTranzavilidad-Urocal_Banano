import Fertilizante from '@/models/ModeloFertilizante';

export default {
    namespaced: true,

    state: {
        listaFertilizantesStore: [],
        modeloFertilizanteStore: new Fertilizante('', '', '', '', '', '', '', '', '', '', '', '', ''), // Modelo Fertilizante
        formFertilizanteValido: false, // Indica si el formulario de Fertilizante es valido
    },

    mutations: {
        // Coloca un nuevo Fertilizante
        establecerModeloFertilizanteStore(state, nuevoFertilizante) {
            state.modeloFertilizanteStore = nuevoFertilizante
        },

        establecerListaFertilizantesStore(state, newState) {
            state.listaFertilizantesStore = newState;
        },

        // Vacia el modelo Fertilizante
        vaciarModeloFertilizanteStore(state) {
            state.modeloFertilizanteStore = new Fertilizante('', '', '', '', '', '', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario Fertilizante
        cambiarEstadoValidoFormFertilizante(state, nuevoEstado) {
            state.formFertilizanteValido = nuevoEstado
        },
    },

    getters: {
        formFertilizanteValido: (state) => state.formFertilizanteValido, // Devuelve la variable formFertilizanteValido
        listaFertilizantesStore: (state) => state.listaFertilizantesStore,
        modeloFertilizanteStore: (state) => state.modeloFertilizanteStore,
    },
}