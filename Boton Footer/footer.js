document.addEventListener("DOMContentLoaded", footer);

function footer() {
    document.querySelector('.btn-flotante').addEventListener("click", mostrar);
    document.querySelector('.btn-flotante').addEventListener("click", color);
    document.querySelector('.btn-flotante').addEventListener("click", nombre);
    document.querySelector('.btn-flotante').addEventListener("click", cambiarClass);
    document.querySelector('#btn-flotante-cambio').addEventListener("click", mostrar);
    
}

function mostrar() {
    const mostrar = document.querySelector('#footer');
    if ( mostrar.classList.value === "footer") {
        mostrar.classList.add("activo");    
    }else{
        mostrar.classList.remove("activo");
    }
    
}

function color() {
    const color = document.querySelector('.btn-flotante');
    if (color.style.backgroundColor === "rgb(218, 89, 94)") {
        color.style.backgroundColor = "#ffffff";
    } else {
        color.style.backgroundColor = "#da595e";     
    }

}

function nombre() {
    const texto = document.querySelector('.btn-flotante');
    if (texto.textContent === "XCerrar") {
        texto.textContent = "Descubre más...";
    } else {
        texto.textContent = "XCerrar";
    }

}

function cambiarClass() {
    const cambiar = document.querySelector('.btn-flotante');
    cambiar.classList.add("btn-flotante-cambio");
}