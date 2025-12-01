//mostramos lsa dos secciones
export function mostrar() {
    const platillos = document.querySelector('#platillos');
    const resumen = document.querySelector('#resumen');

    platillos.classList.remove('d-none');
    resumen.classList.remove('d-none');

}

