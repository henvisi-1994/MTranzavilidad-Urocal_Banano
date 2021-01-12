import ProductorPersona from '@/models/ModeloProductorPersona';

export default {
    namespaced: true,

    state: {
        productor_persona: new ProductorPersona('', '', '', '', '', '', '', '', '', '', '', ''), // Modelo lote
        formProductorPersonaValido: false, // Indica si el formulario de lote es valido
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo lot
        setLot(state, nuevaPersona) {
            state.productor_persona = nuevaPersona
        },

        // Vacia el modelo Persona
        vaciarProductorPersona(state) {
            state.productor_persona = new ProductorPersona('', '', '', '', '', '', '', '', '', '', '', '')
        },

        cambiarEstadoFormProductorPersonaValido(state, nuevoEstado) {
            state.formProductorPersonaValido = nuevoEstado
        },
    },

    getters: {
        formProductorPersonaValido: (state) => state.formProductorPersonaValido, // Devuelve la variable formProductorValido
    },
}