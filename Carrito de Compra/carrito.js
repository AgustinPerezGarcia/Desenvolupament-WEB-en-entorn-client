document.addEventListener("DOMContentLoaded", carrito);

    const cursos = [];

function carrito() {
    const botones = document.querySelectorAll('.agregar-carrito');

    botones.forEach(e => {
        e.addEventListener("click", guardarCurso);
        e.addEventListener("click", agregarCarrito);
    });


    document.querySelector('#vaciar-carrito').addEventListener('click', borrarCarrito);
    document.querySelector('#carrito').addEventListener('click', quitar1Curso);
   
}

// Guarda la información del curso seleccionado en el array "cursos"
function guardarCurso(e) {
    const infoCurso = e.target.parentElement.parentElement;

    const imgCurso = infoCurso.querySelector('img').src;
    const titulo = infoCurso.querySelector('h4').textContent;
    const prov = infoCurso.querySelector('p').textContent;
    const estrella = infoCurso.querySelector('.info-card img').src;
    const precio = infoCurso.querySelector('.precio span').textContent;
    const id = parseInt(e.target.getAttribute('data-id'));

    const existe = cursos.some(curso => curso.id === id);

    if (existe) {
        cursos[id].cant++;
    } else {
        const curso = {
            imagen: imgCurso,
            titulo: titulo,
            prov: prov,
            estrella: estrella,
            precio: precio,
            id: id,
            cant: 1,
        };

        cursos[id] = curso;
    }

    console.table(cursos);
}

// Actualiza la tabla del carrito con los cursos agregados
function agregarCarrito() {
    const carrito = document.querySelector('#carrito tbody');
    let carro = '';

    cursos.forEach(element => {
        if (element) { // Verifica que el elemento exista
            carro += '<tr><td><img src="' + element.imagen + '" width="100"></td><td>' + element.titulo + '</td><td>' + element.precio + '</td><td>' + element.cant + '</td><td><a href="#" class="borrar-curso" data-id="' + element.id + '"> X </a></td></tr>';
        }
    });

    carrito.innerHTML = carro;
}

// Vacía completamente el carrito y limpia la tabla
function borrarCarrito() {
    const carrito = document.querySelector('#carrito tbody');
    cursos.length = 0;
    carrito.innerHTML = "";
}

// Quita una unidad de un curso del carrito o lo elimina si queda a cero
function quitar1Curso(e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    
    if (cursos[id].cant === 1) {
        borrarCurso(id);
    } else {
        cursos[id].cant--;
        agregarCarrito();
    }
}

// Elimina un curso del carrito por completo y actualiza la tabla
function borrarCurso(id) {
    delete cursos[id];
    agregarCarrito();
}