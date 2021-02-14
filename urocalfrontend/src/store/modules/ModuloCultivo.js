import Cultivo from '../../models/ModeloCultivo';

export default {
    namespaced: true,

    state: {
        cultivo: new Cultivo('', '', ''), // Modelo Cultivo
        bloquearCamposFormCultivo: false, // Determina si se bloquean los campos del formulario
    },

    actions: {

    },

    mutations: {   
        
        // Coloca un nuevo
        nuevoCultivo(state, nuevoCultivo) {
            state.cultivo = nuevoCultivo
        },

        // Vacia el modelo 
        vaciarCultivo(state) {
            state.cultivo = new Cultivo('', '', '')
        },

        // Cambia el estado de la variable bloquearCamposFormCultivo
        cambiarBloquearCamposFormCultivo(state, nuevoEstado) {
            state.bloquearCamposFormCultivo = nuevoEstado
        },
    },

    getters: {
        bloquearCamposFormCultivo: (state) => state.bloquearCamposFormCultivo,    // Devuelve bloquearCamposFormCultivo
    },
}