// Función para crear una tarea
function crearTarea(nombre, estado = false) {
    return {
        nombre,
        estado
    };
}

// Función para crear una subcategoría
function crearSubcategoria(nombre) {
    return {
        nombre,
        tareas: [],

        // Método para agregar una tarea a la subcategoría
        agregarTarea(tarea) {
            this.tareas.push(tarea);
        },

        // Método para obtener todas las tareas de la subcategoría
        obtenerTareas() {
            return this.tareas;
        },

        // Método para actualizar una tarea usando destructuring
        actualizarTarea(indice, nuevosDatos) {
            if (this.tareas[indice]) {
                this.tareas[indice] = { ...this.tareas[indice], ...nuevosDatos };
            }
        },

        // Método para eliminar una tarea de la subcategoría
        eliminarTarea(indice) {
            if (this.tareas[indice]) {
                this.tareas.splice(indice, 1);
            }
        }
    };
}

// Función para crear una categoría
function crearCategoria(nombre) {
    return {
        nombre,
        subcategorias: [],

        // Método para agregar una subcategoría usando el operador spread
        agregarSubcategoria(subcategoria) {
            this.subcategorias = [...this.subcategorias, subcategoria];
        },

        // Método para obtener todas las subcategorías
        obtenerSubcategorias() {
            return this.subcategorias;
        },

        // Método para actualizar una subcategoría por índice
        actualizarSubcategoria(indice, nuevoNombre) {
            if (this.subcategorias[indice]) {
                this.subcategorias[indice].nombre = nuevoNombre;
            }
        },

        // Método para eliminar una subcategoría de la categoría
        eliminarSubcategoria(indice) {
            if (this.subcategorias[indice]) {
                this.subcategorias.splice(indice, 1);
            }
        },

        // Método para fusionar dos categorías usando el operador spread
        fusionarCategorias(categoria) {
            this.subcategorias = [...this.subcategorias, ...categoria.subcategorias];
        }
    };
}

// Mostrar los resultados en consola para las operaciones CRUD

// Crear tareas
const tarea1 = crearTarea("Hacer la compra", false);
const tarea2 = crearTarea("Pagar facturas", true);
const tarea3 = crearTarea("Estudiar JavaScript", false);

// Crear una subcategoría y agregar tareas
const subcategoria1 = crearSubcategoria("Compras del hogar");
subcategoria1.agregarTarea(tarea1);
subcategoria1.agregarTarea(tarea2);

// Crear una segunda subcategoría y agregar una tarea
const subcategoria2 = crearSubcategoria("Estudios");
subcategoria2.agregarTarea(tarea3);

// Crear una categoría y agregar subcategorías
const categoria1 = crearCategoria("Tareas personales");
categoria1.agregarSubcategoria(subcategoria1);
categoria1.agregarSubcategoria(subcategoria2);

// Crear una segunda categoría
const categoria2 = crearCategoria("Tareas profesionales");

// Operaciones CRUD

// Leer subcategorías de la primera categoría
console.log("Subcategorías en la primera categoría:", categoria1.obtenerSubcategorias());

// Leer tareas en la primera subcategoría
console.log("Tareas en la primera subcategoría:", subcategoria1.obtenerTareas());

// Actualizar el nombre de la primera tarea
subcategoria1.actualizarTarea(0, { nombre: "Hacer compras del mes" });
console.log("Tareas actualizadas en la primera subcategoría:", subcategoria1.obtenerTareas());

// Eliminar la segunda tarea
subcategoria1.eliminarTarea(1);
console.log("Tareas después de eliminar la segunda tarea:", subcategoria1.obtenerTareas());

// Actualizar el nombre de la segunda subcategoría
categoria1.actualizarSubcategoria(1, "Estudios y formación");
console.log("Subcategorías después de actualizar:", categoria1.obtenerSubcategorias());

// Eliminar la primera subcategoría
categoria1.eliminarSubcategoria(0);
console.log("Subcategorías después de eliminar la primera subcategoría:", categoria1.obtenerSubcategorias());

// Fusionar dos categorías (spread operator)
categoria2.fusionarCategorias(categoria1);
console.log("Categoría 2 después de fusionar con categoría 1:", categoria2.obtenerSubcategorias());



