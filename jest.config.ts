module.exports = {
  displayName: 'react-endpoint-renderer',
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./jest.setup.ts', '@testing-library/jest-dom/extend-expect'],
}
