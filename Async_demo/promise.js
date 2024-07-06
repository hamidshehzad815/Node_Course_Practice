// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve(1);
//     reject(new Error("404"));
//   }, 2000);
// });

// p.then((res) => console.log("Result: ", res)).catch((err) =>
//   console.log("Error: ", err.message)
// );

const users = [
  {
    id: 1,
    gitHubUsername: "HamidShehzad",
    repos: [
      {
        repoName: "repo1",
        commits: ["commit1", "commit2"],
      },
    ],
  },
  {
    id: 2,
    gitHubUsername: "AbuBakar",
    repos: [
      {
        repoName: "repo2",
        commits: ["commit1", "commit2", "commit3"],
      },
      {
        repoName: "repo3",
        commits: ["commit1"],
      },
    ],
  },
];

console.log("Before");
getUser(2)
  .then((user) => getRepos(user.gitHubUsername))
  .then((repos) => getCommits(repos[1]))
  .then((commits) => console.log("Commits:", commits));
console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user From database");
      for (let user of users) {
        if (user.id === id) {
          resolve(user);
        }
      }
    }, 2000);
  });
}

function getRepos(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading repos from Database");
      for (let user of users) {
        if (user.gitHubUsername === username) {
          resolve(user.repos);
        }
      }
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading commits from database");
      resolve(repo.commits);
    }, 2000);
  });
}
