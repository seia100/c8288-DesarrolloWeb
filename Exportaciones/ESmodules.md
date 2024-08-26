## Tipos de exportacion en modu;es
NAME
DEFAULT

exprotaciones predeterminadas
- requiere un nombre para importar

exportacoin nombredas 

no necesarimenete 
 se requiere renombrar  y se hace con la expresion "as"
 en listado 1 lo que tenemos
   es mejor utlizar exportaciones nombradas en reeplazo de predeterminadas
   define de manera unica para un modudlo
   corremos el riesgo de descargar la misma funcion varias veces


en cambio las predeterminadas va a depender que sea de manera unica

para emplear una nombrada es cuando exporte mas de un item

la sintaxis predeterminadas es para trabajar con modulos de terceros

```js
// Exportaciones predeterminadas
const getFoo = function(){ // declaramos una funcion anonima  y 
  return 'foo'
};
export default getFoo; // exportamos la funcion predeterminada del modulo
// podemos exportar exportacion moduladas en linea o al final del archivo  usando llaves como las qe se muestra a continuacion

export const getFuncBar = function () q
que esta en el file listado2.js del repo de kapumota del repo del curso
```
