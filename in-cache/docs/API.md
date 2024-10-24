
# Documentación de la API de Caché

Esta API proporciona endpoints para interactuar con el sistema de caché en memoria. La caché admite operaciones básicas como recuperar, almacenar y eliminar datos, así como limpiar toda la caché. Esta API se basa en un sistema de **Proxy Cache** que utiliza una estrategia de caché **LRU (Least Recently Used)**.

## URL Base
La API es accesible bajo la siguiente URL base:
```
http://localhost:3000/api
```

## Endpoints

### 1. `GET /cache/:key`

Recupera el valor asociado con una clave de la caché.

- **URL:** `/cache/:key`
- **Método:** `GET`
- **Parámetro de ruta:**
  - `key` (string): La clave cuyo valor deseas recuperar de la caché.
- **Respuesta:**
  - `200 OK` si la clave existe en la caché. Devuelve la clave y su valor asociado.
  - `404 Not Found` si la clave no se encuentra en la caché.
  
#### Ejemplo:
```bash
GET /cache/user123
```
Respuesta:
```json
{
  "key": "user123",
  "value": "John Doe"
}
```

### 2. `POST /cache`

Almacena un par clave-valor en la caché. Tanto la `key` como el `value` deben proporcionarse en el cuerpo de la solicitud.

- **URL:** `/cache`
- **Método:** `POST`
- **Cuerpo de la solicitud:**
  ```json
  {
    "key": "tu-clave",
    "value": "tu-valor"
  }
  ```
- **Respuesta:**
  - `201 Created` si el par clave-valor se almacena correctamente.
  - `400 Bad Request` si falta la clave o el valor en el cuerpo de la solicitud.

#### Ejemplo:
```bash
POST /cache
```
Cuerpo de la solicitud:
```json
{
  "key": "user123",
  "value": "John Doe"
}
```
Respuesta:
```json
{
  "message": "Clave user123 almacenada correctamente."
}
```

### 3. `DELETE /cache/:key`

Elimina una clave y su valor asociado de la caché.

- **URL:** `/cache/:key`
- **Método:** `DELETE`
- **Parámetro de ruta:**
  - `key` (string): La clave que se eliminará de la caché.
- **Respuesta:**
  - `200 OK` cuando la clave se elimina correctamente de la caché.
  
#### Ejemplo:
```bash
DELETE /cache/user123
```
Respuesta:
```json
{
  "message": "Clave user123 eliminada de la caché."
}
```

### 4. `DELETE /cache`

Limpia toda la caché, eliminando todos los pares clave-valor almacenados.

- **URL:** `/cache`
- **Método:** `DELETE`
- **Respuesta:**
  - `200 OK` cuando la caché se limpia correctamente.

#### Ejemplo:
```bash
DELETE /cache
```
Respuesta:
```json
{
  "message": "Caché limpiada por completo."
}
```

## Manejo de Errores

En caso de errores, la API devuelve un mensaje de error adecuado y el código de estado HTTP correspondiente.

### Errores comunes:

- `400 Bad Request`: Esto ocurre si los parámetros requeridos (`key` o `value`) faltan en el cuerpo de la solicitud.
- `404 Not Found`: Esto ocurre cuando se intenta acceder a una clave inexistente en la caché.

#### Ejemplo de error:
```json
{
  "message": "Clave user123 no encontrada en la caché."
}
```

## Ejecutando el Servidor

Para iniciar el servidor y exponer la API de caché, debes usar el siguiente comando después de asegurarte de que todas las dependencias están instaladas:

```bash
npm start
```

El servidor estará escuchando en `http://localhost:3000`.

## Probando la API

Puedes probar la API usando herramientas como `curl`, `Postman` o cualquier cliente HTTP de tu elección. Aquí algunos ejemplos de solicitudes:

- **Insertar un valor en la caché:**
  ```bash
  curl -X POST http://localhost:3000/api/cache -H "Content-Type: application/json" -d '{"key": "user123", "value": "John Doe"}'
  ```

- **Obtener un valor de la caché:**
  ```bash
  curl -X GET http://localhost:3000/api/cache/user123
  ```

- **Eliminar una clave de la caché:**
  ```bash
  curl -X DELETE http://localhost:3000/api/cache/user123
  ```

- **Limpiar toda la caché:**
  ```bash
  curl -X DELETE http://localhost:3000/api/cache
  ```

## Conclusión

Esta API proporciona una forma sencilla de interactuar con el sistema de caché en memoria. Puedes realizar operaciones para almacenar, recuperar y gestionar las entradas de la caché utilizando una variedad de métodos HTTP.