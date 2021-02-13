export default function autenciacionEncabezado() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario && usuario.hasOwnProperty('accessToken')) {
        return { Authorization: 'x-access-token ' + usuario.accessToken };
    } else {
        return {};
    }
}