# Endpoint api

sirve para que el frontend y el backend se conecten
- Importante es que dentro del proyecto deberiamos presentar lo de `endpoints`

- en la carpeta `api/` puedo poner endpoint personalizados como `users`. es decir correesponde a un archivo especific

- **Ejemplo de genericos**
- page, apo users,

- corresponde a apo/users

cada archivo endpoint exporta una funcion que maneja solicitudes entrantes (`GET, POST`) 
lo cual me permite una logica de negocios, es decir de una interaccion. Esta interaccion es con la base de datos es por ello que es importante saber sobre endpoints

# GraphQL + Next.js
para hacer esta conexion hacemos uso de la herramienta de `apoloserver`

- esquema graph ql:
  - Interfaces
  - type def
- lo que podemos hacer es consultas en entornos nextjs

> Importante:
> es importante las variables sobre las opciones de graphql
> - saber jugar con el cambio de graphql / api/user y cual se aplica mejor
> involucrar la base de datos para poder jugar con la actividad con MongoDB + mongus

# mongoDB + Mongoose
## mongoDB 
fuentes JSON{
- flexibilidad
- escalabilidad

}
- este formato JSOn tiene que modelarse. HE AQUI entra a tallar `mongoose`
  - Librerisa de modelo de base de datos
  - YYYY lo mas importante es qu eme agrega una capa de abstraccion
 
esto me ayuda a definir, validar y seleccion de datos

## API ROUTE 
- api routes (rest)
- resolves en graphql


cuando combinamos estas herramientas lo que nos haece un proyecto practicamente completo. So, que es lo que falta? LAS PRUEBAS

Cuando tneemos un poryecto completo y para esto es importante un `sut` (system unit test) y esto es lo que se va con la herramineta TDD (test driven development) y este tambien ocupa un metodo
`R` prueba sin code: la pruba no pasa
`G` prueba con codigo no limpio, pero lo sufi como para que se pueda ejecutar una funcion basica.
`R` _refactor_ 

mejorar pruebas unitarias: moks, granularidad, staks, e inyeccion de dependencias. fakes.

tipos de pruebas:
- snap shot test
- pruebas de integracion
- pruebas de extremo a extremo 



