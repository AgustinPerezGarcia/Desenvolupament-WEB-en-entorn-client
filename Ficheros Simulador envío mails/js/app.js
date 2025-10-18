//Cuando se carga el DOM se ejecuta la función form
document.addEventListener("DOMContentLoaded", form);

let email = 0;
let asunto = 0;
let mensaje = 0;

//Función principal que añade todos los eventos del formulario
function form() {
    document.querySelector('#email').addEventListener("blur", checkEmail);
    document.querySelector('#asunto').addEventListener("blur", checkAsunto);
    document.querySelector('#mensaje').addEventListener("blur", checkMensaje);

    const resetear = document.querySelector('button[type="reset"]');
    resetear.addEventListener("click", () => borrarCampo("asunto"));
    resetear.addEventListener("click", () => borrarCampo("mensaje"));
    resetear.addEventListener("click", () => borrarCampo("email"));
    resetear.addEventListener("click", () => borrarCampoIncorrecto("email"));

    document.querySelector('button[type="submit"]').addEventListener("click", simularEnvio);
}

//Compruebo que el mail se mande bien y ponemos mensajes dependiendo de lo que no haya
function checkEmail(e) {
    email = e.target.value;
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; 
    const resultado = regex.test(email);

    if (email === "") {
        campoVacio("email");
        borrarCampoIncorrecto("email");
        email = 0;
    } else {
        if (!resultado) {
            campoIncorrecto("email");
            borrarCampo("email");
            email = 0;
        } else {
            borrarCampoIncorrecto("email");
            borrarCampo("email");
            email = 1;
        }
    }

    ponerEnvio();
}

//Compruebo si el campo asunto está vacío o no
function checkAsunto(e) {
    if (e.target.value === "") {
        campoVacio("asunto");
        asunto = 0;
    } else {
        borrarCampo("asunto");
        asunto = 1;
    }

    ponerEnvio();
}

//Compruebo si el campo mensaje está vacío o no
function checkMensaje(e) {
    if (e.target.value === "") {
        campoVacio("mensaje");
        mensaje = 0;
    } else {
        borrarCampo("mensaje");
        mensaje = 1;
    }

    ponerEnvio();
}

//Muestra un mensaje de error si el campo no cumple las condiciones
function campoIncorrecto(input) {
    if (!document.querySelector(`label.${input}incorrecto`)) {
        const emailInput = document.querySelector('#' + input);
        const label = document.createElement('label');

        label.className = `bg-red-600 text-white p-2 text-center ${input}incorrecto`;
        label.textContent = 'El campo ' + input.toUpperCase() + ' NO es válido';

        emailInput.insertAdjacentElement('afterend', label);
    }
}

//Muestra un mensaje si el campo está vacío
function campoVacio(input) {
    if (!document.querySelector(`label.${input}obligado`)) {
        const emailInput = document.querySelector('#' + input);
        const label = document.createElement('label');

        label.className = `bg-red-600 text-white p-2 text-center ${input}obligado`;
        label.textContent = 'El campo ' + input.toUpperCase() + ' es obligatorio';

        emailInput.insertAdjacentElement('afterend', label);
    }
}

//Borra el mensaje de campo vacío
function borrarCampo(input) {
    const borrar = document.querySelector(`label.${input}obligado`);
    if (borrar) borrar.remove();
}

//Borra el mensaje de campo incorrecto
function borrarCampoIncorrecto(input) {
    const borrarIncorrrecto = document.querySelector(`label.${input}incorrecto`);
    if (borrarIncorrrecto) borrarIncorrrecto.remove();
}

//Activa o desactiva el botón de enviar según si todos los campos están correctos
function ponerEnvio() {
    botonEnviar = document.querySelector('button[type="submit"]');

    if (email === 1 && asunto === 1 && mensaje === 1) {
        botonEnviar.disabled = false;
        botonEnviar.classList.remove("opacity-50");
    } else {
        botonEnviar.disabled = true;
        botonEnviar.classList.add("opacity-50");
    }
}

//Simula el envío del correo mostrando un spinner y luego un mensaje de éxito
function simularEnvio(e) {
    e.preventDefault();

    const spinner = document.querySelector('#spinner');
    spinner.innerHTML = `
        <div class="sk-chase">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
        </div>
    `;
    spinner.classList.remove('hidden');

    setTimeout(() => {
        spinner.classList.add('hidden');
        spinner.innerHTML = '';

        const mensajeExito = document.createElement('p');
        mensajeExito.className = 'bg-green-500 text-white text-center p-2 font-bold mensajeBien';
        mensajeExito.textContent = 'MENSAJE ENVIADO CORRECTAMENTE';
        document.querySelector('form').insertAdjacentElement('beforeend', mensajeExito);

        resetFormulario();

    }, 3000);
}

//Resetea el formulario y vuelve a desactivar el botón de enviar
function resetFormulario() {
    document.querySelector('form').reset();
    email = asunto = mensaje = 0;

    ponerEnvio();
}
