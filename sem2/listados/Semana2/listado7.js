var globalVar = "global";
function scope() { // ejecutamos la funcion scope
    var f = 1;

    if (true) {
        var bar = "2";
    }
    console.log(globalVar);
    console.log(window.globalVar);
    console.log(f);
    console.log(bar);
}
scope();
