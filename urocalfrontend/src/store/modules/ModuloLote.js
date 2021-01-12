import Lote from '@/models/ModeloLote';

export default {
    namespaced: true,

    state: {
        lote: new Lote('', '', '', '', '', ''), // Modelo lote
        formLoteValido: false, // Indica si el formulario de lote es valido
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo lot
        setLot(state, nuevoLote) {
            state.lote = nuevoLote
        },

        // Vacia el modelo lote
        vaciarLote(state) {
            state.lote = new Lote('', '', '', '', '', '')
        },

        cambiarEstadoFormLoteValido(state, nuevoEstado) {
            state.formLoteValido = nuevoEstado
        },
    },

    getters: {
        formLoteValido: (state) => state.formLoteValido, // Devuelve la variable formLoteValido
    },
}