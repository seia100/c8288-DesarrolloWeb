// Función de validación principal
// Esta función valida los datos de un usuario y usa un callback para devolver el resultado.
// Esta es la función principal que coordina las validaciones de cada campo del usuario.
function validarUsuario(usuario, callback) {
    var errores = []; // Aquí almacenamos los errores encontrados durante la validación.
    // Validar cada campo usando funciones de validación específicas
    // Cada campo se valida por separado mediante funciones nombradas. Esto es un ejemplo de composición de funciones,
    // que permite una modularidad en las validaciones y evita duplicación de código.
    validarNombre(usuario.nombre, errores);
    validarEmail(usuario.email, errores);
    validarPhone(usuario.phone, errores);
    validarEdad(usuario.edad, errores);
    // Si no hay errores, se confirma el registro
    if (errores.length === 0) {
        // Usamos un callback para devolver un objeto que representa un registro exitoso.
        callback({
            status: "success", // Marcamos el registro como exitoso.
            message: "Usuario ".concat(usuario.nombre, " registrado con \u00E9xito."), // Se devuelve un mensaje confirmando el registro.
        });
    }
    else {
        // Si hay errores, devolvemos un objeto de error sin detener la ejecución, lo que es importante para sistemas no bloqueantes.
        callback({
            status: "error", // Estado de error
            message: "Errores de validación encontrados", // Mensaje general sobre los errores.
            detalles: errores, // Lista detallada de todos los errores de validación encontrados.
        });
    }
}
// Funciones de validación nombradas para cada campo
// Estas funciones se encargan de validar campos específicos y agregan errores si los valores no son válidos.
// Se usan callbacks nombrados en lugar de funciones anónimas, lo cual es crucial para seguir las mejores prácticas
// y hacer el código más mantenible y reutilizable.
function validarNombre(nombre, errores) {
    // Validación de nombre: el nombre debe ser un string no vacío y solo contener letras.
    if (typeof nombre !== 'string' || nombre.length === 0 || !/^[a-zA-Z]+$/.test(nombre)) {
        errores.push("El nombre es inválido. Debe contener solo letras."); // Agrega un error si no cumple con los requisitos.
    }
}
function validarEmail(email, errores) {
    // Se utiliza una expresión regular para validar que el email tenga el formato correcto.
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || !regexEmail.test(email)) {
        errores.push("El email no es válido."); // Agrega un error si el email no es válido.
    }
}
function validarPhone(phone, errores) {
    // Validamos el número de teléfono con una expresión regular que permite entre 10 y 15 dígitos.
    var regexPhone = /^\+?\d{10,15}$/;
    if (typeof phone !== 'string' || !regexPhone.test(phone)) {
        errores.push("El número de teléfono no es válido."); // Agrega un error si el teléfono no es válido.
    }
}
function validarEdad(edad, errores) {
    // Validación de edad: la edad debe ser un número mayor que 0 y menor que 150.
    if (typeof edad !== 'number' || edad <= 0 || edad >= 150) {
        errores.push("La edad no es válida. Debe estar entre 1 y 150 años."); // Agrega un error si la edad no es válida.
    }
}
/*
// Ejemplo de uso
// Este ejemplo de usuario tiene campos válidos.
const usuarioEntrada: Usuario = {
    nombre: "Juan",
    email: "juan@example.com",
    phone: "+1234567890",
    edad: 30,
};
*/
// Ejemplo de uso con datos incorrectos
// Este usuario tiene varios errores en sus campos (nombre no válido, email incorrecto, y teléfono incorrecto).
var usuarioEntrada = {
    nombre: "798as",
    email: "juanexample.com",
    phone: "987564546513",
    edad: 30,
};
// Llamada a la validación con callbacks nombrados
// Aquí validamos al usuario y esperamos la respuesta a través del callback.
validarUsuario(usuarioEntrada, function (resultado) {
    if (resultado.status === "success") {
        console.log(resultado.message); // Si el registro es exitoso, mostramos el mensaje de éxito.
    }
    else {
        console.error(resultado.message); // Si hay errores, mostramos un mensaje de error.
        console.error(resultado.detalles.join('\n')); // Mostramos los detalles específicos de los errores encontrados.
    }
});
