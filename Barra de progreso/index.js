//Cogemos los elementos del html
const contador = document.querySelector(".contador");
const barra = document.querySelector(".barraFront");

let progreso = 0;

function avanzar() {
  progreso++;
  contador.textContent = progreso + "%";
  barra.style.width = progreso + "%";

  // Cuando llegue al 100% detenemos el intervalo
  if (progreso >= 100) {
    clearInterval(intervalo);
  }
}

let intervalo = setInterval(avanzar, 75); // Vamos subiendo la barra cada 75ms
