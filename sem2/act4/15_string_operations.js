/*
Escribe un script que tome una cadena de texto y realice varias operaciones: dividirla en un
array de palabras, ordenar el array alfabéticamente, y luego unir las palabras en una cadena
nuevamente. Realiza operaciones similares en un array de números.
*/


function processString (input){
    // 1. dividir la cadena en un array de palabras 
    let wordsArray = input.split(' ');

    // 2. ordenar el array alfabeticamente
    let sortArray = wordsArray.sort();

    // 3.  unir las palabras en una cadea nuevamente
    let joinArray = wordsArray.join(' ');
    console.log(wordsArray);
    console.log(sortArray);
    
    return joinArray;

}




// Ejemplo de uso
let inputString = "el rápido zorro marrón salta sobre el perro perezoso";
let resultString = processString(inputString);
console.log(resultString);
// Output: "el el marrón perro perezoso rápido salta sobre zorro"

