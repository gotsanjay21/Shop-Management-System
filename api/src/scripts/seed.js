import "dotenv/config";
import bcrypt from "bcrypt";
import { sequelize } from "../config/db.js";
import "../models/index.js";
import { User } from "../modules/users/user.model.js";
import { Product } from "../modules/products/product.model.js";
import {Order} from '../modules/orders/order.model.js';
import {OrderItem} from '../modules/orders/orderItem.model.js';

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await sequelize.sync({ alter: true });

    const passwordHash = await bcrypt.hash("Admin@123", 10);
    const [admin] = await User.findOrCreate({
      where: { email: "admin@example.com" },
      defaults: { email: "admin@example.com", passwordHash, name: "Admin", roles: ["admin"] },
    });

    // Sample data for the 'users' table
await User.bulkCreate(
  [
    { id: 1, email: "john.doe@example.com", passwordHash: "hashedpassword1", name: "John Doe", roles: ["customer"], createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-15T10:00:00Z" },
    { id: 2, email: "jane.smith@example.com", passwordHash: "hashedpassword2", name: "Jane Smith", roles: ["customer"], createdAt: "2024-02-20T11:30:00Z", updatedAt: "2024-02-20T11:30:00Z" },
    { id: 4, email: "test.user@example.com", passwordHash: "hashedpassword4", name: "Test User", roles: ["customer"], createdAt: "2024-04-05T13:45:00Z", updatedAt: "2024-04-05T13:45:00Z" },
    { id: 5, email: "guest.user@example.com", passwordHash: "hashedpassword5", name: "Guest User", roles: ["customer"], createdAt: "2024-05-10T14:15:00Z", updatedAt: "2024-05-10T14:15:00Z" },
    { id: 6, email: "customer1@example.com", passwordHash: "hashedpassword6", name: "Customer One", roles: ["customer"], createdAt: "2023-01-10T09:00:00Z", updatedAt: "2023-01-10T09:00:00Z" },
    { id: 7, email: "customer2@example.com", passwordHash: "hashedpassword7", name: "Customer Two", roles: ["customer"], createdAt: "2023-02-15T10:30:00Z", updatedAt: "2023-02-15T10:30:00Z" },
    { id: 8, email: "customer3@example.com", passwordHash: "hashedpassword8", name: "Customer Three", roles: ["customer"], createdAt: "2023-03-20T11:00:00Z", updatedAt: "2023-03-20T11:00:00Z" },
    { id: 9, email: "customer4@example.com", passwordHash: "hashedpassword9", name: "Customer Four", roles: ["customer"], createdAt: "2023-04-25T12:00:00Z", updatedAt: "2023-04-25T12:00:00Z" },
    { id: 10, email: "customer5@example.com", passwordHash: "hashedpassword10", name: "Customer Five", roles: ["customer"], createdAt: "2023-05-30T13:00:00Z", updatedAt: "2023-05-30T13:00:00Z" },
  ],
  { ignoreDuplicates: true }
);

// Sample data for the 'products' table
await Product.bulkCreate(
  [
    { id: 1, name: "Laptop Pro", sku: "LTP-001", price: 1299.99, category: "Electronics", stock: 20, createdAt: "2024-01-01T08:00:00Z", updatedAt: "2024-01-01T08:00:00Z" },
    { id: 2, name: "Phone Max", sku: "PHN-002", price: 899.0, category: "Electronics", stock: 50, createdAt: "2024-01-05T09:00:00Z", updatedAt: "2024-01-05T09:00:00Z" },
    { id: 3, name: "Desk Chair", sku: "CHR-003", price: 149.5, category: "Furniture", stock: 35, createdAt: "2024-01-10T10:00:00Z", updatedAt: "2024-01-10T10:00:00Z" },
    { id: 4, name: "Headphones Max", sku: "HD-004", price: 199.99, category: "Electronics", stock: 75, createdAt: "2024-01-15T11:00:00Z", updatedAt: "2024-01-15T11:00:00Z" },
    { id: 5, name: "Smartwatch", sku: "SW-005", price: 249.99, category: "Electronics", stock: 40, createdAt: "2024-01-20T12:00:00Z", updatedAt: "2024-01-20T12:00:00Z" },
    { id: 6, name: "Coffee Maker", sku: "CF-006", price: 79.99, category: "Home Appliances", stock: 60, createdAt: "2024-02-01T13:00:00Z", updatedAt: "2024-02-01T13:00:00Z" },
    { id: 7, name: "Wireless Mouse", sku: "MSE-007", price: 25.50, category: "Electronics", stock: 100, createdAt: "2024-02-05T14:00:00Z", updatedAt: "2024-02-05T14:00:00Z" },
    { id: 8, name: "Gaming Keyboard", sku: "KB-008", price: 89.99, category: "Electronics", stock: 30, createdAt: "2024-02-10T15:00:00Z", updatedAt: "2024-02-10T15:00:00Z" },
    { id: 9, name: "4K Monitor", sku: "MON-009", price: 349.00, category: "Electronics", stock: 25, createdAt: "2024-02-15T16:00:00Z", updatedAt: "2024-02-15T16:00:00Z" },
    { id: 10, name: "External Hard Drive", sku: "HDD-010", price: 65.00, category: "Electronics", stock: 55, createdAt: "2024-02-20T17:00:00Z", updatedAt: "2024-02-20T17:00:00Z" },
  ],
  { ignoreDuplicates: true }
);

// Sample data for the 'orders' table
await Order.bulkCreate(
  [
    { id: 1, userId: 1, total: 1299.99, status: "paid", createdAt: "2024-01-16T10:00:00Z", updatedAt: "2024-01-16T10:00:00Z" },
    { id: 2, userId: 2, total: 1798.0, status: "shipped", createdAt: "2024-02-21T11:30:00Z", updatedAt: "2024-02-22T11:30:00Z" },
    { id: 3, userId: 4, total: 199.99, status: "pending", createdAt: "2024-04-06T13:45:00Z", updatedAt: "2024-04-06T13:45:00Z" },
    { id: 4, userId: 1, total: 249.99, status: "paid", createdAt: "2024-05-11T14:15:00Z", updatedAt: "2024-05-11T14:15:00Z" },
    { id: 5, userId: 5, total: 79.99, status: "shipped", createdAt: "2024-05-15T15:00:00Z", updatedAt: "2024-05-16T15:00:00Z" },
  ],
  { ignoreDuplicates: true }
);

// Sample data for the 'order_items' table
await OrderItem.bulkCreate(
  [
    { id: 1, orderId: 1, productId: 1, qty: 1, price: 1299.99 },
    { id: 2, orderId: 2, productId: 2, qty: 2, price: 899.0 },
    { id: 3, orderId: 3, productId: 4, qty: 1, price: 199.99 },
    { id: 4, orderId: 4, productId: 5, qty: 1, price: 249.99 },
    { id: 5, orderId: 5, productId: 6, qty: 1, price: 79.99 },
    { id: 6, orderId: 2, productId: 3, qty: 1, price: 149.50 },
    { id: 7, orderId: 1, productId: 7, qty: 2, price: 25.50 },
  ],
  { ignoreDuplicates: true }
);

    console.log("Seed complete. Admin login: admin@example.com / Admin@123");
    process.exit(0);
  } catch (e) {
    console.error("Seed failed", e);
    process.exit(1);
  }
})();
