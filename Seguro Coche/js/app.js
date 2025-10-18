document.addEventListener("DOMContentLoaded", seguro);
document.addEventListener("DOMContentLoaded", ponerYear);

function ponerYear() {
    year = new Date().getFullYear();  
    fin = year - 20;
    

    yearDes = document.querySelector('#year');

    for (let index = year; index > fin; index--) {
        desplegable = document.createElement('option');
        desplegable.value = index;
        desplegable.textContent = index;

        yearDes.appendChild(desplegable);
               
    }
}

function seguro() {
    document.querySelector('#cotizar-seguro').addEventListener('submit', comprobarCampos);
}

function comprobarCampos() {
    const tipo = document.querySelector("#gama");
    const year = document.querySelector("#year");

    if (tipo.value !== "" && year.value !== "") {
        botonCalcular(tipo, year);
    } else {
        setTimeout(sacarError, 500);
    }
}

function botonCalcular(tipo, year) {
    const tipoSeguro = document.querySelector("input:checked");

    const calculo = new Poliza(tipo.value, year.value, tipoSeguro.value);

    calculo.calcularSeguro();

    calculo.mostrarInfoHTML();

    console.log(tipoSeguro.value);
    
    console.log(calculo.gama);
    
    
    console.log(calculo);
    
}

function sacarError() {
    forms = document.querySelector('#resultado');
    alerta = document.createElement('p');

    alerta.classList.add('error');
    alerta.classList.add('mt-10');
    alerta.textContent = "Todos los campos son OBLIGATORIOS";

    console.log(alerta);
    
    if (forms.children.length === 0) {
        forms.insertBefore(alerta, forms.children[0]);       

    } else {
        forms.removeChild(forms.children[0])
        forms.insertBefore(alerta, forms.children[0]);
    }

}