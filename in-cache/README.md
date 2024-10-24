
# Proyecto de Sistema de Caché en Memoria con Estrategia LRU

Este proyecto implementa un sistema de caché en memoria utilizando la estrategia de **Least Recently Used (LRU)**, que asegura que los datos menos utilizados se eliminen cuando el tamaño de la caché es excedido. El sistema está optimizado para acceder rápidamente a datos que se utilizan con frecuencia y está integrado con un frontend basado en **React** que permite gestionar el caché.

## Características del Sistema de Caché

- **Patrón de Diseño Singleton**: Garantiza que solo haya una instancia de la caché ejecutándose a lo largo del ciclo de vida de la aplicación.
- **Patrón Proxy**: Controla el acceso a la caché real (implementación de LRU), permitiendo agregar lógica adicional, como el registro de logs y validaciones.
- **Mutex**: Utilizado para asegurar la integridad de los datos en operaciones concurrentes.
- **Caché LRU**: Implementación del algoritmo LRU (Least Recently Used) que reemplaza automáticamente los datos menos utilizados cuando la caché está llena.

## Estructura del Proyecto

```plaintext
.
├── docs
│   └── API.md                        // Documentación de la API de la caché
├── public
│   └── index.html                    // Archivo HTML básico para el frontend
├── README.md                         // Documentación principal del proyecto
├── package.json                      // Dependencias y scripts del proyecto Node.js
├── tsconfig.json                     // Configuración de TypeScript
├── .gitignore                        // Archivos y carpetas que git debe ignorar
├── src
│   ├── api
│   │   └── CacheAPI.ts               // API para interactuar con el sistema de caché
│   ├── cache
│   │   ├── Cache.ts                  // Core del sistema de caché (anteriormente CacheManager.ts)
│   │   ├── LRUCache.ts               // Implementación de la caché con la estrategia LRU
│   │   └── ProxyCache.ts             // Implementación del patrón Proxy para gestionar la caché
│   ├── utils
│   │   ├── Logger.ts                 // Utilidad para registrar las operaciones de la caché
│   │   └── Mutex.ts                  // Control de concurrencia para la integridad de la caché
│   ├── tests
│   │   ├── Cache.test.ts             // Pruebas unitarias para el sistema de caché
│   │   └── Performance.test.ts       // Pruebas de rendimiento para la caché
│   ├── index.ts                      // Punto de entrada del backend que expone la API
│   └── frontend
│       ├── App.tsx                   // Componente React para interactuar con la API del sistema de caché
│       └── index.tsx                 // Punto de entrada del frontend de React
```

## Funcionalidades Principales

1. **Manejo de Caché con LRU**: Implementación de un sistema de caché utilizando el algoritmo LRU. El sistema mantiene los datos más recientes y elimina automáticamente aquellos que no se han utilizado recientemente cuando se alcanza el límite de tamaño de la caché.
  
2. **Patrón Proxy**: La clase `ProxyCache.ts` añade una capa de abstracción que intercepta las llamadas a la caché real (`LRUCache.ts`) y permite el registro de eventos a través del `Logger.ts`, además de otras posibles funcionalidades como validación de acceso o métricas de uso.

3. **Logger**: Registro de operaciones clave de la caché (get, set, delete, clear) para facilitar la depuración y el análisis de uso.

4. **Control de Concurrencia con Mutex**: Utiliza `Mutex.ts` para asegurar que las operaciones de escritura en la caché sean seguras en escenarios de concurrencia, evitando condiciones de carrera.

## Diagrama de Flujo del Sistema de Caché

```plaintext
┌──────────────────┐     GET/SET/DELETE/CLEAR     ┌───────────────┐
│   API Request     │ ──────────────────────────► │ ProxyCache    │
└──────────────────┘                              └───────────────┘
                                                       │
                                                       ▼
                                                ┌───────────────┐
                                                │   LRUCache    │
                                                └───────────────┘
                                                       │
                                                       ▼
                                                ┌───────────────┐
                                                │   Data Store  │
                                                └───────────────┘
```

1. **Entrada**: Una solicitud HTTP desde el frontend (GET, POST, DELETE).
2. **ProxyCache**: Intercepta la solicitud y realiza el registro y validaciones necesarias.
3. **LRUCache**: El sistema de caché real procesa la solicitud, ya sea para recuperar o almacenar los datos.
4. **Salida**: El sistema responde al cliente con los datos solicitados o una confirmación de éxito.

## Técnicas Avanzadas Utilizadas
### JavaScript (JS) y TypeScript (TS)

**Asincronía con Promesas y async/await:** En el backend y frontend, las operaciones que interactúan con la API son no bloqueantes, lo que significa que el sistema puede manejar múltiples solicitudes de manera eficiente. async/await es un enfoque moderno para manejar promesas que hace el código más legible en comparación con los callbacks tradicionales.

**Tipado estático con TypeScript:** TS es una extensión de JavaScript que agrega tipos estáticos. En este proyecto, se usa para garantizar que los datos intercambiados entre el backend y el frontend sigan los contratos establecidos, reduciendo el número de errores en tiempo de ejecución.

### Node.js

**Express.js para Rutas REST:** El backend está construido sobre Node.js utilizando Express, que es un framework minimalista para crear servidores HTTP. Se encarga de definir las rutas REST para interactuar con la caché, ofreciendo endpoints como GET, POST y DELETE."

**Middleware:** En Express, los middlewares gestionan el ciclo de vida de las solicitudes HTTP. Se utiliza body-parser para procesar las solicitudes entrantes en formato JSON.

**Patrón Singleton**: La caché en sí misma es una instancia Singleton, lo que significa que solo hay una instancia global de la caché a lo largo de la vida de la aplicación. Esto asegura que los datos en caché sean compartidos entre todas las solicitudes y módulos del sistema.

### React

**Hooks (useState y useEffect):** En el frontend, se utilizan hooks para gestionar el estado y los efectos secundarios. useState permite manejar el estado del componente (como las claves y valores de la caché), mientras que useEffect se utiliza para cargar los datos al inicio, ejecutándose cuando el componente se monta.

**Funciones Flecha:** Se utilizan funciones flecha para definir componentes y handlers. Las funciones flecha ofrecen ventajas como la lexicografía de this (vinculación automática al contexto correcto). Esto reduce la necesidad de escribir código adicional para controlar el contexto en métodos de clase.

**Async/Await**: Las solicitudes HTTP hacia la API se manejan de forma asíncrona con `async/await`, lo que permite un código más claro y fácil de mantener.

**Render Condicional:** Se usa renderizado condicional para mostrar los valores de la caché o manejar errores de forma amigable al usuario.

**Custom Hooks:** Un Custom Hook permite encapsular la lógica relacionada con las solicitudes a la API. Esto promueve la reutilización del código y ayuda a mantener la lógica separada de los componentes de UI.

**JSX (JavaScript + XML):** React utiliza JSX, una extensión de la sintaxis de JavaScript que permite escribir estructuras de interfaz de usuario de manera similar a HTML dentro de los componentes. Es fundamental en la creación de interfaces dinámicas y declarativas.
    

### Diseño y Patrones de Software

**Singleton:** El diseño del cache sigue el patrón Singleton, lo que asegura que solo exista una instancia de la caché para toda la aplicación. Esto es crucial en aplicaciones que dependen de un único punto de almacenamiento temporal.

**Proxy:** El patrón Proxy en ProxyCache.ts se utiliza para interceptar las operaciones hacia la caché real, permitiendo agregar lógica adicional sin modificar la implementación interna de la caché.

**LRU Cache:** La estructura de la caché sigue el algoritmo Least Recently Used (LRU), lo que significa que siempre se eliminará el elemento menos recientemente usado cuando la caché alcance su límite de capacidad.

### Otros Conceptos

**Inmutabilidad:** React promueve el concepto de inmutabilidad, lo que significa que los objetos o arrays no deben modificarse directamente. En lugar de eso, se debe crear una nueva copia del estado para reflejar cambios. Esto garantiza un rendimiento óptimo y un comportamiento predecible de los componentes.

**Renderización Declarativa:** React permite crear componentes de interfaz de usuario de manera declarativa. Esto significa que, en lugar de describir paso a paso cómo cambiar la interfaz (como en jQuery), declaramos el resultado final y React se encarga de actualizar el DOM para reflejar ese estado.
    

## Preparar el Entorno de Ejecución

### Requisitos

- Node.js (versión 14 o superior)
- npm (gestor de paquetes de Node.js)

### Instalación

1. Clona el repositorio del proyecto:
   ```bash
   git clone https://github.com/tu-repositorio.git
   ```

2. Ve al directorio del proyecto:
   ```bash
   cd tu-repositorio
   ```

3. Iniciar el proyecto
```bash
npm init -y

```

4. Instala las dependencias:
   ```bash
   npm install
   ```

### Ejecutar el Proyecto

1. Para iniciar el servidor del backend:
   ```bash
   npm run start
   ```

   El servidor estará corriendo en `http://localhost:3000`.

2. Para iniciar el frontend de React:
   ```bash
   npm run start-frontend
   ```

   El frontend estará disponible en `http://localhost:3000`.

## Comandos útiles

- `npm run test`: Ejecuta las pruebas unitarias para el sistema de caché.
- `npm run build`: Genera una versión optimizada del frontend.
- `npm cache clean --force`: para limpiar la cache


## Resultado esperado

1. Caché de almacenamiento eficiente (LRU)

Funcionalidad esperada: El sistema debe implementar un caché LRU, lo que significa que cuando la caché alcanza su límite (por ejemplo, 100 elementos), los elementos que se hayan utilizado menos recientemente serán eliminados para hacer espacio para los nuevos.
Resultado esperado: Si intentas agregar un nuevo elemento a la caché cuando ya está llena, el sistema automáticamente eliminará los elementos más antiguos para mantener el tamaño máximo.

2. API RESTful para gestionar la caché

Funcionalidad esperada: La API que estás construyendo debe permitir a los usuarios:
   - Almacenar valores (POST /cache).
   - Recuperar valores por clave (GET /cache/:key).
   - Eliminar valores por clave (DELETE /cache/:key).
   - Limpiar toda la caché (D*ELETE /cache).

Todo esto debe funcionar de manera eficiente y escalable, con respuestas HTTP adecuadas en cada caso.

**Resultado esperado:**
   POST /cache: El usuario debe poder agregar un valor a la caché con una clave y recibir un código 201 (Created) si se almacena con éxito.
   GET /cache/:key: El usuario debe poder recuperar un valor almacenado utilizando su clave y recibir un código 200 (OK) si el valor existe, o un 404 (Not Found) si no existe.
   DELETE /cache/:key: El usuario debe poder eliminar un valor almacenado por su clave y recibir un código 200 (OK) si la clave se elimina.
   DELETE /cache: El usuario debe poder limpiar toda la caché y recibir un código 200 (OK) cuando la operación es exitosa.

## Conclusión

Este proyecto proporciona una solución completa de caché en memoria optimizada con una estrategia LRU. Está diseñado utilizando patrones de diseño avanzados como Singleton y Proxy, así como técnicas modernas de React como hooks, funciones flecha y async/await para el frontend. Es ideal para aplicaciones que necesitan optimizar el acceso a datos frecuentemente utilizados.