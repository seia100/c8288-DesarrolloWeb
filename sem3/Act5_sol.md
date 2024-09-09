Aqui va la documentacion o los pasos que segui en base a la actividad de clase.

# paso 1

### crear un nuevo proyecto Express
para ello ejecuatamos el poryecto para node.js

```npm init -y```

claro tener en cuenta que debo estar en la carpeta elegida

bien poterior a ello modificamos el archivo package .json

bien posterioa ello lo que hacemos es la creacion del modulo de rutals
```js
import fetch from "node-fetch";

const routeHello = () => "Hello world!";

const routeAPINames = async ()=>{
    const url = "https://www.usemodernfullstack.dev/api/v1/users";
    let data;

    try {
        const response = await fetch (url);
        data = await response.json();
    }catch (err){
        return err;
    }
    const names = data
        .map((item) => `id: ${item.id}, name: ${item.name}`)
        .join("<br>");
    return names;

};
export{routeHello, routeAPINames};


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

