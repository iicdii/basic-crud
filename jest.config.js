const nextJest = require('next/jest')
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)