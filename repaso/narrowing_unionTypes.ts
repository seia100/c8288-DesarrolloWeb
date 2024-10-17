/* *******Narrowing con tipos de union ******** */

// defunumos un tipo de union que puese seer un string, un numero o un objeto Persona
type Persona2  = {
    nombre:string;
    edad:number;
};

type Dato = string | number | Persona2;

// funcion que rpocesa diferentes tipo de 'Dato' usando narrowing
const procesarDato = (dato: Dato) => {
    // Narring: si es un string
    if (typeof dato === 'string'){
        return `Dato es una cadena de texto ${dato}`;
    }
    // Narring: si es un numero
    if (typeof dato === 'number') {
        return `Dato es un numero ${dato}`;
    }

    // Narrowing si es un objeto Persona
    if (typeof dato === 'object' && 'nombre' in dato ){
        return `Dato es un objeto Persona ${dato.nombre}`;
    }
    return 'Dato desconocido';

};

// [ruebas con diferentes tipo de datos 
const resultado1 = procesarDato('Si puedo');
console.log(resultado1);

const resultado2 = procesarDato(23);
console.log(resultado2);

const resultado3 = procesarDato({nombre:'secure health', edad: 32});
console.log(resultado3);