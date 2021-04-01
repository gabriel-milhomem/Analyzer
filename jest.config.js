module.exports = {
  verbose: true,
  moduleNameMapper: {
    '\\.(png|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.js'
  },
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleDirectories: ['node_modules', 'src'],
  testMatch: [
    "**/__tests__/**/?(*.)+(spec|test).[tj]s?(x)",
  ],
  resetMocks: true
};
