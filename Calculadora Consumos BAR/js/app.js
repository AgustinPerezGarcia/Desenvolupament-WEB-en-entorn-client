//código JS examen
import { mostrar } from "./mostrar.js";
import { comprobarCampos } from "./funciones.js";

document.addEventListener("DOMContentLoaded", (e) => {nuevaOrden(e)});

function nuevaOrden(e) {
    e.preventDefault();

    document.querySelector('#guardar-cliente').addEventListener('click', (e) => {
        
        const mesaValue = document.querySelector("#mesa").value;
        const horaValue = document.querySelector("#hora").value;

        const mesa = {mesaValue, horaValue}
        
        comprobarCampos(mesaValue, horaValue, e);

        mostrar();   


    });
}

