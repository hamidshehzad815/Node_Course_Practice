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

function getUser(users, id) {
  for (let user of users) {
    if (user.id === id) {
      return user;
    }
  }
}

function getRepos(user) {
  return user.repos;
}

function displayRepos(repos) {
  for (let repo of repos) {
    console.log(repo.repoName, repo.commits);
  }
}
const user = getUser(users, 2);
const repos = getRepos(user);
displayRepos(repos);
