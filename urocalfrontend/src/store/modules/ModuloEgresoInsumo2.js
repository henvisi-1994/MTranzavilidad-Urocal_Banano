import EgresoInsumo from '@/models/ModeloEgresoInsumo';

export default {
    namespaced: true,

    state: {
        modeloEgresoInsumosStore: new EgresoInsumo('', '', '', '', '', '', '', ""), // Modelo EgresoInsumo
        formEgresoInsumoValido: false, // Indica si el formulario de EgresoInsumo es valido
    },

    mutations: {

        establecerModeloEgresoInsumosStore(state, nuevoEgresoInsumo) {
            state.modeloEgresoInsumosStore = nuevoEgresoInsumo;
        },
        // Coloca un nuevo EgresoInsumo
        nuevoEgresoInsumo(state, nuevoEgresoInsumo) {
            state.modeloEgresoInsumosStore = nuevoEgresoInsumo
        },

        // Vacia el modelo EgresoInsumo
        vaciarEgresoInsumo(state) {
            state.modeloEgresoInsumosStore = new EgresoInsumo('', '', '', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario EgresoInsumo
        cambiarEstadoValidoFormEgresoInsumo(state, nuevoEstado) {
            state.formEgresoInsumoValido = nuevoEstado
        },

        establecerListaEgresoInsumosStore
    },

    getters: {
        formEgresoInsumoValido: (state) => state.formEgresoInsumoValido, // Devuelve la variable validarFormularioEgresoInsumo
        listaEgresoInsumosStore: (state) => state.listaEgresoInsumosStore,
    },
}