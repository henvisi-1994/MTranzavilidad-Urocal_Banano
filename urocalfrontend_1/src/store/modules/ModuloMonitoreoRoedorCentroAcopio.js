import MonitoreoRoedorCentroAcopio from '@/models/ModeloMonitoreoRoedorCentroAcopio';

export default {
    namespaced: true,

    state: {
        monitoreoRoedorCentroAcopio: new MonitoreoRoedorCentroAcopio('', '', '', '', '', '', '', '', '', ''), // Modelo MonitoreoRoedorCentroAcopio
        formMonitoreoRoedorCentroAcopioValido: false, // Indica si el formulario de MonitoreoRoedorCentroAcopio es valido
    },

    mutations: {
        // Coloca un nuevo MonitoreoRoedorCentroAcopio
        nuevoMonitoreoRoedorCentroAcopio(state, nuevoMonitoreoRoedorCentroAcopio) {
            state.monitoreoRoedorCentroAcopio = nuevoMonitoreoRoedorCentroAcopio
        },

        // Vacia el modelo MonitoreoRoedorCentroAcopio
        vaciarMonitoreoRoedorCentroAcopio(state) {
            state.monitoreoRoedorCentroAcopio = new MonitoreoRoedorCentroAcopio('', '', '', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario MonitoreoRoedorCentroAcopio
        cambiarEstadoValidoFormMonitoreoRoedorCentroAcopio(state, nuevoEstado) {
            state.formMonitoreoRoedorCentroAcopioValido = nuevoEstado
        },
    },

    getters: {
        formMonitoreoRoedorCentroAcopioValido: (state) => state.formMonitoreoRoedorCentroAcopioValido, // Devuelve la variable validarFormularioMonitoreoRoedorCentroAcopioValido
    },
}