// ARROW FUNCTIONS
/*
me da codigo limpio -> encapsulacion
y lo mas importante alcance lexico


*/

const traditional = function (x) { //funcion tradicional
    return x * x;
};

//FUNCION FLECHA
// si una funcion flecha tiene solo un parametro se puede omitir las llaves

const conciseBody = (x) => x * x;


const x = 32;
console.log(conciseBody(x));
console.log(traditional(x));

// mas funciones flecha y tradicionales
const sampleFuction = function(){};
const sayHelloNow = function(name){
    const now = new Date();
    console.log(`Hola ${name}, en ${now}`);

} 

const conciseFunction = () => {}
const concisSayHello = names => {
    const now = new Date();
    console.log(`Hola ${names}, en ${now}`);


}