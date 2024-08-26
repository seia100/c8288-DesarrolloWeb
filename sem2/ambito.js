// como es par definir una variable: 3. va, let y const
/*
som importantes para determinar el tema de programacion
pero las variables difieren en su alcance

Las variables y el ambito van de la mano para poder trabajar en fullstack

vamos a definir el alcance:

    es una area del codigo en la que podemos acceder y usar variables
    lo que sicede es que tenemos 3 tipos de niveles de alcance


    TIPOS DE ALCANCE
    global: esta en toda parte del codigo 
    modulo: es solo a un modulo en especifico
    function: cuando creamos una funcion y esta dentro de ella 
    bloque: se aplica a cualquier parte de codigo que esta dentro de llaves es la parte mas pequena 
*/

/// GLOBAL: sin importar la ubicaicon de la variable siempre va a estar disponible

var globlaVar = 'Soy una variable global';
function checkGlobal(){
    console.log(globlaVar) // se puede acceder porque globar var es global

}

checkGlobal;// Soy una variable global
console.log(globlaVar) // imprime: sou una variable global

/// modulo --> module1.js
let modulevar = 'Soy un modulo';
export function checkModule(){
    console.log(module.var) // se puede accede a modulevar porque esta en el mismo modulo
}


// modulo2.js
import {checkModule} from './module1.js';
checkModule(); // se puede acceder a la funcion importada

// Function
function checkFunctionScope(){
    var functionvar = 'debe estar dentro de la function por lo que si se llama de manera externa';
    console.log(functionvar);
}

checkFunctionScope();
console.log(functionvar); // en este caso no es correcto ya que la variable solo es interna dentro de la function

/// ALCANCE DE BLOQUE
if (true){
    let blockvar = 'dentro del bloque';
    console.log(blockvar);
}
console.log(blockvar); //esta variable supuestamente no es alcanzable pero gpt me dice lo contrario ji

