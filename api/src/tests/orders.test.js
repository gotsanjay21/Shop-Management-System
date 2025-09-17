import request from "supertest";
import app from "../src/app.js";
import { sequelize } from "../src/config/db.js";
import { User } from "../src/modules/users/user.model.js";
import { Product } from "../src/modules/products/product.model.js";
import bcrypt from "bcrypt";

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const passwordHash = await bcrypt.hash("123456", 10);
  const user = await User.create({ email: "buyer@example.com", passwordHash, name: "Buyer" });

  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({ email: "buyer@example.com", password: "123456" });
  token = loginRes.body.token;

  await Product.create({ name: "Phone", category: "Electronics", price: 500, stock: 10 });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Orders API", () => {
  it("should create an order", async () => {
    const product = await Product.findOne();

    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ items: [{ productId: product.id, qty: 2 }] });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Order created");
  });

  it("should get user orders", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
