// LRUCache.ts
// Implementa una caché LRU (Least Recently Used) con genéricos para tipado seguro.

// Interfaz CacheItem: Define la estructura de un elemento en la caché. // Interfaces
// El tipo genérico T permite almacenar cualquier tipo de dato como valor. // Genéricos
interface CacheItem<T> {
    key: string;
    value: T;
    timestamp: number; // Marca de tiempo para el seguimiento LRU.
}

// Clase LRUCache: Implementa la caché LRU.
export class LRUCache<T> {
    // Tamaño máximo de la caché.
    private maxSize: number;

    // Map para almacenar los elementos de la caché.  // Estructura de datos: Map
    // La clave es la clave del elemento, y el valor es un objeto CacheItem.
    private cacheMap: Map<string, CacheItem<T>>;

    // Constructor: Inicializa la caché con el tamaño máximo especificado.
    constructor(maxSize: number) {
        this.maxSize = maxSize;
        this.cacheMap = new Map();
    }

    /**
     * Obtiene un valor de la caché.  // Operación de caché: Get
     * Si el elemento se encuentra, se actualiza su marca de tiempo y se mueve al final (más recientemente usado). // Algoritmo LRU
     *
     * @param key La clave del valor a obtener.
     * @returns El valor asociado con la clave, o undefined si no se encuentra. // Tipos de retorno: Union Types
     */
    public get(key: string): T | undefined {
        if (this.cacheMap.has(key)) {
            // Obtiene el elemento de la caché.
            const item = this.cacheMap.get(key)!; // Non-null assertion (!) ya que has(key) garantiza que existe.

            // Elimina y vuelve a insertar el elemento para actualizar su posición como el más recientemente usado.
            // Esto simula el comportamiento LRU, manteniendo los elementos más recientes al final del Map (aunque el orden de inserción en un Map no está garantizado en todas las implementaciones).
            this.cacheMap.delete(key);
            item.timestamp = Date.now(); // Actualiza la marca de tiempo.
            this.cacheMap.set(key, item);

            // Devuelve el valor del elemento.
            return item.value;
        }
        return undefined;
    }

    /**
     * Almacena un valor en la caché. // Operación de caché: Set
     * Si la caché está llena, elimina el elemento menos recientemente usado antes de insertar el nuevo. // Algoritmo LRU
     *
     * @param key La clave asociada al valor.
     * @param value El valor a almacenar.
     */
    public set(key: string, value: T): void {
        // Si la caché está llena, elimina el elemento menos recientemente usado.
        if (this.cacheMap.size >= this.maxSize) {
            // Encuentra la clave del elemento menos recientemente usado iterando sobre el Map.
            let lruKey: string | null = null;
            let lruTimestamp = Infinity;
            for (let [k, item] of this.cacheMap) {
                if (item.timestamp < lruTimestamp) {
                    lruTimestamp = item.timestamp;
                    lruKey = k;
                }
            }
            if (lruKey) {
                this.cacheMap.delete(lruKey);
            }
        }

        // Crea un nuevo elemento de caché con la clave, el valor y la marca de tiempo actual.
        const item: CacheItem<T> = { key, value, timestamp: Date.now() };

        // Almacena el elemento en la caché.
        this.cacheMap.set(key, item);
    }


    /**
     * Elimina un valor de la caché. // Operación de caché: Delete
     * Complejidad temporal: O(1) en promedio. // Análisis de complejidad
     * @param key La clave del valor a eliminar.
     */
    public delete(key: string): void {
        this.cacheMap.delete(key);
    }

    /**
     * Limpia toda la caché.  // Operación de caché: Clear
     */
    public clear(): void {
        this.cacheMap.clear();
    }
}