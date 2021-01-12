import axios from 'axios';

// Ruta del servidor backend
const URL_API = 'http://localhost:3000/v1';

class ServicioAutenticacion {
    /* Envia solicitud POST a la ruta localhost:3000/login para iniciar sesion
        envia un objeto {percedula, usuaclave}
    */
    login(usuario) {
        return axios.post(`${URL_API}/login`, {
            percedula: usuario.percedula,
            usuclave: usuario.usuclave
        }).then(respuesta => {
            if (respuesta.data.accessToken) {
                localStorage.setItem('usuario', JSON.stringify(respuesta.data));
            }
            return Promise.resolve(respuesta.data);
        }, error => {
            return Promise.reject(error.response.data);
        })
    }
}

export default new ServicioAutenticacion();