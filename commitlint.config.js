module.exports = {
  exports: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "chore"]],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "scope-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "subject-max-length": [2, "always", 72],
  },
};
