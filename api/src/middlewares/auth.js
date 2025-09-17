// src/middlewares/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const requireAuth = (req, res, next) => {
  // console.log(req.body);
  const authHeader = req.headers["authorization"];
  const token = authHeader && req.headers.authorization;
  // console.error('the console');
  if (!token) return res.status(401).json({ message: `No token provided` });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user; // attach decoded user payload
    next();
  });
};

export const requireRole = (role) => (req, res, next) => {
  if (!req.user || !req.user.roles?.includes(role)) {
    return res.status(403).json({ message: "Forbidden: insufficient permissions" });
  }
  next();
};
