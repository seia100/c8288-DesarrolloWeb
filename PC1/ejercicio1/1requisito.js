// Función para crear una tarea
function crearTarea(nombre, estado = false) {
    return {
        nombre: nombre, // Nombre de la tarea
        estado: estado // Estado de la tarea: completada (true) o no completada (false)
    };
}

// Función para crear una subcategoría
function crearSubcategoria(nombre) {
    return {
        nombre: nombre, // Nombre de la subcategoría
        tareas: [], // Array que contendrá las tareas

        // Método para agregar una tarea a la subcategoría
        agregarTarea: function(tarea) {
            this.tareas.push(tarea);
        }
    };
}

// Función para crear una categoría
function crearCategoria(nombre) {
    return {
        nombre: nombre, // Nombre de la categoría
        subcategorias: [], // Array que contendrá las subcategorías

        // Método para agregar una subcategoría a la categoría
        agregarSubcategoria: function(subcategoria) {
            this.subcategorias.push(subcategoria);
        }
    };
}

// Ejemplo de uso

// Crear una tarea
const tarea1 = crearTarea("Hacer la tarea xd", false); // Tarea no completada

// Crear una subcategoría y agregar la tarea
const subcategoria1 = crearSubcategoria("Ejercicios con JavaScript");
subcategoria1.agregarTarea(tarea1);

// Crear una categoría y agregar la subcategoría
const categoria1 = crearCategoria("Tareas de seia");
categoria1.agregarSubcategoria(subcategoria1);

// Imprimir la estructura para verificar
console.log(categoria1);