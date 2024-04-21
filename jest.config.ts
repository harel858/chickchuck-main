import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  // [...]
  moduleNameMapper: {
    "^@api/(.*)$": "<rootDir>/pages/api/$1",
    "^@lib/(.*)$": "<rootDir>/lib/$1",
    "^@ui/(.*)$": "<rootDir>components/ui/$1",
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@navbar/(.*)$": "<rootDir>/app/(navbar)/$1",
    "^@actions/(.*)$": "<rootDir>/actions",
  },
};

export default jestConfig;
