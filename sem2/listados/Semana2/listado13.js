//  se presentan etiquetados iterados y no iterados
// nostros encerramos los iterales en comillas invertidas y expresiones y usamos un signo dolar

// un iteral de plantillas de cadnas sin iterar esta encerrado en comillas invertidas
// lo que hace el parser sustituye los marcadores de posicion en un iteral de ejecucion


let a = 1;
let b = 2;
let string = `${a} + ${b} = ${a + b}`;
console.log(string);
