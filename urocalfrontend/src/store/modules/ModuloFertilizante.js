import Fertilizante from '@/models/ModeloFertilizante';

export default {
    namespaced: true,

    state: {
        listaFertilizantesStore: [],
        modeloFertilizanteStore: new Fertilizante('', '', '', '', '', '', '', '', '', '', '', '', ''), // Modelo Fertilizante
        formFertilizanteValido: false, // Indica si el formulario de Fertilizante es valido
        bloquearCamposFormFertilizante: false, // Determina si se bloquean los campos del formulario

    },

    mutations: {
        // Coloca un nuevo Fertilizante
        establecerModeloFertilizanteStore(state, nuevoFertilizante) {
            state.modeloFertilizanteStore = nuevoFertilizante
        },
        
        updateListaFertilizacion(state, newState) {
            state.listaFertilizantesStore.push(newState)
          },

        vaciarLista(state, newState){
            state.listaFertilizantesStore.length = 0;
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
        
        // Cambia el estado de la variable bloquearCamposFormFertilizante
        cambiarBloquearCamposFormFertilizante(state, nuevoEstado) {
            state.bloquearCamposFormFertilizante = nuevoEstado
        },
    },

    getters: {
        formFertilizanteValido: (state) => state.formFertilizanteValido, // Devuelve la variable formFertilizanteValido
        listaFertilizantesStore: (state) => state.listaFertilizantesStore,
        modeloFertilizanteStore: (state) => state.modeloFertilizanteStore,
        bloquearCamposFormFertilizante: (state) => state.bloquearCamposFormFertilizante,        // Devuelve bloquearCamposFormFertilizante
    },
}