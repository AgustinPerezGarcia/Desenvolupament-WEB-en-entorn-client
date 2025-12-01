import { mostrarPlatos } from "./platillos.js";

//comprobamos que ponga todo
export function comprobarCampos(mesa, hora, e) {
    e.preventDefault();

    if (mesa === "" || hora === "") {
        mostrarError("Todos los campos son obligatorios");   

    }else{
        const modalFormulario = document.querySelector('#formulario');

        const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
        modalBootstrap.hide();

        mostrarPlatos();
        
    }

}

let errorVar = 0;

export function mostrarError(texto){
    const elemento = document.querySelector('.modal-body');

    if (errorVar === 0) {
        const nuevoElemento = document.createElement('p');
        nuevoElemento.textContent = `Error! ${texto}`;
        nuevoElemento.classList.add('invalid-feedback', 'd-block', 'text-center', 'error');

        elemento.appendChild(nuevoElemento);   
        setTimeout(borrarError, 1500);
        errorVar++;
    }
}

function borrarError() {
    const error = document.querySelector('.error');

    error.remove();

    errorVar = 0;

}