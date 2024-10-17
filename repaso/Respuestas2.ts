// Version de la evaluación - parte 1
//Ejercicio: Simulación de un servidor web con temporizadores y async/await
// Fase 1: Uso de Callbacks
// servidor_callbacks.js

// Clase Temporizador: Simula setTimeout y setInterval
class Temporizador {
    constructor() {
        this.tareas = [];
        this.iniciar();
    }

    iniciar() {
        const loop = () => {
            const ahora = Date.now();
            this.tareas.forEach((tarea, index) => {
                if (ahora >= tarea.ejecucion) {
                    tarea.funcion();
                    this.tareas.splice(index, 1);
                }
            });
            // Ejecuta el loop en el próximo ciclo de eventos
            setImmediate(loop);
        };
        loop();
    }

    setTimeout(funcion, ms) {
        this.tareas.push({
            ejecucion: Date.now() + ms,
            funcion
        });
        // Retorna un identificador único para la tarea
        return this.tareas.length - 1;
    }

    clearTimeout(id) {
        if (this.tareas[id]) {
            this.tareas.splice(id, 1);
        }
    }

    setInterval(funcion, ms) {
        const intervalo = () => {
            funcion();
            this.setTimeout(intervalo, ms);
        };
        return this.setTimeout(intervalo, ms);
    }
}

// Clase Nodo: Elemento de la cola
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

// Clase Cola: Implementa una cola FIFO sin usar arrays
class Cola {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.tamaño = 0;
    }

    encolar(valor) {
        const nuevoNodo = new Nodo(valor);
        if (this.cola) {
            this.cola.siguiente = nuevoNodo;
        } else {
            this.cabeza = nuevoNodo;
        }
        this.cola = nuevoNodo;
        this.tamaño++;
    }

    desencolar() {
        if (!this.cabeza) return null;
        const valor = this.cabeza.valor;
        this.cabeza = this.cabeza.siguiente;
        if (!this.cabeza) {
            this.cola = null;
        }
        this.tamaño--;
        return valor;
    }

    esVacia() {
        return this.tamaño === 0;
    }
}

// Clase ServidorWeb: Maneja las solicitudes utilizando callbacks
class ServidorWeb {
    constructor() {
        this.temporizador = new Temporizador();
        this.cola = new Cola();
        this.maxSimultaneas = 5;
        this.actuales = 0;
        this.idSolicitud = 1;
        this.inactividad = null;
        this.iniciarRecepcion();
    }

    iniciarRecepcion() {
        // Programar la llegada de nuevas solicitudes cada 2 segundos
        this.temporizador.setInterval(() => {
            this.recibirSolicitud((error, solicitud) => {
                if (error) {
                    console.error('Error al recibir solicitud:', error);
                    return;
                }
                this.agregarASolicitudes(solicitud);
            });
        }, 2000);

        // Iniciar el temporizador de inactividad
        this.resetInactividad();
    }

    resetInactividad() {
        if (this.inactividad !== null) {
            this.temporizador.clearTimeout(this.inactividad);
        }
        this.inactividad = this.temporizador.setTimeout(() => {
            this.detenerServidor();
        }, 10000);
    }

    detenerServidor() {
        console.log('El servidor se ha detenido por inactividad.');
        process.exit(0);
    }

    recibirSolicitud(callback) {
        // Simular la creación de una nueva solicitud
        const solicitud = {
            id: this.idSolicitud++,
            tiempoProcesamiento: Math.floor(Math.random() * 5) + 1 // 1 a 5 segundos
        };
        console.log(`Solicitud ${solicitud.id} recibida.`);
        callback(null, solicitud);
        this.resetInactividad();
    }

    agregarASolicitudes(solicitud) {
        if (this.actuales < this.maxSimultaneas) {
            this.procesarSolicitud(solicitud, (error, resultado) => {
                if (error) {
                    console.log(`Solicitud ${solicitud.id} falló en ${solicitud.tiempoProcesamiento} segundos.`);
                } else {
                    console.log(`Solicitud ${solicitud.id} procesada correctamente en ${solicitud.tiempoProcesamiento} segundos.`);
                }
                this.actuales--;
                this.verificarCola();
            });
            this.actuales++;
        } else {
            this.cola.encolar(solicitud);
            console.log(`Solicitud ${solicitud.id} en cola.`);
        }
    }

    procesarSolicitud(solicitud, callback) {
        // Simular el procesamiento asincrónico con un temporizador
        this.temporizador.setTimeout(() => {
            // Simular un 20% de fallos
            if (Math.random() < 0.2) {
                callback(new Error('Error en el procesamiento'), null);
            } else {
                callback(null, {
                    id: solicitud.id,
                    tiempo: solicitud.tiempoProcesamiento
                });
            }
        }, solicitud.tiempoProcesamiento * 1000);
    }

    verificarCola() {
        if (!this.cola.esVacia() && this.actuales < this.maxSimultaneas) {
            const siguienteSolicitud = this.cola.desencolar();
            this.agregarASolicitudes(siguienteSolicitud);
            console.log(`Solicitud ${siguienteSolicitud.id} retirada de la cola y en proceso.`);
        }
    }
}

// Iniciar el servidor
new ServidorWeb();

// Fase 2: Refactorización con promesas
// servidor_promesas.js

// Clase Temporizador: Simula setTimeout y setInterval
class Temporizador {
    constructor() {
        this.tareas = [];
        this.iniciar();
    }

    iniciar() {
        const loop = () => {
            const ahora = Date.now();
            this.tareas.forEach((tarea, index) => {
                if (ahora >= tarea.ejecucion) {
                    tarea.funcion();
                    this.tareas.splice(index, 1);
                }
            });
            // Ejecuta el loop en el próximo ciclo de eventos
            setImmediate(loop);
        };
        loop();
    }

    setTimeout(funcion, ms) {
        this.tareas.push({
            ejecucion: Date.now() + ms,
            funcion
        });
        // Retorna un identificador único para la tarea
        return this.tareas.length - 1;
    }

    clearTimeout(id) {
        if (this.tareas[id]) {
            this.tareas.splice(id, 1);
        }
    }

    setInterval(funcion, ms) {
        const intervalo = () => {
            funcion();
            this.setTimeout(intervalo, ms);
        };
        return this.setTimeout(intervalo, ms);
    }
}

// Clase Nodo: Elemento de la cola
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

// Clase Cola: Implementa una cola FIFO sin usar arrays
class Cola {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.tamaño = 0;
    }

    encolar(valor) {
        const nuevoNodo = new Nodo(valor);
        if (this.cola) {
            this.cola.siguiente = nuevoNodo;
        } else {
            this.cabeza = nuevoNodo;
        }
        this.cola = nuevoNodo;
        this.tamaño++;
    }

    desencolar() {
        if (!this.cabeza) return null;
        const valor = this.cabeza.valor;
        this.cabeza = this.cabeza.siguiente;
        if (!this.cabeza) {
            this.cola = null;
        }
        this.tamaño--;
        return valor;
    }

    esVacia() {
        return this.tamaño === 0;
    }
}

// Clase ServidorWebPromesas: Maneja las solicitudes utilizando promesas
class ServidorWebPromesas {
    constructor() {
        this.temporizador = new Temporizador();
        this.cola = new Cola();
        this.maxSimultaneas = 5;
        this.actuales = 0;
        this.idSolicitud = 1;
        this.inactividad = null;
        this.iniciarRecepcion();
    }

    iniciarRecepcion() {
        // Programar la llegada de nuevas solicitudes cada 2 segundos
        this.temporizador.setInterval(() => {
            this.recibirSolicitud()
                .then(solicitud => this.agregarASolicitudes(solicitud))
                .catch(error => console.error('Error al recibir solicitud:', error));
        }, 2000);

        // Iniciar el temporizador de inactividad
        this.resetInactividad();
    }

    resetInactividad() {
        if (this.inactividad !== null) {
            this.temporizador.clearTimeout(this.inactividad);
        }
        this.inactividad = this.temporizador.setTimeout(() => {
            this.detenerServidor();
        }, 10000);
    }

    detenerServidor() {
        console.log('El servidor se ha detenido por inactividad.');
        process.exit(0);
    }

    recibirSolicitud() {
        return new Promise((resolve, reject) => {
            // Simular la creación de una nueva solicitud
            const solicitud = {
                id: this.idSolicitud++,
                tiempoProcesamiento: Math.floor(Math.random() * 5) + 1 // 1 a 5 segundos
            };
            console.log(`Solicitud ${solicitud.id} recibida.`);
            resolve(solicitud);
            this.resetInactividad();
        });
    }

    agregarASolicitudes(solicitud) {
        if (this.actuales < this.maxSimultaneas) {
            this.procesarSolicitud(solicitud)
                .then(resultado => {
                    console.log(`Solicitud ${solicitud.id} procesada correctamente en ${resultado.tiempo} segundos.`);
                })
                .catch(error => {
                    console.log(`Solicitud ${solicitud.id} falló en ${solicitud.tiempoProcesamiento} segundos.`);
                })
                .finally(() => {
                    this.actuales--;
                    this.verificarCola();
                });
            this.actuales++;
        } else {
            this.cola.encolar(solicitud);
            console.log(`Solicitud ${solicitud.id} en cola.`);
        }
    }

    procesarSolicitud(solicitud) {
        return new Promise((resolve, reject) => {
            this.temporizador.setTimeout(() => {
                // Simular un 20% de fallos
                if (Math.random() < 0.2) {
                    reject(new Error('Error en el procesamiento'));
                } else {
                    resolve({
                        id: solicitud.id,
                        tiempo: solicitud.tiempoProcesamiento
                    });
                }
            }, solicitud.tiempoProcesamiento * 1000);
        });
    }

    verificarCola() {
        if (!this.cola.esVacia() && this.actuales < this.maxSimultaneas) {
            const siguienteSolicitud = this.cola.desencolar();
            this.agregarASolicitudes(siguienteSolicitud);
            console.log(`Solicitud ${siguienteSolicitud.id} retirada de la cola y en proceso.`);
        }
    }
}

// Iniciar el servidor con promesas
new ServidorWebPromesas();

// Fase 3: Refactorización con Async/Await

// servidor_async_await.js

// Clase Temporizador: Simula setTimeout y setInterval
class Temporizador {
    constructor() {
        this.tareas = [];
        this.iniciar();
    }

    iniciar() {
        const loop = () => {
            const ahora = Date.now();
            this.tareas.forEach((tarea, index) => {
                if (ahora >= tarea.ejecucion) {
                    tarea.funcion();
                    this.tareas.splice(index, 1);
                }
            });
            // Ejecuta el loop en el próximo ciclo de eventos
            setImmediate(loop);
        };
        loop();
    }

    setTimeout(funcion, ms) {
        this.tareas.push({
            ejecucion: Date.now() + ms,
            funcion
        });
        // Retorna un identificador único para la tarea
        return this.tareas.length - 1;
    }

    clearTimeout(id) {
        if (this.tareas[id]) {
            this.tareas.splice(id, 1);
        }
    }

    setInterval(funcion, ms) {
        const intervalo = () => {
            funcion();
            this.setTimeout(intervalo, ms);
        };
        return this.setTimeout(intervalo, ms);
    }
}

// Clase Nodo: Elemento de la cola
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

// Clase Cola: Implementa una cola FIFO sin usar arrays
class Cola {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.tamaño = 0;
    }

    encolar(valor) {
        const nuevoNodo = new Nodo(valor);
        if (this.cola) {
            this.cola.siguiente = nuevoNodo;
        } else {
            this.cabeza = nuevoNodo;
        }
        this.cola = nuevoNodo;
        this.tamaño++;
    }

    desencolar() {
        if (!this.cabeza) return null;
        const valor = this.cabeza.valor;
        this.cabeza = this.cabeza.siguiente;
        if (!this.cabeza) {
            this.cola = null;
        }
        this.tamaño--;
        return valor;
    }

    esVacia() {
        return this.tamaño === 0;
    }
}

// Clase ServidorWebAsyncAwait: Maneja las solicitudes utilizando async/await
class ServidorWebAsyncAwait {
    constructor() {
        this.temporizador = new Temporizador();
        this.cola = new Cola();
        this.maxSimultaneas = 5;
        this.actuales = 0;
        this.idSolicitud = 1;
        this.inactividad = null;
        this.iniciarRecepcion();
    }

    iniciarRecepcion() {
        // Programar la llegada de nuevas solicitudes cada 2 segundos
        this.temporizador.setInterval(async () => {
            try {
                const solicitud = await this.recibirSolicitud();
                this.agregarASolicitudes(solicitud);
            } catch (error) {
                console.error('Error al recibir solicitud:', error);
            }
        }, 2000);

        // Iniciar el temporizador de inactividad
        this.resetInactividad();
    }

    resetInactividad() {
        if (this.inactividad !== null) {
            this.temporizador.clearTimeout(this.inactividad);
        }
        this.inactividad = this.temporizador.setTimeout(() => {
            this.detenerServidor();
        }, 10000);
    }

    detenerServidor() {
        console.log('El servidor se ha detenido por inactividad.');
        process.exit(0);
    }

    recibirSolicitud() {
        return new Promise((resolve, reject) => {
            // Simular la creación de una nueva solicitud
            const solicitud = {
                id: this.idSolicitud++,
                tiempoProcesamiento: Math.floor(Math.random() * 5) + 1 // 1 a 5 segundos
            };
            console.log(`Solicitud ${solicitud.id} recibida.`);
            resolve(solicitud);
            this.resetInactividad();
        });
    }

    agregarASolicitudes(solicitud) {
        if (this.actuales < this.maxSimultaneas) {
            this.procesarSolicitud(solicitud)
                .then(resultado => {
                    console.log(`Solicitud ${solicitud.id} procesada correctamente en ${resultado.tiempo} segundos.`);
                })
                .catch(error => {
                    console.log(`Solicitud ${solicitud.id} falló en ${solicitud.tiempoProcesamiento} segundos.`);
                })
                .finally(() => {
                    this.actuales--;
                    this.verificarCola();
                });
            this.actuales++;
        } else {
            this.cola.encolar(solicitud);
            console.log(`Solicitud ${solicitud.id} en cola.`);
        }
    }

    async procesarSolicitud(solicitud) {
        return new Promise((resolve, reject) => {
            this.temporizador.setTimeout(() => {
                // Simular un 20% de fallos
                if (Math.random() < 0.2) {
                    reject(new Error('Error en el procesamiento'));
                } else {
                    resolve({
                        id: solicitud.id,
                        tiempo: solicitud.tiempoProcesamiento
                    });
                }
            }, solicitud.tiempoProcesamiento * 1000);
        });
    }

    verificarCola() {
        if (!this.cola.esVacia() && this.actuales < this.maxSimultaneas) {
            const siguienteSolicitud = this.cola.desencolar();
            this.agregarASolicitudes(siguienteSolicitud);
            console.log(`Solicitud ${siguienteSolicitud.id} retirada de la cola y en proceso.`);
        }
    }
}

// Iniciar el servidor con async/await
new ServidorWebAsyncAwait();

//Ejercicio: Sistema de permisos basado en herencia y prototipos
// permisos.ts

// Clase Base UsuarioBase
class UsuarioBase {
    nombre: string;
    correo: string;

    constructor(nombre: string, correo: string) {
        this.nombre = nombre;
        this.correo = correo;
    }

    verPermisos(): string[] {
        return ['leerContenido'];
    }
}

// Clase Admin que extiende de UsuarioBase
class Admin extends UsuarioBase {
    constructor(nombre: string, correo: string) {
        super(nombre, correo);
    }

    verPermisos(): string[] {
        return [...super.verPermisos(), 'gestionarUsuarios'];
    }
}

// Clase SuperAdmin que extiende de Admin
class SuperAdmin extends Admin {
    constructor(nombre: string, correo: string) {
        super(nombre, correo);
    }

    verPermisos(): string[] {
        return [...super.verPermisos(), 'gestionarSistema'];
    }
}

// Clase Genérica GestorDePermisos
class GestorDePermisos<T extends UsuarioBase> {
    asignarPermisos(usuario: T): void {
        const permisos = usuario.verPermisos();
        console.log(`Permisos para ${usuario.nombre}: ${permisos.join(', ')}`);
    }

    agregarPermiso(usuario: T, permiso: string): void {
        // Aquí se simula la asignación de un permiso adicional
        console.log(`Agregado permiso '${permiso}' a ${usuario.nombre}.`);
    }
}

// Añadir métodos adicionales a Admin mediante prototipos
(Admin.prototype as any).actualizarConfiguraciones = function (): void {
    console.log(`Configuraciones actualizadas por ${this.nombre}.`);
};

// Ejemplo de Uso
// Crear instancias de usuarios
const usuario = new UsuarioBase('Juan Pérez', 'juan@example.com');
const admin = new Admin('María López', 'maria@example.com');
const superAdmin = new SuperAdmin('Carlos García', 'carlos@example.com');

// Crear una instancia del gestor de permisos
const gestor = new GestorDePermisos<UsuarioBase>();

// Asignar permisos
gestor.asignarPermisos(usuario);      // Permisos para Juan Pérez: leerContenido
gestor.asignarPermisos(admin);        // Permisos para María López: leerContenido, gestionarUsuarios
gestor.asignarPermisos(superAdmin);   // Permisos para Carlos García: leerContenido, gestionarUsuarios, gestionarSistema

// Agregar un permiso adicional a un admin
gestor.agregarPermiso(admin, 'crearReportes'); // Agregado permiso 'crearReportes' a María López.

// Usar el método añadido mediante prototipos
(admin as Admin & { actualizarConfiguraciones: () => void }).actualizarConfiguraciones(); // Configuraciones actualizadas por María López.

// Ejercicio: Sistema de registro y validación con tipos refinados y callbacks 

// interfaces.ts

// Resultado de un registro exitoso
export interface RegistroExitoso {
    status: "success";
    message: string;
}

// Resultado de un error de validación
export interface ErrorDeValidacion {
    status: "error";
    message: string;
    detalles: string[];
}

// Datos de entrada del usuario
export interface DatosUsuario {
    nombre: string;
    correo: string;
    telefono: string;
    edad: number;
}

// Tipos refinados utilizando "branding" (opción más facil)
export type NombreValido = string & { __brand: "NombreValido" };
export type CorreoValido = string & { __brand: "CorreoValido" };
export type TelefonoValido = string & { __brand: "TelefonoValido" };
export type EdadValida = number & { __brand: "EdadValida" };

// validacion.ts

import { ErrorDeValidacion } from "./interfaces";

// Interfaz genérica para validaciones
export interface Validacion<T> {
    validar: (dato: any, callback: (error: ErrorDeValidacion | null, resultado?: T) => void) => void;
}
// ValidacionNombre.ts

import { Validacion } from "./validacion";
import { NombreValido, ErrorDeValidacion } from "./interfaces";

export class ValidacionNombre implements Validacion<NombreValido> {
    validar(dato: any, callback: (error: ErrorDeValidacion | null, resultado?: NombreValido) => void): void {
        const errores: string[] = [];

        if (typeof dato !== "string") {
            errores.push("El nombre debe ser una cadena de texto.");
        } else {
            const nombreTrim = dato.trim();
            if (nombreTrim.length < 3) {
                errores.push("El nombre debe tener al menos 3 caracteres.");
            }

            // Validación manual: solo letras y espacios
            for (let i = 0; i < nombreTrim.length; i++) {
                const char = nombreTrim.charAt(i);
                const code = char.charCodeAt(0);
                const isUpperCase = code >= 65 && code <= 90;
                const isLowerCase = code >= 97 && code <= 122;
                const isSpace = char === ' ';

                if (!(isUpperCase || isLowerCase || isSpace)) {
                    errores.push("El nombre solo puede contener letras y espacios.");
                    break;
                }
            }
        }

        if (errores.length > 0) {
            const error: ErrorDeValidacion = {
                status: "error",
                message: "Validación de nombre fallida.",
                detalles: errores,
            };
            callback(error);
        } else {
            const nombreValido: NombreValido = dato as NombreValido;
            callback(null, nombreValido);
        }
    }
}
// ValidacionCorreo.ts

import { Validacion } from "./validacion";
import { CorreoValido, ErrorDeValidacion } from "./interfaces";

export class ValidacionCorreo implements Validacion<CorreoValido> {
    validar(dato: any, callback: (error: ErrorDeValidacion | null, resultado?: CorreoValido) => void): void {
        const errores: string[] = [];

        if (typeof dato !== "string") {
            errores.push("El correo electrónico debe ser una cadena de texto.");
        } else {
            const partes = dato.split("@");
            if (partes.length !== 2) {
                errores.push("El correo electrónico debe contener una sola '@'.");
            } else {
                const [local, dominio] = partes;
                if (local.length === 0) {
                    errores.push("La parte local del correo no puede estar vacía.");
                }
                if (dominio.length === 0) {
                    errores.push("El dominio del correo no puede estar vacío.");
                }

                const dominioPartes = dominio.split(".");
                if (dominioPartes.length < 2) {
                    errores.push("El dominio debe contener al menos un punto.");
                } else {
                    for (let parte of dominioPartes) {
                        if (parte.length === 0) {
                            errores.push("Las partes del dominio no pueden estar vacías.");
                            break;
                        }
                    }
                }
            }
        }

        if (errores.length > 0) {
            const error: ErrorDeValidacion = {
                status: "error",
                message: "Validación de correo electrónico fallida.",
                detalles: errores,
            };
            callback(error);
        } else {
            const correoValido: CorreoValido = dato as CorreoValido;
            callback(null, correoValido);
        }
    }
}
// ValidacionTelefono.ts

import { Validacion } from "./validacion";
import { TelefonoValido, ErrorDeValidacion } from "./interfaces";

export class ValidacionTelefono implements Validacion<TelefonoValido> {
    validar(dato: any, callback: (error: ErrorDeValidacion | null, resultado?: TelefonoValido) => void): void {
        const errores: string[] = [];

        if (typeof dato !== "string") {
            errores.push("El número de teléfono debe ser una cadena de texto.");
        } else {
            const telefonoTrim = dato.trim();
            if (telefonoTrim.length < 7 || telefonoTrim.length > 15) {
                errores.push("El número de teléfono debe tener entre 7 y 15 caracteres.");
            }

            // Validación manual: solo dígitos, '+', '-', y espacios
            for (let i = 0; i < telefonoTrim.length; i++) {
                const char = telefonoTrim.charAt(i);
                const code = char.charCodeAt(0);
                const isDigit = code >= 48 && code <= 57; // '0' - '9'
                const isPlus = char === '+';
                const isMinus = char === '-';
                const isSpace = char === ' ';

                if (!(isDigit || isPlus || isMinus || isSpace)) {
                    errores.push("El número de teléfono contiene caracteres inválidos.");
                    break;
                }
            }
        }

        if (errores.length > 0) {
            const error: ErrorDeValidacion = {
                status: "error",
                message: "Validación de número de teléfono fallida.",
                detalles: errores,
            };
            callback(error);
        } else {
            const telefonoValido: TelefonoValido = dato as TelefonoValido;
            callback(null, telefonoValido);
        }
    }
}

// ValidacionEdad.ts

import { Validacion } from "./validacion";
import { EdadValida, ErrorDeValidacion } from "./interfaces";

export class ValidacionEdad implements Validacion<EdadValida> {
    validar(dato: any, callback: (error: ErrorDeValidacion | null, resultado?: EdadValida) => void): void {
        const errores: string[] = [];

        if (typeof dato !== "number") {
            errores.push("La edad debe ser un número.");
        } else {
            if (!Number.isInteger(dato)) {
                errores.push("La edad debe ser un número entero.");
            }
            if (dato < 18 || dato > 100) {
                errores.push("La edad debe estar entre 18 y 100 años.");
            }
        }

        if (errores.length > 0) {
            const error: ErrorDeValidacion = {
                status: "error",
                message: "Validación de edad fallida.",
                detalles: errores,
            };
            callback(error);
        } else {
            const edadValida: EdadValida = dato as EdadValida;
            callback(null, edadValida);
        }
    }
}
// SistemaRegistro.ts

import { DatosUsuario, RegistroExitoso, ErrorDeValidacion } from "./interfaces";
import { Validacion } from "./validacion";
import { ValidacionNombre } from "./ValidacionNombre";
import { ValidacionCorreo } from "./ValidacionCorreo";
import { ValidacionTelefono } from "./ValidacionTelefono";
import { ValidacionEdad } from "./ValidacionEdad";

export class SistemaRegistro {
    private validaciones: Validacion<any>[];
    private callbacksExitosos: Array<(registro: RegistroExitoso) => void>;
    private callbacksErrores: Array<(error: ErrorDeValidacion) => void>;

    constructor() {
        // Composición de validaciones
        this.validaciones = [
            new ValidacionNombre(),
            new ValidacionCorreo(),
            new ValidacionTelefono(),
            new ValidacionEdad(),
        ];

        // Inicialización de callbacks
        this.callbacksExitosos = [];
        this.callbacksErrores = [];
    }

    // Métodos para suscribirse a eventos de éxito y error
    onSuccess(callback: (registro: RegistroExitoso) => void): void {
        this.callbacksExitosos.push(callback);
    }

    onError(callback: (error: ErrorDeValidacion) => void): void {
        this.callbacksErrores.push(callback);
    }

    // Método para registrar un usuario
    registrarUsuario(datos: DatosUsuario): void {
        const errores: string[] = [];
        const resultados: { [key: string]: any } = {};

        // Función para manejar el resultado de cada validación
        const manejarValidacion = (
            error: ErrorDeValidacion | null,
            resultado?: any,
            campo?: string
        ) => {
            if (error) {
                errores.push(...error.detalles.map(detalle => `${campo}: ${detalle}`));
            } else {
                // Almacenar el resultado validado
                resultados[campo as string] = resultado;
            }
        };

        // Funciones nombradas para cada validación
        function validarNombre(
            nombre: any,
            callback: (error: ErrorDeValidacion | null, resultado?: any) => void
        ): void {
            const validacion = this.validaciones[0] as Validacion<any>;
            validacion.validar(nombre, (error, resultado) => {
                manejarValidacion(error, resultado, "Nombre");
                validarCorreo(datos.correo, callback);
            });
        }

        function validarCorreo(
            correo: any,
            callback: (error: ErrorDeValidacion | null, resultado?: any) => void
        ): void {
            const validacion = this.validaciones[1] as Validacion<any>;
            validacion.validar(correo, (error, resultado) => {
                manejarValidacion(error, resultado, "Correo Electrónico");
                validarTelefono(datos.telefono, callback);
            });
        }

        function validarTelefono(
            telefono: any,
            callback: (error: ErrorDeValidacion | null, resultado?: any) => void
        ): void {
            const validacion = this.validaciones[2] as Validacion<any>;
            validacion.validar(telefono, (error, resultado) => {
                manejarValidacion(error, resultado, "Número de Teléfono");
                validarEdad(datos.edad, callback);
            });
        }

        function validarEdad(
            edad: any,
            callback: (error: ErrorDeValidacion | null, resultado?: any) => void
        ): void {
            const validacion = this.validaciones[3] as Validacion<any>;
            validacion.validar(edad, (error, resultado) => {
                manejarValidacion(error, resultado, "Edad");
                // Después de todas las validaciones
                if (errores.length > 0) {
                    const errorValidacion: ErrorDeValidacion = {
                        status: "error",
                        message: "Validación de registro fallida.",
                        detalles: errores,
                    };
                    // Ejecutar todos los callbacks de error
                    this.callbacksErrores.forEach(cb => cb(errorValidacion));
                } else {
                    const registro: RegistroExitoso = {
                        status: "success",
                        message: "Registro completado exitosamente.",
                    };
                    // Ejecutar todos los callbacks de éxito
                    this.callbacksExitosos.forEach(cb => cb(registro));
                }
            });
        }

        // Iniciar las validaciones de manera asíncrona
        validarNombre.call(this, datos.nombre, () => { /* Finalización */ });
    }
}
//Ejemplo de uso (este codigo es completo)
// index.ts

import { SistemaRegistro } from "./SistemaRegistro";
import { DatosUsuario } from "./interfaces";

// Crear una instancia del sistema de registro
const sistemaRegistro = new SistemaRegistro();

// Definir callbacks nombrados para manejar éxito y errores
function manejarExito(registro: RegistroExitoso): void {
    console.log(registro.message);
}

function manejarError(error: ErrorDeValidacion): void {
    console.error(error.message);
    error.detalles.forEach(detalle => console.error(`- ${detalle}`));
}

// Suscribirse a los eventos de éxito y error
sistemaRegistro.onSuccess(manejarExito);
sistemaRegistro.onError(manejarError);

// Datos de ejemplo para registrar usuarios
const usuarioValido: DatosUsuario = {
    nombre: "Juan Pérez",
    correo: "juan.perez@example.com",
    telefono: "+1234567890",
    edad: 30,
};

const usuarioInvalido: DatosUsuario = {
    nombre: "J",
    correo: "juan.perez@com",
    telefono: "123-abc-7890",
    edad: 17,
};

// Registrar usuarios
console.log("Registrando usuario válido:");
sistemaRegistro.registrarUsuario(usuarioValido);

console.log("\nRegistrando usuario inválido:");
sistemaRegistro.registrarUsuario(usuarioInvalido);

// Version de la evaluación - parte 2
// Ejercicio 1: Gestión de proyectos y equipos con Generics, Async/Await, y Utility Types
// tipos.ts

// Union Types para los roles de los miembros del equipo
export type Rol = "desarrollador" | "diseñador" | "gerente";

// Interface para miembros del equipo
export interface MiembroEquipo {
    id: number;
    nombre: string;
    rol: Rol;
}

// Interface para tareas
export interface Tarea {
    id: number;
    descripcion: string;
    estado: "pendiente" | "completada";
}

// Tipo Intersect para propiedades comunes a todos los proyectos
export type PropiedadesComunes = {
    nombre: string;
    fechaInicio: Date;
};

// Interfaces específicas para cada tipo de proyecto
export interface ProyectoDesarrolloWeb extends PropiedadesComunes {
    framework: string;
}

export interface ProyectoDisenoGrafico extends PropiedadesComunes {
    herramientas: string[];
}

export interface ProyectoMarketing extends PropiedadesComunes {
    plataforma: string;
}

// Union Type para tipos de proyectos
export type TipoProyecto = ProyectoDesarrolloWeb | ProyectoDisenoGrafico | ProyectoMarketing;

// Proyecto.ts

import { TipoProyecto, MiembroEquipo, Tarea } from "./tipos";

export class Proyecto<T extends TipoProyecto> {
    private static contadorId = 1;
    private readonly id: number;
    private nombre: string;
    private fechaInicio: Date;
    private propiedadesEspecificas: T;
    private miembrosEquipo: MiembroEquipo[];
    private tareas: Tarea[];

    constructor(
        nombre: string,
        fechaInicio: Date,
        propiedadesEspecificas: T
    ) {
        this.id = Proyecto.contadorId++;
        this.nombre = nombre;
        this.fechaInicio = fechaInicio;
        this.propiedadesEspecificas = propiedadesEspecificas;
        this.miembrosEquipo = [];
        this.tareas = [];
    }

    // Método para obtener el ID (solo lectura)
    getId(): number {
        return this.id;
    }

    // Método para obtener el nombre
    getNombre(): string {
        return this.nombre;
    }

    // Método para asignar un miembro al equipo
    asignarMiembro(miembro: MiembroEquipo): void {
        this.miembrosEquipo.push(miembro);
        console.log(`Miembro ${miembro.nombre} (${miembro.rol}) asignado al proyecto '${this.nombre}'.`);
    }

    // Método para agregar una tarea
    agregarTarea(tarea: Omit<Tarea, "id" | "estado">): void {
        const nuevaTarea: Tarea = {
            id: this.tareas.length + 1,
            descripcion: tarea.descripcion,
            estado: "pendiente",
        };
        this.tareas.push(nuevaTarea);
        console.log(`Tarea '${nuevaTarea.descripcion}' agregada al proyecto '${this.nombre}'.`);
    }

    // Método para asignar una tarea a un miembro de manera asíncrona
    async asignarTareaAsync(tareaId: number, miembroId: number): Promise<void> {
        const tarea = this.tareas.find(t => t.id === tareaId);
        const miembro = this.miembrosEquipo.find(m => m.id === miembroId);

        if (!tarea) {
            console.error(`Tarea con ID ${tareaId} no encontrada.`);
            return;
        }

        if (!miembro) {
            console.error(`Miembro con ID ${miembroId} no encontrado.`);
            return;
        }

        // Simular retraso de 2 segundos
        await this.simularRetraso(2000);

        tarea.estado = "completada";
        console.log(`Tarea '${tarea.descripcion}' asignada a ${miembro.nombre} y marcada como completada.`);
    }

    // Método para simular un retraso
    private simularRetraso(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Método para mostrar el estado final de las tareas
    mostrarEstadoTareas(): void {
        console.log(`\nEstado final de las tareas del proyecto '${this.nombre}':`);
        this.tareas.forEach(tarea => {
            console.log(`- Tarea ${tarea.id} (${tarea.descripcion}): ${tarea.estado}`);
        });
    }
}
// GestionProyectos.ts

import { Proyecto } from "./Proyecto";
import { TipoProyecto, MiembroEquipo, Tarea, ProyectoDesarrolloWeb, ProyectoDisenoGrafico, ProyectoMarketing } from "./tipos";

export class GestionProyectos {
    private proyectos: Proyecto<TipoProyecto>[];
    private miembrosGlobales: MiembroEquipo[];

    constructor() {
        this.proyectos = [];
        this.miembrosGlobales = [];
    }

    // Método para crear un proyecto
    crearProyecto<T extends TipoProyecto>(
        tipo: "desarrollo web" | "diseño grafico" | "marketing",
        nombre: string,
        fechaInicio: Date,
        propiedadesEspecificas: T
    ): Proyecto<T> | null {
        let proyecto: Proyecto<T> | null = null;

        switch (tipo.toLowerCase()) {
            case "desarrollo web":
                proyecto = new Proyecto<T>(nombre, fechaInicio, propiedadesEspecificas);
                break;
            case "diseño grafico":
                proyecto = new Proyecto<T>(nombre, fechaInicio, propiedadesEspecificas);
                break;
            case "marketing":
                proyecto = new Proyecto<T>(nombre, fechaInicio, propiedadesEspecificas);
                break;
            default:
                console.error(`Tipo de proyecto '${tipo}' no reconocido.`);
                return null;
        }

        this.proyectos.push(proyecto);
        console.log(`Proyecto creado: { id: ${proyecto.getId()}, nombre: '${proyecto.getNombre()}', ...propiedadesEspecificas }`);
        return proyecto;
    }

    // Método para agregar un miembro al equipo global
    agregarMiembro(miembro: MiembroEquipo): void {
        this.miembrosGlobales.push(miembro);
        console.log(`Miembro global agregado: ${miembro.nombre} (${miembro.rol}).`);
    }

    // Método para asignar un miembro a un proyecto
    asignarMiembroAProyecto(proyectoId: number, miembroId: number): void {
        const proyecto = this.proyectos.find(p => p.getId() === proyectoId);
        const miembro = this.miembrosGlobales.find(m => m.id === miembroId);

        if (!proyecto) {
            console.error(`Proyecto con ID ${proyectoId} no encontrado.`);
            return;
        }

        if (!miembro) {
            console.error(`Miembro con ID ${miembroId} no encontrado.`);
            return;
        }

        proyecto.asignarMiembro(miembro);
    }

    // Método para asignar tareas de manera asíncrona
    async asignarTareas(proyectoId: number, asignaciones: { tareaId: number; miembroId: number }[]): Promise<void> {
        const proyecto = this.proyectos.find(p => p.getId() === proyectoId);

        if (!proyecto) {
            console.error(`Proyecto con ID ${proyectoId} no encontrado.`);
            return;
        }

        console.log("\nAsignación de tareas en proceso...");

        const promesas = asignaciones.map(asignacion => proyecto.asignarTareaAsync(asignacion.tareaId, asignacion.miembroId));

        await Promise.all(promesas);

        console.log("\nTodas las tareas han sido asignadas y completadas.");
    }

    // Método para mostrar el estado final de las tareas de un proyecto
    mostrarEstadoFinal(proyectoId: number): void {
        const proyecto = this.proyectos.find(p => p.getId() === proyectoId);

        if (!proyecto) {
            console.error(`Proyecto con ID ${proyectoId} no encontrado.`);
            return;
        }

        proyecto.mostrarEstadoTareas();
    }
}
//Ejemplo de uso
// index.ts

import { GestionProyectos } from "./GestionProyectos";
import { TipoProyecto, MiembroEquipo } from "./tipos";
import { ProyectoDesarrolloWeb } from "./tipos";

// Crear una instancia de la gestión de proyectos
const gestionProyectos = new GestionProyectos();

// Crear un proyecto de Desarrollo Web
const proyectoDesarrolloWeb = gestionProyectos.crearProyecto<ProyectoDesarrolloWeb>(
    "desarrollo web",
    "Sitio Web XYZ",
    new Date("2024-10-01"),
    { nombre: "Sitio Web XYZ", fechaInicio: new Date("2024-10-01"), framework: "React" }
);

// Crear un equipo con 3 miembros
const miembro1: MiembroEquipo = { id: 1, nombre: "Ana", rol: "desarrollador" };
const miembro2: MiembroEquipo = { id: 2, nombre: "Luis", rol: "diseñador" };
const miembro3: MiembroEquipo = { id: 3, nombre: "Pedro", rol: "gerente" };

gestionProyectos.agregarMiembro(miembro1);
gestionProyectos.agregarMiembro(miembro2);
gestionProyectos.agregarMiembro(miembro3);

// Asignar miembros al proyecto
if (proyectoDesarrolloWeb) {
    gestionProyectos.asignarMiembroAProyecto(proyectoDesarrolloWeb.getId(), 1); // Ana
    gestionProyectos.asignarMiembroAProyecto(proyectoDesarrolloWeb.getId(), 2); // Luis
    gestionProyectos.asignarMiembroAProyecto(proyectoDesarrolloWeb.getId(), 3); // Pedro

    // Agregar tareas al proyecto
    proyectoDesarrolloWeb.agregarTarea({ descripcion: "Desarrollar componente de login" });
    proyectoDesarrolloWeb.agregarTarea({ descripcion: "Diseñar interfaz del panel de administración" });

    // Asignar tareas de manera asíncrona
    gestionProyectos.asignarTareas(proyectoDesarrolloWeb.getId(), [
        { tareaId: 1, miembroId: 1 }, // Ana
        { tareaId: 2, miembroId: 2 }, // Luis
    }).then(() => {
        // Mostrar el estado final de las tareas
        gestionProyectos.mostrarEstadoFinal(proyectoDesarrolloWeb.getId());
    });
}

// Ejercicio :Generador de informes académicos utilizando generics, utility types y funciones asíncronas
// Definición de Calificación
interface Calificacion {
    materia: string;
    calificacion: number;
}

// Definición de Asignatura con propiedades adicionales opcionales
type Asignatura = Readonly<{
    id: string;
    nombre: string;
}> & Partial<{
    descripcion: string;
}>;

// Definición de Estudiante
interface Estudiante {
    id: string;
    nombre: string;
    asignaturas: Calificacion[];
}

// Tipos para informes
type InformeEstudiante = {
    id: string;
    nombre: string;
    promedio: number;
    situacion: 'Aprobado' | 'Reprobado';
};

type InformeGeneral = {
    totalEstudiantes: number;
    promedioGeneral: number;
    aprobados: number;
    reprobados: number;
};

// Simulación de datos
const datosEstudiantes: Estudiante[] = [
    {
        id: '123',
        nombre: 'Juan',
        asignaturas: [
            { materia: 'Matemáticas', calificacion: 90 },
            { materia: 'Historia', calificacion: 75 },
            { materia: 'Ciencias', calificacion: 85 }
        ]
    },
    {
        id: '124',
        nombre: 'María',
        asignaturas: [
            { materia: 'Matemáticas', calificacion: 60 },
            { materia: 'Historia', calificacion: 55 },
            { materia: 'Ciencias', calificacion: 65 }
        ]
    },
    {
        id: '125',
        nombre: 'Luis',
        asignaturas: [
            { materia: 'Matemáticas', calificacion: 80 },
            { materia: 'Historia', calificacion: 85 },
            { materia: 'Ciencias', calificacion: 90 }
        ]
    }
];

// Función para obtener estudiantes de manera asíncrona
const obtenerEstudiantes = async (): Promise<Estudiante[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(datosEstudiantes);
        }, 1000); // Simula un retraso de 1 segundo
    });
};

// Función para calcular el promedio de un estudiante
const calcularPromedio = (asignaturas: Calificacion[]): number => {
    const total = asignaturas.reduce((sum, asignatura) => sum + asignatura.calificacion, 0);
    return parseFloat((total / asignaturas.length).toFixed(2));
};

// Función para determinar la situación académica
const determinarSituacion = (promedio: number): 'Aprobado' | 'Reprobado' => {
    return promedio >= 60 ? 'Aprobado' : 'Reprobado';
};

// Función para generar informe individual
const generarInformeEstudiante = (estudiante: Estudiante): InformeEstudiante => {
    const promedio = calcularPromedio(estudiante.asignaturas);
    const situacion = determinarSituacion(promedio);
    return {
        id: estudiante.id,
        nombre: estudiante.nombre,
        promedio,
        situacion
    };
};

// Función para generar informe general
const generarInformeGeneral = (informes: InformeEstudiante[]): InformeGeneral => {
    const totalEstudiantes = informes.length;
    const promedioGeneral = parseFloat(
        (
            informes.reduce((sum, informe) => sum + informe.promedio, 0) / totalEstudiantes
        ).toFixed(2)
    );
    const aprobados = informes.filter(informe => informe.situacion === 'Aprobado').length;
    const reprobados = totalEstudiantes - aprobados;

    return {
        totalEstudiantes,
        promedioGeneral,
        aprobados,
        reprobados
    };
};

// Función genérica para procesar informes
const procesarInformes = async <T, U>(
    obtenerDatos: () => Promise<T[]>,
    procesar: (dato: T) => U
): Promise<U[]> => {
    try {
        const datos = await obtenerDatos();
        return datos.map(procesar);
    } catch (error) {
        console.error('Error al procesar los informes:', error);
        return [];
    }
};

// Función principal para generar todos los informes
const generarTodosLosInformes = async () => {
    try {
        // Obtener estudiantes
        const estudiantes = await obtenerEstudiantes();

        // Validar datos
        if (!Array.isArray(estudiantes)) {
            throw new Error('Los datos de estudiantes no son válidos.');
        }

        // Procesar informes individuales usando generics
        const informesEstudiante: InformeEstudiante[] = await procesarInformes<Estudiante, InformeEstudiante>(
            obtenerEstudiantes,
            generarInformeEstudiante
        );

        // Generar informe general
        const informeGeneral: InformeGeneral = generarInformeGeneral(informesEstudiante);

        // Mostrar informes
        console.log('--- Informes Individuales ---');
        informesEstudiante.forEach(informe => {
            console.log(`ID: ${informe.id}, Nombre: ${informe.nombre}, Promedio: ${informe.promedio}, Situación: ${informe.situacion}`);
        });

        console.log('\n--- Informe General ---');
        console.log(`Total de Estudiantes: ${informeGeneral.totalEstudiantes}`);
        console.log(`Promedio General: ${informeGeneral.promedioGeneral}`);
        console.log(`Aprobados: ${informeGeneral.aprobados}`);
        console.log(`Reprobados: ${informeGeneral.reprobados}`);
    } catch (error) {
        console.error('Error al generar los informes:', error);
    }
};

// Ejecutar la generación de informes
generarTodosLosInformes();

// Ejercicio : Simulador de red de computadoras con polimorfismo, herencia y tipos avanzados
// Tipos de paquetes de datos
type TipoPaquete = 'texto' | 'imagen' | 'video';

// Interface para un Paquete de Datos genérico
interface Paquete<T extends TipoPaquete = TipoPaquete> {
    tipo: T;
    tamaño: number; // en KB
}

// Interfaces específicas para cada tipo de paquete
interface PaqueteTexto extends Paquete<'texto'> {
    contenido: string;
}

interface PaqueteImagen extends Paquete<'imagen'> {
    resolución: string; // Ejemplo: "1920x1080"
}

interface PaqueteVideo extends Paquete<'video'> {
    duración: number; // en segundos
}

// Union Type para todos los tipos de paquetes
type PaqueteDatos = PaqueteTexto | PaqueteImagen | PaqueteVideo;

// Tipos de dispositivos de red
type TipoDispositivo = 'enrutador' | 'switch' | 'servidor';

// Interface para la definición de un Dispositivo de Red
interface DefinicionDispositivo {
    tipo: TipoDispositivo;
    capacidad: number; // en Mbps
}

// Interface para el estado de un dispositivo después del procesamiento
interface EstadoDispositivo {
    dispositivo: DispositivoRed;
    paquetesProcesados: PaqueteDatos[];
    capacidadRestante: number; // en Mbps
}

// Interface para el estado de la red
interface EstadoRed {
    dispositivos: EstadoDispositivo[];
}

// Clase abstracta para Dispositivo de Red
abstract class DispositivoRed {
    readonly tipo: TipoDispositivo;
    capacidad: number; // en Mbps

    constructor(tipo: TipoDispositivo, capacidad: number) {
        this.tipo = tipo;
        this.capacidad = capacidad;
    }

    // Método abstracto para procesar un paquete
    abstract procesarPaquete(paquete: PaqueteDatos): Promise<boolean>;

    // Método para verificar si el dispositivo puede procesar el paquete
    puedeProcesar(paquete: PaqueteDatos): boolean {
        // Por defecto, todos los dispositivos pueden procesar texto
        if (paquete.tipo === 'texto') return true;
        // Implementar lógica específica en las clases derivadas
        return false;
    }
}

// Clase Enrutador
class Enrutador extends DispositivoRed {
    constructor(capacidad: number) {
        super('enrutador', capacidad);
    }

    puedeProcesar(paquete: PaqueteDatos): boolean {
        // Enrutadores pueden procesar texto e imagen
        return paquete.tipo === 'texto' || paquete.tipo === 'imagen';
    }

    async procesarPaquete(paquete: PaqueteDatos): Promise<boolean> {
        if (!this.puedeProcesar(paquete)) return false;
        // Simular procesamiento asíncrono
        await this.simularProcesamiento(paquete);
        // Reducir la capacidad según el tamaño del paquete
        this.capacidad -= paquete.tamaño * 0.1; // Ejemplo de consumo
        return true;
    }

    private simularProcesamiento(paquete: PaqueteDatos): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, 500)); // 0.5 segundos
    }
}

// Clase Switch
class Switch extends DispositivoRed {
    constructor(capacidad: number) {
        super('switch', capacidad);
    }

    puedeProcesar(paquete: PaqueteDatos): boolean {
        // Switches solo pueden procesar paquetes de texto
        return paquete.tipo === 'texto';
    }

    async procesarPaquete(paquete: PaqueteDatos): Promise<boolean> {
        if (!this.puedeProcesar(paquete)) return false;
        // Simular procesamiento asíncrono
        await this.simularProcesamiento(paquete);
        // Reducir la capacidad según el tamaño del paquete
        this.capacidad -= paquete.tamaño * 0.05; // Ejemplo de consumo
        return true;
    }

    private simularProcesamiento(paquete: PaqueteDatos): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, 300)); // 0.3 segundos
    }
}

// Clase Servidor
class Servidor extends DispositivoRed {
    constructor(capacidad: number) {
        super('servidor', capacidad);
    }

    puedeProcesar(paquete: PaqueteDatos): boolean {
        // Servidores pueden procesar texto, imagen y video
        return paquete.tipo === 'texto' || paquete.tipo === 'imagen' || paquete.tipo === 'video';
    }

    async procesarPaquete(paquete: PaqueteDatos): Promise<boolean> {
        if (!this.puedeProcesar(paquete)) return false;
        // Simular procesamiento asíncrono
        await this.simularProcesamiento(paquete);
        // Reducir la capacidad según el tamaño del paquete
        this.capacidad -= paquete.tamaño * 0.2; // Ejemplo de consumo
        return true;
    }

    private simularProcesamiento(paquete: PaqueteDatos): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, 1000)); // 1 segundo
    }
}

// Simulación de datos de dispositivos
const datosDispositivos: DefinicionDispositivo[] = [
    { tipo: 'enrutador', capacidad: 1000 },
    { tipo: 'switch', capacidad: 500 },
    { tipo: 'servidor', capacidad: 2000 }
];

// Simulación de datos de paquetes
const datosPaquetes: PaqueteDatos[] = [
    { tipo: 'texto', tamaño: 500, contenido: 'Hola mundo' },
    { tipo: 'imagen', tamaño: 1200, resolución: '1920x1080' },
    { tipo: 'video', tamaño: 3000, duración: 120 },
    { tipo: 'texto', tamaño: 800, contenido: 'Otro mensaje' },
    { tipo: 'video', tamaño: 2500, duración: 60 }
];

// Función para obtener dispositivos de manera asíncrona
const obtenerDispositivos = async (): Promise<DefinicionDispositivo[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(datosDispositivos);
        }, 1000); // Simula un retraso de 1 segundo
    });
};

// Función para obtener paquetes de manera asíncrona
const obtenerPaquetes = async (): Promise<PaqueteDatos[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(datosPaquetes);
        }, 1000); // Simula un retraso de 1 segundo
    });
};

// Clase para gestionar la Red de Computadoras
class RedComputadoras {
    dispositivos: DispositivoRed[];
    paquetes: PaqueteDatos[];

    constructor(dispositivos: DispositivoRed[], paquetes: PaqueteDatos[]) {
        this.dispositivos = dispositivos;
        this.paquetes = paquetes;
    }

    // Método para procesar todos los paquetes
    async procesarPaquetes(): Promise<EstadoRed> {
        const estadoRed: EstadoRed = { dispositivos: [] };

        for (const dispositivo of this.dispositivos) {
            const estadoDispositivo: EstadoDispositivo = {
                dispositivo,
                paquetesProcesados: [],
                capacidadRestante: dispositivo.capacidad
            };
            estadoRed.dispositivos.push(estadoDispositivo);
        }

        for (const paquete of this.paquetes) {
            let procesado = false;

            for (const estadoDispositivo of estadoRed.dispositivos) {
                const dispositivo = estadoDispositivo.dispositivo;

                if (dispositivo.puedeProcesar(paquete) && dispositivo.capacidad >= paquete.tamaño * 0.2) { // Verificación de capacidad
                    const exito = await dispositivo.procesarPaquete(paquete);
                    if (exito) {
                        estadoDispositivo.paquetesProcesados.push(paquete);
                        estadoDispositivo.capacidadRestante = dispositivo.capacidad;
                        procesado = true;
                        console.log(`Paquete de tipo '${paquete.tipo}' procesado por ${dispositivo.tipo}.`);
                        break; // Paquete procesado, pasar al siguiente
                    }
                }
            }

            if (!procesado) {
                console.warn(`Paquete de tipo '${paquete.tipo}' no pudo ser procesado por ningún dispositivo.`);
            }
        }

        return estadoRed;
    }
}

// Función para generar un informe del estado final de la red
const generarInformeFinal = (estadoRed: EstadoRed): void => {
    console.log('\n--- Estado Final de la Red ---');
    estadoRed.dispositivos.forEach((estado, index) => {
        console.log(`\nDispositivo ${index + 1}:`);
        console.log(`Tipo: ${estado.dispositivo.tipo}`);
        console.log(`Capacidad Restante: ${estado.capacidadRestante.toFixed(2)} Mbps`);
        console.log('Paquetes Procesados:');
        if (estado.paquetesProcesados.length > 0) {
            estado.paquetesProcesados.forEach((paquete, idx) => {
                console.log(`  ${idx + 1}. Tipo: ${paquete.tipo}, Tamaño: ${paquete.tamaño} KB`);
            });
        } else {
            console.log('  Ninguno');
        }
    });
};

// Función principal para ejecutar el simulador
const ejecutarSimulador = async () => {
    try {
        // Obtener dispositivos y paquetes de manera asíncrona
        const [dispositivosDefinidos, paquetes] = await Promise.all([
            obtenerDispositivos(),
            obtenerPaquetes()
        ]);

        // Instanciar dispositivos según su tipo
        const dispositivos: DispositivoRed[] = dispositivosDefinidos.map((def) => {
            switch (def.tipo) {
                case 'enrutador':
                    return new Enrutador(def.capacidad);
                case 'switch':
                    return new Switch(def.capacidad);
                case 'servidor':
                    return new Servidor(def.capacidad);
                default:
                    throw new Error(`Tipo de dispositivo desconocido: ${def.tipo}`);
            }
        });

        // Crear instancia de la red
        const red = new RedComputadoras(dispositivos, paquetes);

        // Procesar paquetes
        const estadoFinal = await red.procesarPaquetes();

        // Generar informe final
        generarInformeFinal(estadoFinal);
    } catch (error) {
        console.error('Error en el simulador de red:', error);
    }
};

// Ejecutar el simulador
ejecutarSimulador();
