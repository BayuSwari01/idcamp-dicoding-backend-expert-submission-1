module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|js)$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!nanoid/.*)"],
};
