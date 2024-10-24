// Cache.test.ts - Pruebas unitarias para Cache con concurrencia.

import { Cache } from '../cache/Cache';

//  Describe block: Agrupa las pruebas relacionadas con Cache.
describe('Cache (Concurrencia)', () => {
    let Cache: Cache<any>; //  Usar any para simplificar las pruebas con diferentes tipos.  // Tipado dinámico

    //  beforeEach: Se ejecuta antes de cada prueba (it).  Asegura un estado limpio para cada prueba.
    beforeEach(async () => {
        // Obtiene la instancia de Cache usando el patrón Singleton.  Garantiza que todas las pruebas usen la misma instancia. // Patrón Singleton
        Cache = Cache.getInstance(2);
        // Limpia la caché antes de cada prueba para evitar interferencias entre pruebas.
        await Cache.clear();
    });

    // Prueba para verificar el almacenamiento y la recuperación de datos en un entorno concurrente.
    it('debe almacenar y recuperar datos en concurrencia sin inconsistencias', async () => {
        //  Se crean promesas para las operaciones de set.  Las promesas representan operaciones asíncronas.  // Promesas // Asincronía
        const promesa1 = Cache.set('clave1', 'valor1');
        const promesa2 = Cache.set('clave2', 42);
        const promesa3 = Cache.set('clave3', 'valor3'); // Desaloja 'clave1' debido al límite de tamaño de la caché (LRU). // LRU

        // Promise.all: Espera a que todas las promesas se resuelvan.  Simula la ejecución concurrente de las operaciones de set. // Concurrencia // Promise.all
        await Promise.all([promesa1, promesa2, promesa3]);

        // Assertions: Verifican que los valores almacenados en la caché son correctos después de las operaciones concurrentes.
        //  Se usa await para esperar a que las promesas de get se resuelvan.  // Async/Await
        expect(await Cache.get('clave1')).toBeUndefined(); // clave1 debe ser undefined porque fue desalojada por la política LRU.
        expect(await Cache.get('clave2')).toBe(42);
        expect(await Cache.get('clave3')).toBe('valor3');
    });

    it('debe eliminar datos de forma concurrente sin errores', async () => {
        await Cache.set('clave1', 'valor1');
        await Cache.set('clave2', 'valor2');

        // Promesas para las operaciones de delete. // Promesas // Asincronía
        const promesa1 = Cache.delete('clave1');
        const promesa2 = Cache.delete('clave2');

        // Promise.all: Simula la ejecución concurrente de las operaciones de delete. // Concurrencia // Promise.all
        await Promise.all([promesa1, promesa2]);

        expect(await Cache.get('clave1')).toBeUndefined();
        expect(await Cache.get('clave2')).toBeUndefined();
    });

    // Prueba para verificar el manejo de múltiples lecturas concurrentes.
    it('debe manejar múltiples get concurrentes correctamente', async () => {
        await Cache.set('clave1', 'valor1');

        //  Promesas para las operaciones de get. // Promesas // Asincronía
        const promesa1 = Cache.get('clave1');
        const promesa2 = Cache.get('clave1');

        // Promise.all: Simula la ejecución concurrente de las operaciones de get. // Concurrencia // Promise.all
        // Desestructuración de array para obtener los resultados de las promesas. // Desestructuración
        const [valor1, valor2] = await Promise.all([promesa1, promesa2]);

        expect(valor1).toBe('valor1');
        expect(valor2).toBe('valor1');
    });

    it('debe asegurar que solo exista una instancia (Singleton)', async () => {
        //  Verifica que el patrón Singleton funcione correctamente. // Patrón Singleton
        const otraInstancia = Cache.getInstance<any>(2);
        expect(Cache).toBe(otraInstancia); //  Ambas variables deben referirse a la misma instancia.
    });

    it('debe limpiar la caché correctamente', async () => {
        await Cache.set('clave1', 'valor1');
        await Cache.clear(); //  Operación clear()
        expect(await Cache.get('clave1')).toBeUndefined();
    });
});