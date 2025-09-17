import { sequelize } from "../src/config/db.js";

beforeAll(async () => {
  // Ensures database connection is alive before running tests
  try {
    await sequelize.authenticate();
    console.log("Database connected for tests");
  } catch (err) {
    console.error("DB connection failed", err);
  }
});

afterAll(async () => {
  // Close DB pool after all tests
  await sequelize.close();
});
