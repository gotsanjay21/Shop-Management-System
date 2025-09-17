import request from "supertest";
import app from "../src/app.js";
import { sequelize } from "../src/config/db.js";
import { Product } from "../src/modules/products/product.model.js";

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Product.create({ name: "Laptop", category: "Electronics", price: 1000, stock: 5 });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Products API", () => {
  it("should list products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("should fetch product by id", async () => {
    const product = await Product.findOne();
    const res = await request(app).get(`/api/products/${product.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Laptop");
  });
});

