module.exports = {
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testRunner: "jest-jasmine2",
  globals: {
    transform: {
      "*.ts": ["ts-jest", { tsconfig: "tsconfig.json" }],
    },
  },
  testMatch: ["**/specs/**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFiles: ["./jest-setup.ts"],
};
