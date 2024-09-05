// Función para iterar sobre todas las categorías, subcategorías y tareas
function listarTareas(categoria) {
    console.log(`Categoría: ${categoria.nombre}`);
    categoria.subcategorias.forEach(subcategoria => {
        console.log(`  Subcategoría: ${subcategoria.nombre}`);
        subcategoria.tareas.forEach(tarea => {
            console.log(`    Tarea: ${tarea.nombre}, Estado: ${tarea.estado ? "Completada" : "No Completada"}`);
        });
    });
}

// Copia superficial
function copiaSuperficialCategoria(categoria) {
    return { ...categoria };
}

// Copia profunda
function copiaProfundaCategoria(categoria) {
    return JSON.parse(JSON.stringify(categoria));
}

// Ejemplo de uso
console.log("\n--- Listado de Tareas (Iteración Compleja) ---");
listarTareas(categoria1);

// Realizamos una copia superficial y una profunda de la categoría
const copiaSuperficial = copiaSuperficialCategoria(categoria1);
const copiaProfunda = copiaProfundaCategoria(categoria1);

console.log("\n--- Copia Superficial ---");
console.log(copiaSuperficial);

console.log("\n--- Copia Profunda ---");
console.log(copiaProfunda);
