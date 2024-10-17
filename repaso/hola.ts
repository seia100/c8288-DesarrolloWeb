// estos son arreglos y tuplas
let numero: number[] = [1, 2, 3, 4];
let tuplas: [string, number] = ['juan',32];

// funciones con tipos
function sumar (a : number, b: number): number{
    return a+b;
}

// objetos
type Persona = {
    nombre: string;
    edad: number;
}

// interfaces
interface Animal {
    nombre: string;
    edad: number;
}