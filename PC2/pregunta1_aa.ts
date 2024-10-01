// Estructura de una solicitud
interface Solicitud {
    id: number;
    tiempoProcesamiento: number;
}

// Variables globales
let contadorSolicitudes = 0;         // Contador para asignar IDs únicos
let enProceso: Solicitud[] = [];     // Solicitudes en proceso
let cola: Solicitud[] = [];          // Solicitudes en cola de espera
let ultimaSolicitudTimestamp = Date.now(); // Marca de tiempo para controlar la inactividad

// Constantes
const TIEMPO_ENTRE_SOLICITUDES = 2000;  // Llegada de nuevas solicitudes cada 2 segundos
const LIMITE_PARALELO = 5;              // Máximo de solicitudes procesadas simultáneamente
const TIEMPO_DETECCION_INACTIVIDAD = 10000;  // Si no hay actividad en 10 segundos, se detiene el servidor

// Función para procesar una solicitud con callbacks
function procesarSolicitud(solicitud: Solicitud, callback: (error: string | null, resultado: string | null) => void) {
    // Simulamos un tiempo de procesamiento entre 1 y 5 segundos
    const tiempoDeProcesamiento = solicitud.tiempoProcesamiento;

    // Simulación de fallo: 20% de las solicitudes fallan
    const fallo = Math.random() < 0.2;

    setTimeout(() => {
        if (fallo) {
            callback(`Error: La solicitud ${solicitud.id} falló durante el procesamiento.`, null);
        } else {
            callback(null, `Solicitud ${solicitud.id} procesada correctamente en ${tiempoDeProcesamiento} segundos.`);
        }
    }, tiempoDeProcesamiento * 1000);  // Simulamos el tiempo de procesamiento
}

// Función para agregar una nueva solicitud al servidor
function agregarSolicitud() {
    const nuevaSolicitud: Solicitud = {
        id: ++contadorSolicitudes, // cada vez que se itera un ID unico lo que c va hacer es sumar 1
        // el tiempo de procesamiento lo que ahora 
        tiempoProcesamiento: Math.floor(Math.random() * 5) + 1  // Entre 1 y 5 segundos de procesamiento
    };

    // Si hay espacio para procesar la solicitud de inmediato
    if (enProceso.length < LIMITE_PARALELO) {
        enProceso.push(nuevaSolicitud);
        procesarSolicitud(nuevaSolicitud, manejarResultadoSolicitud);
    } else {
        // Si no hay espacio, agregamos la solicitud a la cola
        cola.push(nuevaSolicitud);
        console.log(`La solicitud ${nuevaSolicitud.id} fue agregada a la cola.`);
    }

    // Actualizamos el tiempo de la última solicitud recibida
    ultimaSolicitudTimestamp = Date.now();
}

// Función para manejar el resultado de una solicitud
function manejarResultadoSolicitud(error: string | null, resultado: string | null) {
    // Quitamos la solicitud en proceso (se elimina la primera del array)
    enProceso.shift();

    if (error) {
        console.log(error);  // Mostramos el error
    } else {
        console.log(resultado);  // Mostramos el resultado exitoso
    }

    // Si hay solicitudes en la cola, las procesamos cuando hay espacio
    if (cola.length > 0) {
        const siguienteSolicitud = cola.shift()!; // eliminamos el ultimo valor
        enProceso.push(siguienteSolicitud);
        procesarSolicitud(siguienteSolicitud, manejarResultadoSolicitud);
    }
}

// Función para simular la llegada de solicitudes cada 2 segundos
function iniciarSimulacion() {
    const intervaloSolicitudes = setInterval(() => {
        agregarSolicitud();

        // Comprobamos si han pasado más de 10 segundos sin recibir solicitudes
        if (Date.now() - ultimaSolicitudTimestamp > TIEMPO_DETECCION_INACTIVIDAD) {
            clearInterval(intervaloSolicitudes);  // Detenemos el intervalo de nuevas solicitudes
            console.log("Servidor detenido por inactividad.");
        }
    }, TIEMPO_ENTRE_SOLICITUDES);
}

// Iniciamos la simulación
iniciarSimulacion();



