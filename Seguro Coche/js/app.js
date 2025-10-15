document.addEventListener("DOMContentLoaded", seguro);

function seguro() {
    document.querySelector('#cotizar-seguro').addEventListener('submit', botonCalcular);
}

function botonCalcular() {
    const tipo = document.querySelector("#gama");
    const year = document.querySelector("#year");
    const tipoSeguro = document.querySelector("input:checked");
    
    console.log(tipo.value);
    console.log(year.value);
    console.log(tipoSeguro.value);
    
    
    
}