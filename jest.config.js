/** @type {import('jest').Config} */

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  coverageProvider: 'v8',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '!dist/**',
    '!src/**/*.dto.ts',
    '!src/**/*.module.ts',
    '!src/**/main.ts',
    '!src/**/index.ts',
    '!src/**/envs.config.ts',
    '!test/**',
    '!**/node_modules/**',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  coverageReporters: ['text', 'lcov'],
};
