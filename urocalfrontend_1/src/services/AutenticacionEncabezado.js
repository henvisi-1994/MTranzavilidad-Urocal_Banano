export default function autenciacionEncabezado() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario && usuario.tokenAcceso) {
        return { Authorization: 'Bearer ' + usuario.tokenAcceso };
    } else {
        return {};
    }
}