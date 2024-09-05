// Implementación usando clases con Private Fields y Nullish Coalescing Operator
class Categoria {
    #nombre;
    #subcategorias;

    constructor(nombre) {
        this.#nombre = nombre ?? "Sin nombre"; // Nullish Coalescing para nombre por defecto
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

    actualizarSubcategoria(indice, nuevoNombre) {
        if (this.#subcategorias[indice]) {
            this.#subcategorias[indice].nombre = nuevoNombre ?? this.#subcategorias[indice].nombre;
        }
    }
}

// Ejemplo de uso con nuevas características
const nuevaCategoria = new Categoria();
nuevaCategoria.agregarSubcategoria(subcategoria1);

console.log("\n--- Uso de Nuevas Características (Private Fields y Nullish Coalescing) ---");
console.log("Nombre de la categoría:", nuevaCategoria.obtenerNombre());
console.log("Subcategorías:", nuevaCategoria.obtenerSubcategorias());
