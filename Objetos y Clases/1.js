const nArray = [];
    //Propiedades del array
nArray.min = parseFloat(prompt("Introduce el numero mas pequeño:"));
nArray.max = parseFloat(prompt("Introduce el numero mas grande:"));

for (let index = nArray.min; index < nArray.max+1; index++) {

    nArray.push(index);
    console.log(index);
    
}

document.write(`<h3>El array según su intervalo es: ${nArray.join(", ")}</h3>`);
document.write(`<p>El valor mínimo del array es: ${nArray.min}</p>`)
document.write(`<p>El valor maximo del array es: ${nArray.max}</p>`)


console.log(nArray);

const arrayAleatorio = [];

for (let index = 0; index < 5; index++) {
    arrayAleatorio.push(Math.floor(Math.random()*(99-1)+1));
    
}
let maxA = 0;
let minA = 101;
arrayAleatorio.forEach(element => {

    if (maxA <= element) {
        maxA = element;
    }
    if (minA >= element) {
        minA = element;
    }
     
});

document.write(`<h3>El array con números aleatorios es: ${arrayAleatorio.join(", ")}</h3>`);
document.write(`<p>El valo mínimo del nuevo array es: ${minA}</p>`);
document.write(`<p>El valo mínimo del nuevo array es: ${maxA}</p>`);