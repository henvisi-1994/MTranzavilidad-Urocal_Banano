import Lote from '@/models/ModeloLote';

export default {
    namespaced: true,

    state: {
        lote: new Lote('', '', '', '', '', ''), // Modelo lote
        formLoteValido: false, // Indica si el formulario de lote es valido
        listaLotes: [], // Lista de lotes
        bloquearCamposFormLote: false, // Determina si se bloquean los campos del formulario
    },

    actions: {

    },

    mutations: {
        // Lote
        agregarLote(state, nuevoLote) {
            state.lote = nuevoLote
        },

        vaciarLote(state) {
            state.lote = new Lote('', '', '', '', '', '')
        },

        // Cambia el estado de la variable formLoteValido
        cambiarEstadoFormLoteValido(state, nuevoEstado) {
            state.formLoteValido = nuevoEstado
        },

        // listaLotes
        eliminarLoteLista(state, loteID) {
            let indice = state.listaLotes.indexOf(loteID); // Obtiene la posicion del elemento
            state.listaLotes.splice(indice, 1); // Elimina el elemento
        },

        asignarListaLotes(state, nuevaListaLotes) {
            state.listaLotes = nuevaListaLotes;
        },

        // Cambia el estado de la variable bloquearCamposFormLote
        cambiarBloquearCamposFormLote(state, nuevoEstado) {
            state.bloquearCamposFormLote = nuevoEstado
        },
    },

    getters: {
        formLoteValido: (state) => state.formLoteValido,                    // Devuelve la variable formLoteValido
        lote: (state) => state.lote,                                        // Devuelve el modelo lote
        bloquearCamposFormLote: (state) => state.bloquearCamposFormLote,    // Devuelve bloquearCamposFormLote
    },
}