module.exports = {
  branches: ["main", { name: "develop", prerelease: "develop" }],
  tagFormat: "v${version}",
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
      },
    ],
    "@semantic-release/github",
    [
      "@semantic-release/exec",
      {
        publishCmd:
          "echo RELEASE_VERSION=${nextRelease.version} >> $GITHUB_ENV\n" +
          "echo RELEASE_GIT_TAG=${nextRelease.gitTag} >> $GITHUB_ENV",
      },
    ],
  ],
};
