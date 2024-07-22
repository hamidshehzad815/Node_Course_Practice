function printList(...args) {
  for (let val in args) {
    console.log(val);
  }
}

var addTwoPromises = async function (promise1, promise2) {
  return new Promise(async (resolve) => {
    const resolveArray = await Promise.all([promise1, promise2]);
    resolve(resolveArray.reduce((acc, currVal) => acc + currVal, 0));
  });
};

const promise1 = new Promise((resolve) => setTimeout(() => resolve(2), 20));
const promise2 = new Promise((resolve) => setTimeout(() => resolve(5), 60));

(async () => {
  console.log(await addTwoPromises(promise1, promise2)); // Logs: 7
})();
