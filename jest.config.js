module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    testMatch: ['**/tests/**/*.test.ts'],
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts']
}