//Declaracion de variables
let nombre = prompt("Cual es su nombre?")
let salarioAcutal = parseFloat(prompt("Cual es su salario actual?"))
let nHijos = parseInt(prompt("Indica el numero de tus hijos"))
let edad = parseInt(prompt("Indica tu edad"))
let nuevoSalario = ""

//Cumplimiento de las variables
switch (true) {
    case salarioAcutal <= 1000 && edad < 30:
        if (nHijos > 0) {
            nuevoSalario = 1200;
        }else{
            nuevoSalario = salarioAcutal * 0.05 + salarioAcutal;
        }
        break;

    case edad >= 30 && edad <= 45:
        if (salarioAcutal < 1250 && nHijos > 1) {
            nuevoSalario = salarioAcutal * 0.1 + salarioAcutal
        } 
        if (salarioAcutal < 1250 && nHijos < 3) {
            nuevoSalario = salarioAcutal * 0.15 + salarioAcutal
        }
        break;
    
    case edad > 45:
        if (salarioAcutal <= 2000) {
            nuevoSalario = salarioAcutal * 0.15 + salarioAcutal    
        }
        break;
        
}

if (!nuevoSalario) {
    alert(`Se llama ${nombre}, tiene un salario de ${salarioAcutal} y no tiene nuevo salario`)
} else {
    alert(`Se llama ${nombre}, tiene un salario de ${salarioAcutal} y su nuevo salario es ${nuevoSalario}`)
}
