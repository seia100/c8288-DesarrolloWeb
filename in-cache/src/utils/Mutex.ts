// Mutex.ts
// Implementación de un Mutex (Exclusión Mutua) para la sincronización.

// Clase Mutex:  Proporciona un mecanismo de exclusión mutua para sincronizar el acceso a recursos compartidos. // Sincronización // Mutex
export class Mutex {
    // Indica si el mutex está bloqueado. // Estado del Mutex
    private locked: boolean = false;

    // Cola de funciones en espera de que se libere el bloqueo. // Cola de espera
    private waiting: Array<() => void> = [];

    /**
     * Ejecuta una función de forma exclusiva, garantizando que solo una función se ejecute a la vez. // Exclusión mutua
     *
     * @param callback La función a ejecutar de forma exclusiva.  Puede ser asíncrona. // Callbacks asíncronos
     * @returns Una promesa que se resuelve con el resultado de la función callback. // Promesas // Genéricos
     */
    public async runExclusive<T>(callback: () => T | Promise<T>): Promise<T> {
        // Adquiere el bloqueo del mutex.  Espera si el mutex ya está bloqueado. // Adquisición del bloqueo
        await this.lock();

        try {
            // Ejecuta la función callback.  El await maneja correctamente las funciones asíncronas.
            return await callback();
        } finally {
            // Libera el bloqueo del mutex en el bloque finally para asegurar que se libere incluso si hay errores. // Liberación del bloqueo
            this.unlock();
        }
    }

    /**
     * Bloquea el mutex.  Si ya está bloqueado, agrega la función resolve a la cola de espera. // Bloqueo del Mutex
     *
     * @returns Una promesa que se resuelve cuando se adquiere el bloqueo. // Promesas
     */
    private async lock(): Promise<void> {
        return new Promise<void>((resolve) => {
            if (!this.locked) {
                // Si el mutex no está bloqueado, lo bloquea y resuelve la promesa inmediatamente.
                this.locked = true;
                resolve();
            } else {
                // Si el mutex está bloqueado, agrega la función resolve a la cola de espera.
                this.waiting.push(resolve); // Agregar a la cola de espera
            }
        });
    }

    /**
     * Desbloquea el mutex.  Si hay funciones en espera, resuelve la primera de la cola. // Desbloqueo del Mutex
     */
    private unlock(): void {
        if (this.waiting.length > 0) {
            // Si hay funciones en espera, obtiene la primera de la cola y la ejecuta.
            const resolve = this.waiting.shift()!; // Non-null assertion (!) porque sabemos que waiting no está vacío.
            resolve(); //  Resolver la promesa de la siguiente función en la cola
        } else {
            // Si no hay funciones en espera, desbloquea el mutex.
            this.locked = false;
        }
    }
}