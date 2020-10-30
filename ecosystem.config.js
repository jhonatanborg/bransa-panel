module.exports = {
  apps: [
    {
      name: "bransa-panel",
      script: "index.js",
      watch: ".",
    },
    {
      script: "npm",
      args: "run deploy",
      watch: false,
    },
  ],
};
