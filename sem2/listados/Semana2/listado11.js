this.scope = "lexical scope";

const scopeOf = {
    scope: "defining scope",
    // definimos dos funciones para devolver el valor de this.scope
    traditional: function () { // segunda propiedad que se ha definido 
        // scopeOf.tradicional devuelve el alcance definidor 
        return this.scope;
    },

    arrow: () => { // se refiere a la primera propiedad definida
        // scopeOf.arrow retorna devuelve el alcance lexico
        return this.scope;
    },
};

/*
lo que hemos visto es manejar un callbacks 
y lo que hace es que en el codigo se va a llenar de funciones y llaves

tener cuidado con las funciones y con las llaves. POr lo que el 
uso de las arrow functions es para escribir callbacks

*/

console.log(scopeOf.traditional());
console.log(scopeOf.arrow());
