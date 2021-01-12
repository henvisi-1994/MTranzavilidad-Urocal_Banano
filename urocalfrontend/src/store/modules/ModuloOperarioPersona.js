import OperarioPersona from '@/models/ModeloOperarioPersona';

export default {
    namespaced: true,

    state: {
        operario_persona: new OperarioPersona('', '', '', '', '', '', '', '', '', '', '', ''), // Modelo lote
        formOperarioPersonaValido: false, // Indica si el formulario de lote es valido
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo lot
        setLot(state, nuevaPersona) {
            state.operario_persona = nuevaPersona
        },

        // Vacia el modelo Persona
        vaciarOperarioPersona(state) {
            state.operario_persona = new OperarioPersona('', '', '', '', '', '', '', '', '', '', '', '')
        },

        cambiarEstadoFormOperarioPersonaValido(state, nuevoEstado) {
            state.formOperarioPersonaValido = nuevoEstado
        },
    },

    getters: {
        formOperarioPersonaValido: (state) => state.formOperarioPersonaValido, // Devuelve la variable formOperarioValido
    },
}