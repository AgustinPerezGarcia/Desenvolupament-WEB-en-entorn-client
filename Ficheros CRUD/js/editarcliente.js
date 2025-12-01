import { mostrarInfoCliente } from "./API.js";
import { actualizarCliente } from "./API.js";

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const idCliente = params.get('id');

    if (idCliente) {
        await mostrarInfoCliente(idCliente);
    }

    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', (e) => {actualizarCliente(e, idCliente)});
});