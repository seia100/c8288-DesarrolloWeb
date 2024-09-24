const fs = require("fs");

const callback = (err, data) => {
    if (err) {
        return console.log("error");
    }
    console.log(`File content ${ data }`);
};

fs.readFile(" file.txt", callback);