import type {Config} from 'jest';
import nextJest from 'next/jest.js';
import 'ts-node/register';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@apollo/client)/)', // Agrega excepciones aquí
  ],
};

export default createJestConfig(config);
