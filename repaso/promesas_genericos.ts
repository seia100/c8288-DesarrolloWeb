// Ejemplo con genericos y async / await

// Definimos una funcion que simula una llamda a un servidor para obtener datos 
// usamos un generico <T> para que la funcion pueda manejar cualquier tipo de dato 
function obtenerDatosDelServidor<T>(datos: T, tiempo: number): Promise<T>{
    return new Promise((resolve, reject)=>{
        // simulamos uun retraso asicnno con setTimeoit
        setTimeout(()=>{
            // simulamos un retraso asincrono con setTimeout
            if(datos){
                // si los datos no son nulos, resolvemos la promesa con los datos pasado 
                resolve(datos);

            }else{
                // si no se pasan datos rechazamos la promesa
                reject ('Error: No se encontraron datos');
            }

        }, tiempo);
    });
}

// definimos una dunction asincrona que utiliza la funcion obtenerDatosDelServidor
// Aqui aplicamos la sintaxis de async/await para esperar la resolucion de la promesa
async function procesarDatosAsync(){
    try{
        // esperamos a que obtenerDatosDelServidor resueva con un objeto de tipo Persona
        const persona = await obtenerDatosDelServidor<{nombre: string, edad: number}>({
            nombre: 'secure health',
            edad: 21
        }, 2000); // simulamos un retraso de 2"
    console.log('datos obtenidos de persona: ', persona);

    // esperamos a que obtenerDatosDelServidor resulva con un array de numero
    const numero = await obtenerDatosDelServidor<number[]>([1,2,3,4,5], 1000);
    console.log('datos obtenidos de numero: ', numero);

    } catch(error){
        console.error('Error procesando los datos: ',error);
    }

    

}

//ejecutamos la funcion para procesar los dato
procesarDatosAsync();