let numero = parseFloat(prompt("Dime un numero: "))
let nºveces = parseFloat(prompt("Dime cuantas veces quieres que se duplique el numero: ", ""))

if (isNaN(nºveces)) {
    doble(numero);
} else {
    doble(numero, nºveces);    
}


function doble(numero, nºveces = 3) {
    console.log(`El numero es ${numero} y se hallara el doble ${nºveces} veces`)
    for (let index = 0; index < nºveces; index++) {
        numero = numero * 2
        console.log(`${numero}`);
                
    }
    
}