import MedioAmbiente from '@/models/ModeloMedioAmbiente';

export default {
    namespaced: true,

    state: {
        medAmbiente: new MedioAmbiente('', '', '', '', '', '', '', '', ''), // Modelo MedioAmbiente
        formMedioAmbienteValido: false, // Indica si el formulario de medio ambiente es valido
        bloquearCamposFormMedioAmbiente: false, // Determina si se bloquean los campos del formulario
    },

    actions: {

    },

    mutations: {
        // medaMBIENTE
        agregarMedioAmbiente(state, nuevoMedioAmbiente) {
            state.medAmbiente = nuevoMedioAmbiente
        },

        vaciarMedioAmbiente(state) {
            state.medAmbiente = new MedioAmbiente('', '', '', '', '', '', '', '', '')
        },

        // Cambia el estado de la variable formMedioAmbienteValido
        cambiarEstadoFormMedioAmbienteValido(state, nuevoEstado) {
            state.formMedioAmbienteValido = nuevoEstado
        },

        // Cambia el estado de la variable bloquearCamposFormMedioAmbiente
        cambiarBloquearCamposFormMedioAmbiente(state, nuevoEstado) {
            state.bloquearCamposFormMedioAmbiente = nuevoEstado
        },
    },

    getters: {
        formMedioAmbienteValido: (state) => state.formMedioAmbienteValido,                      // Devuelve la variable formMedioAmbienteValido
        medAmbiente: (state) => state.medAmbiente,                                              // Devuelve el modelo medAmbiente
        bloquearCamposFormMedioAmbiente: (state) => state.bloquearCamposFormMedioAmbiente,      // Devuelve bloquearCamposFormMedioAmbiente
    },
}