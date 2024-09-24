 // las constantes solo parecen inmutables y basically son de referencia
 // por lo tanto no se puede asignar a otro valor
 // los objetos y matrices no son primitivos

 // cuando trabajamos con matrices y objetos se puede mutar
 // es interesante porque podemos jugar con las variables

const primitiveDataType = 1;
try {
    primitiveDataType = 2; // aqui da un error ya que es un dato primitivo
    // por lo tanto 
} catch (err) {
    console.log(err);
}
const nonPrimitiveDataType = [];
nonPrimitiveDataType.push(1);

console.log(nonPrimitiveDataType);
