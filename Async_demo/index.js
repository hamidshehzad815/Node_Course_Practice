console.log("Before");
getUser(1, (user) => {
  console.log(user);
  getRepos(user.Github, (repos) => {
    console.log(repos);
  });
});
console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user From database");
    callback({
      id: id,
      Github: "HamidShehzad",
    });
  }, 2000);
}

function getRepos(username, callback) {
  setTimeout(() => {
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
