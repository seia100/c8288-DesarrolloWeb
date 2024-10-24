// index.ts
import express from 'express'; // server
import bodyParser from 'body-parser'; // procesar el cuerpo de las solicitudes HTTP entrantes en aplicaciones Node.js en formato JSON
import cacheAPI from './api/CacheAPI'; // Importa el enrutador de la API de caché

// Crea una instancia de la aplicación Express.
const app = express();
const port = 3000;

// Middleware para analizar el cuerpo de las solicitudes como JSON.
// Esto permite acceder a los datos enviados en el cuerpo de la solicitud a través de req.body.
app.use(bodyParser.json());

// Monta el enrutador de la API de caché en la ruta '/api'.
// Todas las rutas definidas en cacheAPI estarán prefijadas con '/api'.
// Por ejemplo, la ruta GET /cache/:key en CacheAPI será accesible como /api/cache/:key.
app.use('/api', cacheAPI);

// Inicia el servidor y escucha en el puerto especificado.
app.listen(port, () => {
    console.log(`Servidor de caché escuchando en http://localhost:${port}`);
});