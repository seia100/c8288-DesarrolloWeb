// Manejo seguro de propiedades con Optional Chaining
function obtenerPrimeraTarea(categoria) {
    // Usamos optional chaining para acceder a la primera tarea de la primera subcategoría
    const primeraTarea = categoria?.subcategorias?.[0]?.tareas?.[0];
    return primeraTarea ? primeraTarea.nombre : "No hay tareas disponibles";
}

// Ejemplo de uso
console.log("\n--- Manejo Seguro de Propiedades ---");
console.log("Primera tarea de la primera subcategoría:", obtenerPrimeraTarea(categoria1));
console.log("Primera tarea de una categoría sin subcategorías:", obtenerPrimeraTarea(categoria2));



