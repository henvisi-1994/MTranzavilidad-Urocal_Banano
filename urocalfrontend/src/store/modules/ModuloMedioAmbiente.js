import MedioAmbiente from '@/models/ModeloMedioAmbiente';

export default {
    namespaced: true,

    state: {
        medAmbiente: new MedioAmbiente('', '', '', '', '', '', '', '', ''), // Modelo MedioAmbiente
        formMedioAmbienteValido: false, // Indica si el formulario de medio ambiente es valido
    },

    actions: {

    },

    mutations: {
        // Agrega un nuevo medio ambiente
        agregarMedioAmbiente(state, nuevoMedioAmbiente) {
            state.medAmbiente = nuevoMedioAmbiente
        },

        // Vacia el modelo medio ambiente
        vaciarMedioAmbiente(state) {
            state.medAmbiente = new MedioAmbiente('', '', '', '', '', '', '', '', '')
        },

        // Cambia el estado de la variable formMedioAmbienteValido
        cambiarEstadoFormMedioAmbienteValido(state, nuevoEstado) {
            state.formMedioAmbienteValido = nuevoEstado
        },
    },

    getters: {
        formMedioAmbienteValido: (state) => state.formMedioAmbienteValido, // Devuelve la variable formMedioAmbienteValido
    },
}