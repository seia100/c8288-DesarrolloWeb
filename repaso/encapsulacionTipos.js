/* ENCAPSULAICON CON CLASES Y MODIFICADORES DE ACCESO */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// clase persona con encapsilacion en las propiedades
var Person = /** @class */ (function () {
    // Constructor para inicializar los datos
    function Person(nombre, edad, id) {
        this.nombre = nombre;
        this.edad = edad;
        this.id = id;
    }
    // Getter para obtener nombre
    // aqui controlamos que datos pueden ser accedidos externamente
    Person.prototype.getNombre = function () {
        return this.nombre;
    };
    // getter y setter publico para la edad
    // el setter nos permite controlar los cambios de valor
    Person.prototype.getEdad = function () {
        return this.edad;
    };
    Person.prototype.setEdad = function (nuevaEdad) {
        if (nuevaEdad > 0 && nuevaEdad <= 110)
            this.edad = nuevaEdad;
        else
            throw new Error('La edad debe ser positiva');
    };
    // metodo protegido: solo accesoble desde la clase o clases derivadas
    Person.prototype.getId = function () {
        return this.id;
    };
    return Person;
}());
// clase Empleado que hereda de Persona
var Empleado1 = /** @class */ (function (_super) {
    __extends(Empleado1, _super);
    function Empleado1(nombre, edad, id, sueldo) {
        var _this = _super.call(this, nombre, edad, id) || this;
        _this.sueldo = sueldo;
        return _this;
    }
    // Metodo puvlico que expone un dato encapsulado, ademas de usar datos heredados
    Empleado1.prototype.getDatos = function () {
        return "Nombre: ".concat(this.getNombre(), ", Edad: ").concat(this.getEdad(), ", \n                ID: ").concat(this.getId(), ", Sueldo: ").concat(this.sueldo);
    };
    return Empleado1;
}(Person));
// crear un objeto de la clase Empleado
var empleadoRan = new Empleado1('Ramon', 21, 4212, 25000);
// intentamos acceder a los datos
console.log(empleadoRan.getDatos());
// acceso restringido: esto causara errores ya que son privados o protegidos
// empleado.nombre          // eeprrp: nombre es priado
// empleado.id;        // Error: 'id' es protegido
// empleado.getId();   // Error: 'getId' es protegido
// modificamos la edad usando el setter
empleadoRan.setEdad(15);
console.log(empleadoRan.getEdad());
//intento de asignar una edad invalida para generar un eroro
try {
    empleadoRan.setEdad(-3); // lanzara un error
}
catch (error) {
    console.log(error); // manejo del error
}
