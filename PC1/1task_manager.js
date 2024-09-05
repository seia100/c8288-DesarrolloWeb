/*
Descripcion:

- Desarrolla un gestor de tareas en javascript que permita a los usuarios
agregar, eliminar y atulizar tarea. Las tareas deben estar organizadas en categorias, y cada categoria puede tener multiples subcategorias.

Requisitos: 

Estrucutura de datos compleja
- manejar taras donde cada tarea es un objeto con propiedades como
    - nombre
    - estado ( completado y no completado)
    - categoria
- las categorias deben ser objetos que contengan arrays de subcategoria y cada subcategoria
    debe contener arrays de tarea

Operaciones CRUD


*/

// Requisito uno 

// Función para crear una tarea
function crearTarea(nombre, estado = false) {
    return {
        nombre,// Nombre de la tarea
        estado // Estado de la tarea: completada (true) o no completada (false)
    };
}

// Función para crear una subcategoría
function crearSubcategoria(nombre) {
    return {
        nombre,
        tareas: [], // Array que contendrá las tareas


        // Métodos para agregar una tarea a la subcategoría
        agregarTarea(tarea) {
            this.tareas.push(tarea);
        },
        obtenerTareas() { // metodo para obtener tareas
            return this.tareas;
        },
        actualizarTarea(indice, nuevosDatos) {
            this.tareas[indice] = { ...this.tareas[indice], ...nuevosDatos }; // Uso de spread para actualizar
        },
        eliminarTarea(indice) {
            this.tareas.splice(indice, 1);
        }
    };
}

// Función para crear una categoría
function crearCategoria(nombre) {
    return {
        nombre,
        subcategorias: [],
        agregarSubcategoria(subcategoria) {
            this.subcategorias = [...this.subcategorias, subcategoria]; // Uso de spread para agregar subcategoría
        },
        obtenerSubcategorias() {
            return this.subcategorias;
        },
        actualizarSubcategoria(indice, nuevoNombre) {
            this.subcategorias[indice].nombre = nuevoNombre;
        },
        eliminarSubcategoria(indice) {
            this.subcategorias.splice(indice, 1);
        }
    };
}

// REQUISITO 3: Iteración Compleja y Copias
// Función para listar todas las tareas y subcategorías
function listarTareas(categoria) {
    console.log(`Categoría: ${categoria.nombre}`);
    categoria.subcategorias.forEach(subcategoria => {
        console.log(`  Subcategoría: ${subcategoria.nombre}`);
        subcategoria.tareas.forEach(tarea => {
            console.log(`    Tarea: ${tarea.nombre}, Estado: ${tarea.estado ? "Completada" : "No Completada"}`);
        });
    });
}

// Funciones de copia
function copiaSuperficialCategoria(categoria) {
    return { ...categoria }; // Spread operator para una copia superficial
}

function copiaProfundaCategoria(categoria) {
    return JSON.parse(JSON.stringify(categoria)); // JSON para una copia profunda
}

// REQUISITO 4: Manejo Seguro de Propiedades (Optional Chaining)
// Esta función intenta acceder a la primera tarea usando encadenamiento seguro (evitar errores)
function obtenerPrimeraTarea(categoria) {
    const primeraTarea = categoria.subcategorias[0]?.tareas[0]; // No se incluye optional chaining avanzado
    return primeraTarea ? primeraTarea.nombre : "No hay tareas disponibles";
}

// REQUISITO 5: Uso de Nuevas Características de ECMAScript
// Implementamos private fields y nullish coalescing
class Categoria {
    #nombre;
    #subcategorias;

    constructor(nombre) {
        this.#nombre = nombre ?? "Sin nombre"; // Nullish coalescing operator para valor por defecto
        this.#subcategorias = [];
    }

    agregarSubcategoria(subcategoria) {
        this.#subcategorias = [...this.#subcategorias, subcategoria];
    }

    obtenerSubcategorias() {
        return this.#subcategorias;
    }

    obtenerNombre() {
        return this.#nombre;
    }
}

// Ejemplo de uso con requisitos implementados
const categoria1 = crearCategoria("Tareas Personales");
const subcategoria1 = crearSubcategoria("Compras del hogar");
const tarea1 = crearTarea("Comprar leche", false);
subcategoria1.agregarTarea(tarea1);
categoria1.agregarSubcategoria(subcategoria1);

console.log("\n--- Listado de Tareas ---");
listarTareas(categoria1);

// Copias
console.log("\n--- Copia Superficial ---");
console.log(copiaSuperficialCategoria(categoria1));

console.log("\n--- Copia Profunda ---");
console.log(copiaProfundaCategoria(categoria1));

// Manejo Seguro de Propiedades
console.log("\n--- Manejo Seguro de Propiedades ---");
console.log(obtenerPrimeraTarea(categoria1));

// Uso de Nuevas Características (Private Fields y Nullish Coalescing)
const nuevaCategoria = new Categoria();
console.log("\n--- Categoría con Private Fields ---");
console.log("Nombre de la categoría:", nuevaCategoria.obtenerNombre());
