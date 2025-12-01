import { recogerInfo } from "./resumen.js";


//llamamos a la api
export async function mostrarPlatos() {
    try {
        const url = "http://localhost:4000/platillos";
        const tabla = document.querySelector('.contenido');

        const resultado = await fetch(url);
        const texto = await resultado.json();

        ponerPlatos(texto, tabla);

        tabla.addEventListener('click', e => {
            if (e.target.classList.contains('eliminar')) {
                e.preventDefault();
                const id = e.target.dataset.cliente;
                eliminarCliente(e, id);
            }
        });

    } catch (error) {
        console.log(error);
    }
}

//mostramos platos

function ponerPlatos(texto, tabla) {
    let categorias = "";
    tabla.innerHTML = '';
    texto.forEach(element => {
        if (element.categoria === 1) {
            categorias = "Comida";
        } else {
            if (element.categoria === 2) {
                categorias = "Bebida";    
            } else {
                categorias = "Postre";
            }    
        }

        tabla.innerHTML += `
            <div class="row py-3 border-top">
                <div class="col-md-4 nombre">${element.nombre}
                </div>
                <div class="col-md-3 fw-bold precio">${element.precio}</div>
                <div class="col-md-3 categoria">${categorias}</div>
                <div class="col-md-2 id"><input id="${element.id}" type="number" class="form-control cant" value=0 min=0></div>
            </div>`;
    });
    document.addEventListener("DOMContentLoaded", recogerInfo);

    recogerInfo();

}