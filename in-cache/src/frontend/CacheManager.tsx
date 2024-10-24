import React, { useState, useEffect } from 'react';

// Interfaz para los datos de la caché. Define la estructura de un objeto donde
// las claves son strings y los valores también son strings.
interface CacheData {
    [key: string]: string;
}

// Componente funcional CacheManager. Este componente se encarga de la 
// interacción del usuario con la caché, permitiendo agregar, eliminar y 
// visualizar elementos.
const CacheManager: React.FC = () => {
    // Estados del componente:
    // - key: Almacena la clave introducida por el usuario.
    // - value: Almacena el valor introducido por el usuario.
    // - cacheData: Almacena los datos de la caché como un objeto.
    // - error: Almacena un mensaje de error en caso de que ocurra alguno.
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [cacheData, setCacheData] = useState<CacheData>({});
    const [error, setError] = useState<string | null>(null);

    // Función para obtener los datos de la caché desde el servidor.
    const fetchCacheData = async () => {
        try {
            // Realiza una solicitud GET al endpoint /api/cache.
            const response = await fetch('/api/cache');

            // Verifica si la respuesta HTTP es exitosa (código 2xx).
            if (!response.ok) {
                // Si la respuesta no es exitosa, lanza un error con el código y estado.
                throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
            }

            // Parsea la respuesta como JSON.
            const data = await response.json();

            // Actualiza el estado cacheData con los datos obtenidos.
            setCacheData(data);
        } catch (err: any) {
            // Captura cualquier error durante la solicitud fetch y actualiza el estado de error.
            setError(`Error obteniendo los datos de la caché: ${err.message}`);
        }
    };

    // useEffect para obtener los datos de la caché cuando el componente se monta.
    // El segundo argumento ([]) asegura que esto solo se ejecute una vez.
    useEffect(() => {
        fetchCacheData();
    }, []);

    // Función para agregar una nueva entrada a la caché.
    const addCacheEntry = async () => {
        // Valida que se hayan proporcionado tanto la clave como el valor.
        if (!key || !value) {
            setError('Debes proporcionar tanto una clave como un valor.');
            return;
        }

        // Limpia cualquier error previo.
        setError(null);

        try {
            // Realiza una solicitud POST al endpoint /api/cache con la clave y el valor.
            const response = await fetch('/api/cache', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ key, value }),
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
            }

            // Limpia los campos de entrada después de agregar la entrada.
            setKey('');
            setValue('');

            // Actualiza la caché para reflejar los cambios.
            fetchCacheData();
        } catch (err: any) {
            setError(`Error añadiendo la clave en la caché: ${err.message}`);
        }
    };

    // Función para eliminar una entrada de la caché.
    const deleteCacheEntry = async (keyToDelete: string) => {
        try {
            // Realiza una solicitud DELETE al endpoint /api/cache/:key.
            const response = await fetch(`/api/cache/${keyToDelete}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
            }

            // Actualiza la caché después de eliminar la entrada.
            fetchCacheData();
        } catch (err: any) {
            setError(`Error eliminando la clave de la caché: ${err.message}`);
        }
    };

    // Función para limpiar toda la caché.
    const clearCache = async () => {
        try {
            // Realiza una solicitud DELETE al endpoint /api/cache.
            const response = await fetch('/api/cache', { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
            }
            // Actualiza la caché después de limpiarla.
            fetchCacheData();
        } catch (err: any) {
            setError(`Error limpiando la caché: ${err.message}`);
        }
    };

    // Renderiza la interfaz de usuario.
    return (
            <div>
                <h2>Caché actual</h2>

                {/* Muestra un mensaje de error si existe. */}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* Muestra los elementos de la caché en una lista. */}
                <ul>
                    {Object.entries(cacheData).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value} {' '}
                            <button onClick={() => deleteCacheEntry(key)}>Eliminar</button>
                        </li>
                    ))}
                </ul>

                {/* Formulario para agregar nuevas entradas a la caché. */}
                <h3>Añadir a la caché</h3>
                <input
                    type="text"
                    placeholder="Clave"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Valor"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button onClick={addCacheEntry}>Añadir</button>

                {/* Botón para limpiar toda la caché. */}
                <h3>Limpiar caché</h3>
                <button onClick={clearCache}>Limpiar toda la caché</button>
            </div>
    );
};

export default CacheManager;