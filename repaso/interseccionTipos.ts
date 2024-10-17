// definimos un tipo llamado 'Persona que itnee dos propiedades:
// nombre:cadena de texto
// edad: un numero
type Persona1 = {
    nombre:string;
    edad:number;

};

// definimos otro tipo llamado 'Empleado' que tiene dos propiedades
// idEmpleado: identifica al empleado
// puesto: indica el cargo o puesto
type Empleado = {
    idEmpleado: number;
    puesto: string;
};

// usamos la interseccion de tipos (&) para combinar ambos tipos
// esto significa que el nuevo tipo 'PersonaEmeplado' tiene TODAS las propoedades de los tipos anteriores
type PersonaEmpleado = Persona1 & Empleado;

// creamos un objeto 'tranajador que cumple con el tipo 'PersonaEmpleado'
const trabajador: PersonaEmpleado = {
    nombre: 'Juan',
    edad: 39,
    idEmpleado: 2010,
    puesto: 'cybersecurer'
}

// Imprimimos el objeto trabajador para verificar que contiene todas las propiesdades
console.log(trabajador);

