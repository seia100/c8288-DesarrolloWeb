// api/CacheAPI.ts
import express, { Request, Response } from 'express';
import { ProxyCache } from '../cache/ProxiCache'; // Asegúrate de que la clase ProxyCache esté en la ruta correcta.
// Crea una instancia de enrutador Express
const router = express.Router();

// Crea una instancia de ProxyCache con un tamaño máximo de 100 elementos.
// El tipo genérico <string> especifica que la caché almacenará valores de tipo string.
const cache = new ProxyCache<string>(100);

// Define la ruta GET /cache/:key para recuperar un valor de la caché.
router.get('/cache/:key', (req: Request, res: Response) => {
    // Extrae la clave de los parámetros de la solicitud.
    const key = req.params.key;

    // Intenta obtener el valor asociado a la clave de la caché.
    const value = cache.get(key);

    // Si el valor existe, responde con el valor y un código de estado 200 (OK).
    if (value) {
        res.status(200).json({ key, value });
    } else {
        // Si el valor no existe, responde con un mensaje de error y un código de estado 404 (Not Found).
        res.status(404).json({ message: `Clave ${key} no encontrada en la caché.` });
    }
});

// Define la ruta POST /cache para almacenar un valor en la caché.
router.post('/cache', (req: Request, res: Response) => {
    // Extrae la clave y el valor del cuerpo de la solicitud.
    const { key, value } = req.body;

    // Valida que se proporcionen tanto la clave como el valor.
    if (!key || !value) {
        return res.status(400).json({ message: 'Clave y valor son requeridos.' }); // 400 Bad Request
    }

    // Almacena el valor en la caché con la clave especificada.
    cache.set(key, value);

    // Responde con un mensaje de éxito y un código de estado 201 (Created).
    res.status(201).json({ message: `Clave ${key} almacenada correctamente.` });
});

// Define la ruta DELETE /cache/:key para eliminar un valor de la caché.
router.delete('/cache/:key', (req: Request, res: Response) => {
    // Extrae la clave de los parámetros de la solicitud.
    const key = req.params.key;

    // Elimina el valor asociado a la clave de la caché.
    cache.delete(key);

    // Responde con un mensaje de éxito y un código de estado 200 (OK).
    res.status(200).json({ message: `Clave ${key} eliminada de la caché.` });
});

// Define la ruta DELETE /cache para limpiar toda la caché.
router.delete('/cache', (_req: Request, res: Response) => {
    // Limpia la caché.
    cache.clear();

    // Responde con un mensaje de éxito y un código de estado 200 (OK).
    res.status(200).json({ message: 'Caché limpiada por completo.' });
});

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
export default router;
