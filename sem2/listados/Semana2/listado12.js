// lo que hace es un callback 
let numbers = [-2, -1, 0, 1, 2];

let traditional = numbers.filter(function (num) {
    return num >= 0;
});

let arrow = numbers.filter((num) => num >= 0);

console.log(traditional);
console.log(arrow);
