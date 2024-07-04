console.log("Before");
const user = getUser(1);
console.log(user);
console.log("After");

function getUser(id) {
  setTimeout(() => {
    console.log("Reading a user From database");
    return {
      id: id,
      Github: "HamidShehzad",
    };
  }, 3000);
}
