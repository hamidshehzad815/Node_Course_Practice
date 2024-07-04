const os = require("os");

// Get the total memory of the system
const totalMemory = os.totalmem();
// Get the free memory available in the system
const freeMemory = os.freemem();
// Get the hostname of the system
const hostName = os.hostname();
// Get the operating system type
const type = os.type();

// Print the total memory
console.log(`Total Memory: ${totalMemory}`);
// Print the free memory
console.log(`Free Memory: ${freeMemory}`);
// Print the hostname
console.log(`Host Name : ${hostName}`);
// Print the operating system type
console.log(`Type: ${type}`);
