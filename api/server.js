// server.js
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./src/app.js";
import { sequelize } from "./src/config/db.js"; // Sequelize instance
import "./src/models/index.js"; 
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Test DB connection & sync models before starting server
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Run migrations/sync (disable force:true in prod!)
    await sequelize.sync({ alter: true });
    console.log("Models synced with database.");

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
})();
