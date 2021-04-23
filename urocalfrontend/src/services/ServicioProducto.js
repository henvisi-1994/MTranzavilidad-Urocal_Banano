import axios from 'axios';

// Ruta al servidor backend
const API_URL = 'http://localhost:3000/v1';

class ServicioProducto {

    // SELECT: Obtiene todos los productos
    obtenerTodosProducto() {
        return axios.get(`${API_URL}/producto`);
    }
    // SELECT: Obtiene todos los productos
    obtenerDetallesCacao() {
        return axios.get(`${API_URL}/producto/cacao`);
    }


    // INSERT: Agrega un producto
    crearProducto(producto) {
        return axios.post(`${API_URL}/producto`, producto);
    }
}

export default new ServicioProducto();