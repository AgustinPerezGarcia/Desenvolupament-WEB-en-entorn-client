let respuesta = "t";

while (respuesta != "n" && respuesta != "l") {
    respuesta = prompt("Que prefieres numeros o letras? (n/l)");
    if (respuesta === null) {
        alert("NO se va a hacer nada");
        break;
    }
    if (respuesta === "n"){
        alert("Has elegido numeros");
    }
    if (respuesta === "l"){
        alert("Has elegido letras");
    }
}

const volumen1 = {
    array: [],

    get getArray() {
        return this.array;
    }
};
const volumen2 = {
    array: [],

    get getArray() {
        return this.array;
    }
};

if (respuesta == "n") {
    for (let index = 0; index < 10; index++) {
        volumen1.array[index] = Math.floor(Math.random() * 20)+1;
        volumen2.array[index] = Math.floor(Math.random() * 20)+1;
    }
};

if (respuesta == "l") {
    const letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let index = 0; index < 10; index++) {
        volumen1.array[index] = letras.charAt(Math.floor(Math.random() * letras.length));
        volumen2.array[index] = letras.charAt(Math.floor(Math.random() * letras.length));
    }
};

console.log(volumen1.array);
console.log(volumen2.array);


console.log("La union de los conjuntos es:");
const union = [...volumen1.array, ...volumen2.array];
console.log(union);
 
console.log("Los elementos en comun son:");
const interseccion = volumen1.array.filter(valor => volumen2.array.includes(valor));
console.log(interseccion);

console.log("Los elementos que estan en el primer conjunto pero no en el segundo son:");
const diferencia = volumen1.array.filter(value => !volumen2.array.includes(value));
console.log(diferencia);
