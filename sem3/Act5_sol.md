Aqui va la documentacion o los pasos que segui en base a la actividad de clase.

# paso 1

### crear un nuevo proyecto Express
para ello ejecuatamos el poryecto para node.js

```npm init -y```

claro tener en cuenta que debo estar en la carpeta elegida

bien poterior a ello modificamos el archivo package .json

bien posterioa ello lo que hacemos es la creacion del modulo de rutals
```js
// Importamos el módulo node-fetch para realizar solicitudes HTTP desde Node.js
import fetch from "node-fetch";

// Definimos la función routeHello que simplemente devuelve "Hello world!"
// Esta función será utilizada para responder a las solicitudes en la ruta /hello
const routeHello = () => "Hello seia-world!";

// Definimos la función asíncrona routeAPINames que hará una solicitud a una API externa
const routeAPINames = async () => {
    // Definimos la URL de la API externa desde donde vamos a obtener los datos
    const url = "https://www.usemodernfullstack.dev/api/v1/users";
    let data;

    try {
        // Realizamos la solicitud HTTP a la API externa usando fetch
        const response = await fetch(url);
        // Esperamos a que la respuesta se convierta en un objeto JSON
        data = await response.json();
    } catch (err) {
        // Si hay algún error en la solicitud, devolvemos el error
        return err;
    }

    // Mapeamos los datos recibidos para crear una lista de usuarios
    // Cada elemento es transformado a un string con el formato `id: valor, name: valor`
    const names = data
        .map((item) => `id: ${item.id}, name: ${item.name}`)
        // Unimos cada string con un salto de línea HTML (<br>)
        .join("<br>");

    // Devolvemos la lista de nombres formateada
    return names;
};

// Exportamos las funciones para que puedan ser utilizadas en otros archivos (como en el servidor Express)
export { routeHello, routeAPINames };

```

## Integracion del modulo de rutas en el servidor
lo qe hacemos es modificar el archivo `index.js` configurar la sritas /hello /api/names

```js
// Importamos las funciones que definimos en el archivo routes.js
// Estas son las rutas 'routeHello' y 'routeAPINames' que manejan las solicitudes.
import { routeHello, routeAPINames } from "./routes.js";

// Importamos express para crear el servidor
import express from "express";

// Creamos una instancia de la aplicación express
const server = express();

// Definimos el puerto en el que el servidor va a escuchar
const port = 3000;

// Definimos la primera ruta '/hello'
// Cuando un cliente haga una solicitud GET a /hello, se ejecutará esta función
server.get("/hello", function (req, res) {
    // Llamamos a la función routeHello que devuelve "Hello World!"
    const response = routeHello(req, res);
    // Enviamos la respuesta al cliente
    res.send(response);
});

// Definimos la ruta '/api/names' que será asíncrona
// Cuando un cliente haga una solicitud GET a /api/names, se ejecutará esta función
server.get("/api/names", async function (req, res) {
    let response;
    try {
        // Llamamos a la función asíncrona routeAPINames que obtiene nombres desde una API externa
        response = await routeAPINames(req, res);
    } catch (err) {
        // Si ocurre algún error durante la solicitud, lo registramos en la consola
        console.log(err);
    }
    // Enviamos la respuesta al cliente, ya sea los nombres o un mensaje de error si algo salió mal
    res.send(response);
});

// Iniciamos el servidor para que escuche en el puerto definido
server.listen(port, function () {
    // Mostramos un mensaje en la consola indicando que el servidor está corriendo
    console.log("Listening on " + port);
});

```

tener en cuenta que para ejecutar es necesario fijarse inicialemente en el archivo package.json que este configurado `"type":"modules"` 

## comprobar el puerto
para comprobar que se esta escuchando en consola debe estar o se debe mostrar `Listening on 3000`

en el navegador debe salir con el `http://localhost:3000/api/names`

