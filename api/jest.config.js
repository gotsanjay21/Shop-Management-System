export default {
  testEnvironment: "node",             // simulate Node.js (no DOM needed)
  transform: {},                       // keep plain JS/ESM, no Babel unless needed
  roots: ["<rootDir>/tests"],          // look for test files only inside /tests
  moduleFileExtensions: ["js", "json"],
  verbose: true,                       // show detailed test results
  clearMocks: true,                    // reset mocks between tests
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"], // global setup
  testTimeout: 30000,                  // extend timeout (for DB calls)
};
