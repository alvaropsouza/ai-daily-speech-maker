/** @type {import('jest').Config} */

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.ts', '!dist/**', '!src/**/*.dto.ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
