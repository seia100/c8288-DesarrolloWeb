let globalVar = "global";
function scope() {
    // se agrega para complementar a var y pueden ser asignadas 
    // despues de ser declaradas
    let f = 1; 
    if (true) {
        let bar = "2"; // limitadas al alcance del bloque 
        // por eso no son variables izadas
    }
    console.log(globalVar);
    console.log(window.globalVar); // a diferencia de las variables globales let no se agrega al objeto window

    console.log(f);
    console.log(bar);
}
scope();
