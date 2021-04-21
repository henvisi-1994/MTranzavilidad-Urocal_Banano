import Certificacion from '@/models/ModeloCertificaciones';

export default {
    namespaced: true,

    state: {
        listaCertificacionStore: [],
        certificacion: new Certificacion(0, '', ''), // Modelo Certificacion
        formCertificacionValido: false, // Indica si el formulario de Certificacion es valido
        bloquearCamposFormCertificacion: false,
    },

    mutations: {
        // Coloca un nuevo Certificacion
        nuevaCertificacion(state, nuevaCertificacion) {
            state.certificacion = nuevaCertificacion
        },

        // Vacia el modelo Certificacion
        vaciarCertificacion(state) {
            state.certificacion = new Certificacion(0, '', '')
        },

        // Cambia  el estado del Formulario Certificacion
        cambiarEstadoValidoFormCertificacion(state, nuevoEstado) {
            state.formCertificacionValido = nuevoEstado
        },
        cambiarBloquearCamposFormCertificacion(state, nuevoEstado){
            state.bloquearCamposFormCertificacion = nuevoEstado
        },

        establecerListaCertificacionStore(state, newState) {
            state.listaCertificacionStore = newState;
        },
    },

    getters: {
        formCertificacionValido: (state) => state.formCertificacionValido, // Devuelve la variable validarFormularioCertificacion
        certificacion: (state) => state.certificacion,
        listaProvinciaStore: (state) => state.listaProvinciaStore,
        listaCertificacionStore: (state) => state.listaCertificacionStore,
        bloquearCamposFormCertificacion: (state) => state.bloquearCamposFormCertificacion,
    },
}