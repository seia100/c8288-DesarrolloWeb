// cache/ProxyCache.ts
// Implementa el patrón Proxy para la gestión de la caché, incluyendo logging con Logger.

import { LRUCache } from './LRUCache';
import { Logger } from '../utils/Logger';

// Clase ProxyCache: Implementa el patrón Proxy y utiliza un Logger.  // Patrón Proxy // Logging
export class ProxyCache<T> { // Genéricos para tipado seguro
    private realCache: LRUCache<T>; // Instancia de la caché real (LRUCache). // Composición
    private logger: Logger;  // Instancia del Logger para el registro de eventos. // Logging

    // Constructor: Inicializa la caché real y el Logger.
    constructor(cacheSize: number) {
        this.realCache = new LRUCache<T>(cacheSize);
        this.logger = new Logger();
    }

    /**
     * Obtiene un valor de la caché. Registra las acciones de acceso y el resultado. // Operación de caché: Get // Logging
     * @param key La clave del valor a obtener.
     * @returns El valor asociado con la clave o undefined si no existe. // Tipos de retorno: Union Types
     */
    public get(key: string): T | undefined {
        // Pre-procesamiento: Registra el intento de acceso. // Logging
        this.logger.info(`Accediendo a la clave: ${key}`);

        // Delegación: Obtiene el valor de la caché real. // Delegación
        const value = this.realCache.get(key);

        // Post-procesamiento: Registra el valor obtenido o una advertencia si la clave no existe. // Logging // Manejo de errores
        if (value !== undefined) {
            this.logger.log(`Valor obtenido para la clave ${key}: ${value}`);
        } else {
            this.logger.warn(`Clave ${key} no encontrada en la caché`);
        }

        return value;
    }

    /**
     * Almacena un valor en la caché. Registra la operación. // Operación de caché: Set // Logging
     * @param key La clave del valor a almacenar.
     * @param value El valor a almacenar.
     */
    public set(key: string, value: T): void {
        // Pre-procesamiento: Registra la inserción. // Logging
        this.logger.info(`Insertando la clave: ${key}, con valor: ${value}`);

        // Delegación: Almacena el valor en la caché real. // Delegación
        this.realCache.set(key, value);

        // Post-procesamiento: Registra la inserción exitosa. // Logging
        this.logger.log(`Clave ${key} insertada en la caché`);
    }

    /**
     * Elimina un valor de la caché. Registra la operación. // Operación de caché: Delete // Logging
     * @param key La clave del valor a eliminar.
     */
    public delete(key: string): void {
        // Pre-procesamiento: Registra el intento de eliminación. // Logging
        this.logger.info(`Eliminando la clave: ${key}`);

        // Delegación: Elimina el valor de la caché real. // Delegación
        this.realCache.delete(key);

        // Post-procesamiento: Registra la eliminación exitosa. // Logging
        this.logger.log(`Clave ${key} eliminada de la caché`);
    }

    /**
     * Limpia toda la caché. Registra la operación. // Operación de caché: Clear // Logging
     */
    public clear(): void {
        // Pre-procesamiento: Registra el inicio de la limpieza. // Logging
        this.logger.info(`Limpiando toda la caché`);

        // Delegación: Limpia la caché real. // Delegación
        this.realCache.clear();

        // Post-procesamiento: Registra la limpieza exitosa. // Logging
        this.logger.log(`Caché limpiada`);
    }
}