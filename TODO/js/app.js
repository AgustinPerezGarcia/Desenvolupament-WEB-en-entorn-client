document.addEventListener('DOMContentLoaded', cargarTareas);

const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('#lista-tareas');
const textarea = document.querySelector('#tarea');
const fila = document.querySelector('.row'); 


formulario.addEventListener('submit', agregarTarea);
listaTareas.addEventListener('click', borrarTarea);


function agregarTarea(e) {
    e.preventDefault();
    const texto = textarea.value.trim();

    if (texto === '') {
        mostrarError('No has puesto ninguna tarea...');
        return;
    }

    if (texto.length > 30) {
        mostrarError('La tarea es demasiado larga...');
        return;
    }

    const tareas = obtenerTareasLS();
    if (tareas.some(t => t.toLowerCase() === texto.toLowerCase())) {
        mostrarError('Esa tarea ya existe.');
        return;
    }

    agregarTareaDOM(texto);

    tareas.push(texto);
    localStorage.setItem('tareas', JSON.stringify(tareas));

    textarea.value = '';
}

function mostrarError(mensaje) {
    const errorPrevio = document.querySelector('.error');
    if (errorPrevio) errorPrevio.remove();

    const divError = document.createElement('div');
    divError.classList.add('error');
    divError.textContent = mensaje;

    fila.insertAdjacentElement('afterend', divError);

    setTimeout(() => divError.remove(), 3000);
}

function agregarTareaDOM(texto) {
    const contenedor = document.createElement('div');
    contenedor.classList.add('tarea');
    contenedor.style.marginLeft = '10%';

    const p = document.createElement('p');
    p.textContent = texto;

    const borrarBtn = document.createElement('span');
    borrarBtn.textContent = 'X';
    borrarBtn.classList.add('borrar-tarea');
    borrarBtn.style.cursor = 'pointer';
    borrarBtn.style.color = 'red';
    borrarBtn.style.marginLeft = '10px';

    contenedor.appendChild(p);
    contenedor.appendChild(borrarBtn);

    listaTareas.appendChild(contenedor);
}

// Borrar tarea
function borrarTarea(e) {
    if (e.target.classList.contains('borrar-tarea')) {
        const tareaDiv = e.target.parentElement;
        const texto = tareaDiv.querySelector('p').textContent;

        // Eliminar del DOM
        tareaDiv.remove();

        // Eliminar del localStorage
        let tareas = obtenerTareasLS();
        tareas = tareas.filter(t => t !== texto);
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
}

// Obtener tareas del localStorage
function obtenerTareasLS() {
    return JSON.parse(localStorage.getItem('tareas')) || [];
}

// Cargar tareas al iniciar la página
function cargarTareas() {
    const tareas = obtenerTareasLS();
    tareas.forEach(agregarTareaDOM);
}
    