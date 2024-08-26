function processNumbers(numbersArray) {
    // 1. Ordenar el array de números
    numbersArray.sort((a, b) => a - b); // Usamos una función de comparación para ordenar numéricamente

    // 2. Unir los números en una cadena (opcional, si se requiere)
    let sortedNumbersString = numbersArray.join(', ');

    return sortedNumbersString;
}

// Ejemplo de uso
let inputNumbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
let resultNumbers = processNumbers(inputNumbers);
console.log(resultNumbers);
// Output: "1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9"
