//todo lo relacionado con la validación y llamada a función conexión API
import { comprobarCampos } from "./funciones.js";
import { agregarCliente } from "./API.js";

document.addEventListener("DOMContentLoaded", (e) => {comprobarCliente(e)});


function comprobarCliente(e) {
    e.preventDefault();

    document.querySelector('[type=submit]').addEventListener('click', (e) => {
        
        const nombre = document.querySelector("#nombre").value;
        const email = document.querySelector("#email").value;
        const telefono = document.querySelector("#telefono").value;
        const empresa = document.querySelector("#empresa").value;

        const cliente = {nombre, email, telefono, empresa}
        
        const validar = comprobarCampos(nombre, email, telefono, empresa, e);

        if (validar === 1) {
            agregarCliente(cliente);
        }

    });
}