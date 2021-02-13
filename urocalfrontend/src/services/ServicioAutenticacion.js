import axios from 'axios';

// Ruta del servidor backend
const URL_API = 'http://localhost:3000/v1';

class ServicioAutenticacion {
    /* Envia solicitud POST a la ruta /login para iniciar sesion
        envia un objeto {percedula, usuaclave}
    */
    login(usuario) {
        return axios.post(`${URL_API}/login`, {
            percedula: usuario.percedula,
            usuclave: usuario.usuclave
        }).then(respuesta => {
            if (respuesta.data.hasOwnProperty('accessToken')) {
                localStorage.setItem('usuario', JSON.stringify(respuesta.data));
            }
            return Promise.resolve(respuesta.data);
        }, error => {
            return Promise.reject(error.response.data);
        })
    }

    cerrarSesion() {
        localStorage.removeItem('usuario');
    }
}

export default new ServicioAutenticacion();