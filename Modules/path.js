const path = require("path");

// Print the parsed path of the current file
console.log(path.parse(__filename));

// Store the parsed path object in a variable
const obj = path.parse(__filename);

// Get the file extension
const extension = path.extname(__filename);

// Print the name of the file
console.log(obj.name);

// Check if the file extension is ".js" and print a message
if (extension === ".js") {
  console.log("JavaScript File");
}
