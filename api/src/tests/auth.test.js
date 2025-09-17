import request from "supertest";
import app from "../src/app.js";
import { sequelize } from "../src/config/db.js";
import { User } from "../src/modules/users/user.model.js";
import bcrypt from "bcrypt";

beforeAll(async () => {
  await sequelize.sync({ force: true });
  const passwordHash = await bcrypt.hash("password123", 10);
  await User.create({ email: "test@example.com", passwordHash, name: "Test User" });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Auth API", () => {
  it("should login with valid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("should reject invalid login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "wrongpass" });

    expect(res.statusCode).toBe(401);
  });
});

