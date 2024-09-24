// usando la variable izada
// asignamos un valor antes de declararla

function scope () {
    f = 1;
    var f; // izamiento de js
    /*
    el analizador pasa todas las inicializaciones `var`
    al inicio de la function
    ese es el efecto del parser de JS
    */
}

// ahora son equivalentes
function scope(){
    var f;
    f = 1;
}
