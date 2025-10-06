function mostrarReloj() {

    let ahora = new Date();
    
    //Busco los elementos en el documento
    const hora = document.getElementById('hora');
    const fecha= document.getElementById('fecha');
    const contenedor = document.getElementById('contenedor');

    // Pongo la hora
    hora.textContent = ahora.toLocaleTimeString('es-ES');

    // Pongo la fecha 
    fecha.textContent = ahora.toLocaleDateString('es-ES', {
        weekday: 'short', day: 'numeric', month: 'short'
    });

    contenedor.classList.toggle('animar');
}

mostrarReloj(); // Carga el reloj para que no pase un segundo sin mostrar nada
setInterval(mostrarReloj, 1000);
