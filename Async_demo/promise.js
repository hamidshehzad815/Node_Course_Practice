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
  {
    id: 3,
    gitHubUsername: "Usama",
    repos: [],
  },
];

// console.log("Before");
// getUser(2)
//   .then((user) => getRepos(user.gitHubUsername))
//   .then((repos) => getCommits(repos[1]))
//   .then((commits) => console.log("Commits:", commits));
// console.log("After");

// Async and Await

async function displayCommit() {
  try {
    const user = await getUser(3);
    const repos = await getRepos(user.gitHubUsername);
    const commit = await getCommits(repos[0]);
    console.log(commit);
  } catch (err) {
    console.log(err);
  }
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user From database");
      for (let user of users) {
        if (user.id === id) {
          resolve(user);
        }
      }
      reject(new Error("User Not Found"));
    }, 2000);
  });
}

function getRepos(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading repos from Database");
      for (let user of users) {
        if (user.gitHubUsername === username) {
          if (user.repos.length === 0) {
            reject(new Error("Repos nout found"));
          } else {
            resolve(user.repos);
          }
        }
      }
      reject(new Error("Repos not found"));
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
console.log("Before");
displayCommit();
console.log("After")
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("Async operation 1");
//     resolve(1);
//   }, 2000);
// });

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("Async operation  2");
//     reject(4);
//   }, 2000);
// });

// Promise.race([p1, p2])
//   .then((result) => console.log(result))
//   .catch((err) => console.log("Error", err.message));
