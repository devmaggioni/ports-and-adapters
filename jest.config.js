const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  testPathIgnorePatterns: ["/dist/"],
  moduleNameMapper: {
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@adapters/(.*)$": "<rootDir>/src/adapters/$1",
    "^@database/(.*)$": "<rootDir>/src/infra/database/$1",
    "^@usecases/(.*)$": "<rootDir>/src/application/usecases/$1",
  },
};
