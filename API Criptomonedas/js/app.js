document.addEventListener("DOMContentLoaded", agregarCryptos);

function agregarCryptos(e) {
    e.preventDefault();
    cogerCryptos();

    document.querySelector("[type='submit']").addEventListener("click", (e)=>{comprobarEleccion(e)});

}

async function cogerCryptos() {
    try {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=EUR";

        const desCryptos = document.querySelector("#criptomonedas");

        const resultado = await fetch(url);
        const texto = await resultado.json();

        texto.Data.forEach(element => {
            desCryptos.innerHTML += `<option value="${element.CoinInfo.Name}">${element.CoinInfo.FullName}</option>`;

        });

    } catch (error) {
        console.log(error);
    }
}

let errorVar = 0;

function comprobarEleccion(e) {
    e.preventDefault();

    const moneda = document.querySelector('#moneda');
    const crypto = document.querySelector('#criptomonedas');


    if (moneda.value === "" || crypto.value === "") {
        if (errorVar === 0) {
            mensajeError();
            setTimeout(borrarError, 2000);
            errorVar++;
        }

    } else {
        hacerConversion(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${moneda.value}`, moneda.value, crypto.value);
    }

}

async function hacerConversion(url, moneda, crypto) {
    const resultado = await fetch(url);
    const texto = await resultado.json();

    let infoCrypto = 0;
    let rawCrypto = 0;
    
    texto.Data.forEach(element => {                
        if (element.CoinInfo.Name === crypto) {
            infoCrypto = element.CoinInfo;
            rawCrypto = element.RAW[moneda];        

        }
    });     


    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = rawCrypto;
    
    const divResultado = document.querySelector('#formulario');

    const divAnterior = divResultado.querySelector('.div');
    if (divAnterior) divAnterior.remove();

    const div = document.createElement('div');
    div.classList.add("div");
    div.innerHTML = "";
    divResultado.appendChild(div);

    const resultadoDiv = div;
    
    const fecha = new Date(LASTUPDATE * 1000);

    const p1 = document.createElement("p");
    p1.classList.add("resultado");
    p1.innerHTML = `El Precio es: <strong>€ ${PRICE}</strong>`;
    resultadoDiv.appendChild(p1);

    const p2 = document.createElement("p");
    p2.classList.add("resultado");
    p2.innerHTML = `Precio más alto del día: <strong>€ ${HIGHDAY}</strong>`;
    resultadoDiv.appendChild(p2);

    const p3 = document.createElement("p");
    p3.classList.add("resultado");
    p3.innerHTML = `Precio más bajo del día: <strong>€ ${LOWDAY}</strong>`;
    resultadoDiv.appendChild(p3);

    const p4 = document.createElement("p");
    p4.classList.add("resultado");
    p4.innerHTML = `Variación últimas 24 horas: <strong>${CHANGEPCT24HOUR}%</strong>`;
    resultadoDiv.appendChild(p4);

    const p5 = document.createElement("p");
    p5.classList.add("resultado");
    p5.innerHTML = `Última actualización: <strong>${fecha.toLocaleDateString()}</strong>`;
    resultadoDiv.appendChild(p5);
    
}

function mensajeError() {
    const form = document.querySelector('#formulario');

    const p = document.createElement("p");
    p.classList.add("error")
    p.textContent = "ambos campos son obligatorios";

    form.appendChild(p);   
}

function borrarError() {
    const error = document.querySelector('.error');

    error.remove();

    errorVar = 0;

}