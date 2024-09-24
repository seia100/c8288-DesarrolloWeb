
 // ETIQUETADO
 // la funcion recive un iteral de plantilla como los valores de sustitucoin y realiza 
 // una funcion con ambos antes de devolver un valor

// el valor devuelto puede ser un valor primitivo

/*
literal de plantilla etiquedao

*/
function tag(literal, ...values) {
  console.log("literal", literal);
  console.log("values", values);// valoes de sustitucion como argumentos
  // 

  let result;
  switch (literal[1]) {
    case " plus ":
      result = values[0] + values[1];
      break;
    case " minus ":
      result = values[0] - values[1];
      break;
  }
  return `${values[0]}${literal[1]}${values[1]} is ${result}`;
  
}

let a = 1;
let b = 2;
let output = tag`What is ${a} plus ${b}?`;

console.log(output);
