import ServicioAutenticacion from '@/services/ServicioAutenticacion';


// Obtiene la informacion de usuario almacenado en localstorage
const usuario = JSON.parse(localStorage.getItem('usuario'));

/* Variable que contiene el estado de la sesion (esta logueado o no)
    si esta loqueado, mantiene la informacion del usuario
    caso contrario, el valor de usuario es nulo
*/
const estadoInicial = usuario
    ? { estado: { logueado: true }, usuario }
    : { estado: { logueado: false }, usuario: null };

export default {
    namespaced: true,

    state: estadoInicial,

    actions: {
        // Llama al servicio que hace la peticion de login al servidor
        login({ commit }, usuario) {
            return ServicioAutenticacion.login(usuario).then(
                respuesta => {
                    let authUser = respuesta.rol;
                    commit('loginExitoso', respuesta);
                    return Promise.resolve(respuesta.rol);
                },
                error => {
                    return Promise.reject(error);
                }
            )
        },
        cerrarSesion({ commit }) {
            ServicioAutenticacion.cerrarSesion();
            commit('cerrarSesion');
        },
    },

    mutations: {
        // Cambia el estado de la variable logueado y la informacion de la variable usuario
        loginExitoso(state, usuario) {
            state.estado.logueado = true;
            state.usuario = usuario;
        },

        // Cambia el estado de la variable logueado y la informacion de la variable usuario
        loginErroneo(state) {
            state.estado.logueado = false;
            state.usuario = null;
        },

        // Cambia el estado de la variable logueado y la informacion de la variable usuario
        cerrarSesion(state) {
            state.estado.logueado = false;
            state.usuario = null;
        },
    },

    getters: {
        logueado: (state) => state.estado.logueado
    }
}

