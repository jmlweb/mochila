/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
