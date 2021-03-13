import axios from 'axios';
import ServicioProductorPersona from '@/services/ServicioProductorPersona';
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
                
                if(respuesta.data.rol == 'Productor'){
                    ServicioProductorPersona.obtenerProductorPersona(respuesta.data.id).then(
                        respuesta => {
                            console.log(respuesta);
                            localStorage.setItem('productor', JSON.stringify(respuesta.data[0]));
                        },error => {
                            return Promise.reject(error);
                        }
                        )
                }
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