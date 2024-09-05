// Requisito 1: Manejo de números y tipos de datos
// Función para calcular la media de un conjunto de números
function calcularMedia(numeros) {
    let suma = 0; // Variable para acumular la suma de los números
    for (let num of numeros) {
        suma += num; // Sumar cada número al total
    }
    return suma / numeros.length; // Dividir la suma total entre la cantidad de números para obtener la media
}

// Función para calcular la mediana de un conjunto de números
function calcularMediana(numeros) {
    numeros.sort((a, b) => a - b); // Ordenar los números en orden ascendente
    const mitad = Math.floor(numeros.length / 2); // Encontrar el índice del número central

    if (numeros.length % 2 === 0) {
        // Si la cantidad de números es par, calcular el promedio de los dos números centrales
        return (numeros[mitad - 1] + numeros[mitad]) / 2;
    } else {
        // Si la cantidad de números es impar, devolver el número central
        return numeros[mitad];
    }
}

// Función para calcular la moda de un conjunto de números
function calcularModa(numeros) {
    const frecuencias = {}; // Objeto para almacenar la frecuencia de cada número
    let maxFrecuencia = 0; // Almacena la frecuencia más alta encontrada
    let modas = []; // Lista para almacenar los números que tienen la frecuencia máxima

    for (let num of numeros) {
        frecuencias[num] = (frecuencias[num] || 0) + 1; // Contabilizar la frecuencia de cada número
        if (frecuencias[num] > maxFrecuencia) {
            maxFrecuencia = frecuencias[num]; // Actualizar la frecuencia máxima si se encuentra una mayor
            modas = [num]; // Reiniciar la lista de modas con el nuevo número más frecuente
        } else if (frecuencias[num] === maxFrecuencia) {
            modas.push(num); // Añadir el número si tiene la misma frecuencia que la máxima
        }
    }

    return modas; // Devolver la lista de números con la frecuencia máxima (puede haber varias modas)
}

// Función para calcular la desviación estándar de un conjunto de números
function calcularDesviacionEstandar(numeros) {
    const media = calcularMedia(numeros); // Calcular la media de los números
    let sumaCuadrados = 0; // Variable para acumular la suma de los cuadrados de las diferencias con la media

    for (let num of numeros) {
        sumaCuadrados += (num - media) ** 2; // Sumar el cuadrado de la diferencia de cada número respecto a la media
    }

    return Math.sqrt(sumaCuadrados / numeros.length); // Devolver la raíz cuadrada de la varianza para obtener la desviación estándar
}

// Requisito 2: Iteración simple y análisis
// Función para realizar el análisis estadístico (media, mediana, moda, desviación estándar) de un conjunto de números basado en una clave (por ejemplo, "edad" o "ingreso")
function realizarAnalisisEstadistico(datos, key) {
    const numeros = datos.map(item => item[key]).filter(num => typeof num === 'number'); 
    // Usar map para extraer los valores de la clave especificada y filter para eliminar valores no numéricos

    console.log("Media:", calcularMedia(numeros)); // Mostrar la media en la consola
    console.log("Mediana:", calcularMediana(numeros)); // Mostrar la mediana en la consola
    console.log("Moda:", calcularModa(numeros)); // Mostrar la moda en la consola
    console.log("Desviación Estándar:", calcularDesviacionEstandar(numeros)); // Mostrar la desviación estándar en la consola
}

// Requisito 3: Organización de datos en categorías simples
// Función para organizar los datos en categorías (por ejemplo, agrupar por "edad" y analizar los "ingresos" dentro de cada edad)
function analizarPorCategoria(datos, categoriaKey, valorKey) {
    const categorias = {}; // Objeto para almacenar las categorías y sus valores

    for (let item of datos) {
        const categoria = item[categoriaKey]; // Extraer el valor de la categoría (ej. "edad")
        const valor = item[valorKey]; // Extraer el valor numérico que se va a analizar (ej. "ingreso")

        if (!categorias[categoria]) {
            categorias[categoria] = []; // Si la categoría no existe, inicializar un array vacío
        }
        categorias[categoria].push(valor); // Añadir el valor numérico a la categoría correspondiente
    }

    for (let categoria in categorias) {
        console.log(`\nCategoría: ${categoria}`); // Mostrar la categoría actual
        realizarAnalisisEstadistico(categorias[categoria].map(v => ({ valor: v })), 'valor'); 
        // Realizar el análisis estadístico de los valores de cada categoría
    }
}

// Requisito 4: Cálculo simple de diferencia de fechas en días
// Función para calcular la diferencia en días entre dos fechas
function calcularDiferenciaFechas(fecha1, fecha2) {
    const milisegundosPorDia = 1000 * 60 * 60 * 24; // Cantidad de milisegundos en un día
    const diferenciaMilisegundos = Math.abs(fecha2 - fecha1); // Calcular la diferencia en milisegundos entre las dos fechas
    return Math.floor(diferenciaMilisegundos / milisegundosPorDia); // Convertir la diferencia de milisegundos a días y devolver el resultado
}

// Ejemplo básico de uso
const datosEjemplo = [
    { nombre: "Carlos", edad: 25, ingreso: 1000 }, // Persona 1: 25 años, ingreso 1000
    { nombre: "María", edad: 30, ingreso: 1500 }, // Persona 2: 30 años, ingreso 1500
    { nombre: "José", edad: 25, ingreso: 2000 }, // Persona 3: 25 años, ingreso 2000
    { nombre: "Ana", edad: 40, ingreso: 3000 }  // Persona 4: 40 años, ingreso 3000
];

console.log("\n--- Análisis por 'edad' ---");
analizarPorCategoria(datosEjemplo, 'edad', 'ingreso'); // Agrupar los ingresos por edad y realizar el análisis

// Uso de fechas
const fecha1 = new Date("2024-01-01"); // Fecha de inicio
const fecha2 = new Date("2024-02-15"); // Fecha final
console.log("\nDías entre las dos fechas:", calcularDiferenciaFechas(fecha1, fecha2)); // Calcular y mostrar la diferencia en días entre dos fechas
