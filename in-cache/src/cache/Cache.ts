// Cache.ts
// Administrador de caché con Singleton, LRUCache y Mutex para concurrencia.

import { LRUCache } from './LRUCache';
import { Mutex } from '../utils/Mutex';

// Clase Cache: Implementa el patrón Singleton y utiliza un Mutex para la sincronización. // Patrón Singleton // Concurrencia // Sincronización
export class Cache<T> {
    private static instance: Cache<any> | null = null; // Instancia única del Cache. // Singleton // Union Types
    private cache: LRUCache<T>; // Instancia de la caché LRU. // LRU Cache // Genéricos
    private mutex: Mutex; // Mutex para controlar el acceso concurrente. // Mutex // Concurrencia

    /**
     * Constructor privado para implementar el patrón Singleton. // Patrón Singleton
     * @param size Tamaño máximo de la caché.
     */
    private constructor(size: number) {
        this.cache = new LRUCache<T>(size);
        this.mutex = new Mutex();
    }

    /**
     * Obtiene la instancia única del Cache. // Patrón Singleton // Método estático
     * @param size Tamaño máximo de la caché.
     * @returns Instancia de Cache. // Genéricos
     */
    public static getInstance<T>(size: number): Cache<T> {
        if (!Cache.instance) {
            Cache.instance = new Cache<T>(size);
        }
        return Cache.instance as Cache<T>; // Aserción de tipo // Genéricos
    }

    /**
     * Almacena un valor en la caché de forma segura. // Operación de caché: Set // Concurrencia // Async/Await
     * @param key Clave con la que se almacenará el valor.
     * @param value Valor a almacenar en la caché.
     * @returns Una promesa que se resuelve cuando la operación se completa. // Promesas
     */
    public async set(key: string, value: T): Promise<void> {
        await this.mutex.runExclusive(async () => { //  Sección crítica // Mutex
            this.cache.set(key, value);
        });
    }

    /**
     * Obtiene un valor de la caché de forma segura. // Operación de caché: Get // Concurrencia // Async/Await
     * @param key Clave del valor a obtener.
     * @returns Una promesa que se resuelve con el valor o undefined si no existe. // Promesas // Tipos de retorno: Union Types
     */
    public async get(key: string): Promise<T | undefined> {
        return await this.mutex.runExclusive(async () => { //  Sección crítica // Mutex
            return this.cache.get(key);
        });
    }

    /**
     * Elimina un valor de la caché de forma segura. // Operación de caché: Delete // Concurrencia // Async/Await
     * @param key Clave del valor a eliminar.
     * @returns Una promesa que se resuelve cuando la operación se completa. // Promesas
     */
    public async delete(key: string): Promise<void> {
        await this.mutex.runExclusive(async () => { //  Sección crítica // Mutex
            this.cache.delete(key);
        });
    }

    /**
     * Limpia toda la caché de forma segura. // Operación de caché: Clear // Concurrencia // Async/Await
     * @returns Una promesa que se resuelve cuando la operación se completa. // Promesas
     */
    public async clear(): Promise<void> {
        await this.mutex.runExclusive(async () => { //  Sección crítica // Mutex
            this.cache.clear();
        });
    }
}

