export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "@swc/jest",
    "^.+\\.(svg|jpg|png)$": "jest-transform-stub",
  },
  setupFilesAfterEnv: ["<rootDir>/src/jest/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/jest.fileMock.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  coveragePathIgnorePatterns: [
    "/src/globals/constants",
    "/src/globals/config.ts",
    "/src/jest",
  ],
  collectCoverage: true,
};
