/* *******Narrowing con tipos de union ******** */
// funcion que rpocesa diferentes tipo de 'Dato' usando narrowing
var procesarDato = function (dato) {
    // Narring: si es un string
    if (typeof dato === 'string') {
        return "Dato es una cadena de texto ".concat(dato);
    }
    // Narring: si es un numero
    if (typeof dato === 'number') {
        return "Dato es un numero ".concat(dato);
    }
    // Narrowing si es un objeto Persona
    if (typeof dato === 'object' && 'nombre' in dato) {
        return "Dato es un objeto Persona ".concat(dato.nombre);
    }
    return 'Dato desconocido';
};
// [ruebas con diferentes tipo de datos 
var resultado1 = procesarDato('Si puedo');
console.log(resultado1);
var resultado2 = procesarDato(23);
console.log(resultado2);
var resultado3 = procesarDato({ nombre: 'secure health', edad: 32 });
console.log(resultado3);
