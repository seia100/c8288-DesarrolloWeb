// Definimos una interfaz para manejar los resultados de la función
// que pueden ser exitosos o fallidos.
interface Resultado<T> {
    exito: boolean;
    data?: T;          // Datos en caso de éxito
    error?: string;    // Mensaje de error en caso de fallo
}

// Función que simula obtener datos del servidor con un genérico <T>.
// En caso de éxito, resuelve la promesa. En caso de fallo, la rechaza.
const obtenerDatosDelServidor = <T>(datos: T, tiempo: number): Promise<T> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (datos) {
                resolve(datos);
            } else {
                reject('Error: Datos no disponibles'); // Rechazamos con un mensaje de error
            }
        }, tiempo);
    });
};

// Función asíncrona que gestiona la resolución de la promesa y los posibles errores.
// Aquí aplicamos un retorno sofisticado que encapsula tanto el éxito como el error.
const gestionarDatosAsync = async <T>(datos: T, tiempo: number): Promise<Resultado<T>> => {
    try {
        // Intentamos obtener los datos del servidor
        const respuesta = await obtenerDatosDelServidor(datos, tiempo);
        return {
            exito: true,
            data: respuesta // En caso de éxito, retornamos los datos
        };
    } catch (error) {
        // En caso de error, retornamos un objeto con el mensaje de error
        return {
            exito: false,
            error: typeof error === 'string' ? error : 'Error desconocido'
        };
    }
};

// Función principal que consume gestionarDatosAsync y gestiona el resultado
const ejecutarAsync = async () => {
    // Probamos con un conjunto de datos válido
    const resultadoPersona = await gestionarDatosAsync({ nombre: 'Juan', edad: 30 }, 2000);

    if (resultadoPersona.exito) {
        console.log('Datos recibidos:', resultadoPersona.data);
    } else {
        console.error('Error al obtener datos de persona:', resultadoPersona.error);
    }

    // Probamos con un conjunto de datos inválido (null) para forzar un error
    const resultadoError = await gestionarDatosAsync(null, 1000);

    if (resultadoError.exito) {
        console.log('Datos recibidos:', resultadoError.data);
    } else {
        console.error('Error al obtener datos:', resultadoError.error);
    }
};

// Ejecutamos la función principal
ejecutarAsync();
