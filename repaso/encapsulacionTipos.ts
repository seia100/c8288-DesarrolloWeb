/* ENCAPSULAICON CON CLASES Y MODIFICADORES DE ACCESO */


// clase persona con encapsilacion en las propiedades
class Person{
    
    // Propiedades privadas: solo accesibles dentro de la clase
    private nombre: string;
    private edad: number;

    // Propiedades protegidas: accesibles solo dentro de la clase y clases derivadas 
    protected id: number;

    // Constructor para inicializar los datos
    constructor(nombre: string, edad: number, id: number){
        this.nombre = nombre;
        this.edad = edad;
        this.id = id;
    }

    // Getter para obtener nombre
    // aqui controlamos que datos pueden ser accedidos externamente
    public getNombre(): string{
        return this.nombre;
    }

    // getter y setter publico para la edad
    // el setter nos permite controlar los cambios de valor
    public getEdad(): number{
        return this.edad;

    }

    public setEdad(nuevaEdad: number): void{
        if(nuevaEdad> 0 && nuevaEdad <= 110) this.edad = nuevaEdad;
        else throw new Error('La edad debe ser positiva');
    }

    // metodo protegido: solo accesoble desde la clase o clases derivadas
    protected getId(): number{
        return this.id;
    }

}

// clase Empleado que hereda de Persona
class Empleado1 extends Person{
    private sueldo: number;
    constructor (nombre: string, edad: number, id: number, sueldo: number){
        super(nombre, edad, id);
        this.sueldo = sueldo;
    
    }

    // Metodo puvlico que expone un dato encapsulado, ademas de usar datos heredados
    public getDatos(): string{
        return `Nombre: ${this.getNombre()}, Edad: ${this.getEdad()}, 
                ID: ${this.getId()}, Sueldo: ${this.sueldo}`;
    }
}

// crear un objeto de la clase Empleado
const empleadoRan = new Empleado1('Ramon', 21,4212,25000);

// intentamos acceder a los datos
console.log(empleadoRan.getDatos());

// acceso restringido: esto causara errores ya que son privados o protegidos
// empleado.nombre          // eeprrp: nombre es priado
// empleado.id;        // Error: 'id' es protegido
// empleado.getId();   // Error: 'getId' es protegido


// modificamos la edad usando el setter
empleadoRan.setEdad(15);
console.log(empleadoRan.getEdad());

//intento de asignar una edad invalida para generar un eroro
try{
    empleadoRan.setEdad(-3); // lanzara un error
}catch(error){
    console.log(error); // manejo del error
}