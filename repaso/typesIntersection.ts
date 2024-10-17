// definimos el tipo de usuario
type User = {
    name: string;
    age: number;
};


// Definimos otro tipo "Aditional data" que tiene permisosy estado
// Este tipo se reefiere a datos adicionales que se pueden asignar a Usuario
type additionalData = {
    permisos: string[];
    // usamos un "literal type" para restringit los valores de estado
    estado: "activo"|"inactivo"; 

} 

// usmaos una interseccion de tipos para combinar "user" y "additionalData"
// esto crea un tipo que se debe cumplir con las propiedaddes de ambos tipos
type UsuarioConDatos = User & additionalData;

// definimos una interfaz "response" que es generica y coma un tipo T
interface ApiResponse<T> {
    data: T;
    status: Status;
}

//  Creamos un alias de tipo llamdo "Status" que puede tomar uno de tres valores: "success", "error" o "loading".
type Status = "success" | "error" | "loading";

// La function fetchData es generica y toma como un parametro "url" (de tipo strign).
// Retorna una promesa que resuelva con una respuesta (Response<T>)
//      donde T es un tipo generico que se define al usar la funcion
function fetchData<T>(url: string): Promise<ApiResponse<T>>{
    // retornamos una nueva promesa
    return new Promise((resolve, reject)=>{
        // simulamos una peticion asinctiona con setTimeout
        setTimeout(()=>{
            // Si la URL es valida, resolvemos la promesa con un estado de exito
            // (status: "success")
            if (url){
                resolve({
                    data: {} as T, // simulamos que los datos devueltos son del tipo T
                    status: "success", // el estado d ela respuesta es "success"

                });

            }else{
                // si no hay irl valida, rechazamos la promesa conun estado de error
                reject({
                    data: null, // no hay datos
                    status: "error", // el estado de la respuesta es error.
                });
            }
        },1000); //simnulamos un retardo de un segundo.
    })
}

// esta funcion es asincrona, lo que significa que podemos usar await para manejar promesas
// Dentro de la funcion, usamos la interseccion de tipos para obtener un UsuraioConDatos
async function getUserData(){
    try{
        // llamamos a la funcion fetchData con una URL invalida
        const response = await fetchData<UsuarioConDatos>("invalid-url");
        // extraemos los datos de la respuesta
        const userData = response.data;
        // y los imprimimos
        console.log(userData);
    }catch(error){
        // si hay un error, lo imprimimos
        console.error(error);
    }
}

// llamamos a la funcion getUserData
getUserData();
