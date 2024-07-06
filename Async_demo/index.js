console.log("Before");
getUser(1, (user) => {
  getRepos(user.Github, (repos) => {
    getCommits(repos, (commits) => {
      console.log(commits);
    });
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
    console.log("Reading repos from database");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log("Reading commits from database");
    callback(["commit1", "commit2", "commit3"]);
  }, 2000);
}
