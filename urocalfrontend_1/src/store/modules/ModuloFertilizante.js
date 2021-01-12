import Fertilizante from '@/models/ModeloFertilizante';

export default {
    namespaced: true,

    state: {
        fertilizante: new Fertilizante('', '', '', '', '', '', '', '', '', '', '', '', ''), // Modelo Fertilizante
        formFertilizanteValido: false, // Indica si el formulario de Fertilizante es valido
    },

    mutations: {
        // Coloca un nuevo Fertilizante
        nuevoFertilizante(state, nuevoFertilizante) {
            state.fertilizante = nuevoFertilizante
        },

        // Vacia el modelo Fertilizante
        vaciarFertilizante(state) {
            state.fertilizante = new Fertilizante('', '', '', '', '', '', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario Fertilizante
        cambiarEstadoValidoFormFertilizante(state, nuevoEstado) {
            state.formFertilizanteValido = nuevoEstado
        },
    },

    getters: {
        formFertilizanteValido: (state) => state.formFertilizanteValido, // Devuelve la variable formFertilizanteValido
    },
}