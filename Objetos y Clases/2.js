class Persona {
    static contadorPersonas = 0;
    constructor(idPersona, nombre, apellido, edad) {
        this.idPersona = contadorPersonas;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        contadorPersonas ++;
    }

    get getidPersona(){
        return this.idPersona;
    }

    get getNombre(){
        return this.nombre;
    }

    set setNombre(nombre){
        this.nombre = nombre;
    }

    get getApellido(){
        return this.apellido;
    }

    set setApellido(apellido){
        this.apellido = apellido;
    }
    
    get getEdad(){
        return this.edad;
    }

    set setEdad(edad){
        this.edad = edad;
    }

    get toString(){
        
    }
}

class Empleado extends Persona {
    constructor(idEmpleado, sueldo) {
        this.idEmpleado = idEmpleado;
        this.sueldo = sueldo;
    }
}

class Cliente extends Persona {
    constructor(idCliente, fechaRegistro) {
        this.idCliente = idCliente;
        this.fechaRegistro = fechaRegistro;
    }
}