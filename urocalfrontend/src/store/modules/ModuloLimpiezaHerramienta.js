import LimpiezaHerramienta from '@/models/ModeloLimpiezaHerramienta';

export default {
    namespaced: true,

    state: {
        limpiezaHerramienta: new LimpiezaHerramienta('', '', '', '', '', '', '', '', '', ''), // Modelo LimpiezaHerramienta
        formLimpiezaHerramientaValido: false, // Indica si el formulario de LimpiezaHerramienta es valido
    },

    mutations: {
        // Coloca un nuevo LimpiezaHerramienta
        nuevoLimpiezaHerramienta(state, nuevoLimpiezaHerramienta) {
            state.limpiezaHerramienta = nuevoLimpiezaHerramienta
        },

        // Vacia el modelo LimpiezaHerramienta
        vaciarLimpiezaHerramienta(state) {
            state.limpiezaHerramienta = new LimpiezaHerramienta('', '', '', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario LimpiezaHerramienta
        cambiarEstadoValidoFormLimpiezaHerramienta(state, nuevoEstado) {
            state.formLimpiezaHerramientaValido = nuevoEstado
        },
    },

    getters: {
        formLimpiezaHerramientaValido: (state) => state.formLimpiezaHerramientaValido, // Devuelve la variable validarFormularioLimpiezaHerramienta
    },
}