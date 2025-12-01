//funciones generales que pueden servir para varios ficheros

export function comprobarCampos(nombre, email, telefono, empresa, e) {
    e.preventDefault();

    if (nombre === "" || email === "" || telefono === "" || empresa === "") {
        mostrarError("Todos los campos son obligatorios");   
        return 0;
    } else {
        return 1;
    }
}

let errorVar = 0;

export function mostrarError(texto){
    const elemento = document.querySelector('[type=submit]').parentElement;

    if (errorVar === 0) {
        const nuevoElemento = document.createElement('p');
        nuevoElemento.textContent = `Error! ${texto}`;
        nuevoElemento.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3','rounded', 'max-w-lg','mx-auto', 'mt-6', 'text-center', 'error');

        elemento.appendChild(nuevoElemento);   
        setTimeout(borrarError, 3000);
        errorVar++;
    }
}

function borrarError() {
    const error = document.querySelector('.error');

    error.remove();

    errorVar = 0;

}