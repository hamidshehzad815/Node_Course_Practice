const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve(1);
    reject(new Error("404"));
  }, 2000);
});

p.then((res) => console.log("Result: ", res)).catch((err) =>
  console.log("Error: ", err.message)
);
