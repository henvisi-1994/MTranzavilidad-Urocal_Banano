import UsuarioPersona from '@/models/ModeloUsuarioPersona';

export default {
    namespaced: true,

    state: {
        usuario_persona: new UsuarioPersona('', '', '', '', '', '', '', '', '', '', ''), // Modelo lote
        formUsuarioPersonaValido: false, // Indica si el formulario de lote es valido
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo lot
        setLot(state, nuevaPersona) {
            state.usuario_persona = nuevaPersona
        },

        // Vacia el modelo Persona
        vaciarUsuarioPersona(state) {
            state.usuario_persona = new UsuarioPersona('', '', '', '', '', '', '', '', '', '', '')
        },

        cambiarEstadoFormUsuarioPersonaValido(state, nuevoEstado) {
            state.formUsuarioPersonaValido = nuevoEstado
        },
    },

    getters: {
        formUsuarioPersonaValido: (state) => state.formUsuarioPersonaValido, // Devuelve la variable formUsuarioValido
    },
}