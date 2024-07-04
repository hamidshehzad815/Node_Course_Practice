const fs = require("fs");

// Synchronously read the contents of the current directory
const files1 = fs.readdirSync("./");
console.log(files1);

// Asynchronously read the contents of a directory named "3å"
fs.readdir("OS.js", (err, files) => {
    if (err) console.log(err);
    else console.log(files);
});
