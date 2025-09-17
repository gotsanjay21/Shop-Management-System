import axios from "axios";

// Create a reusable axios instance
const api = axios.create({
  baseURL: "/api",           // proxy → Express backend
  withCredentials: true,     // send/receive cookies (JWT cookie)
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Auth endpoints ---
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const logoutUser = () => api.post("/auth/logout");

// --- Products ---
export const getProducts = () => api.get("/products");
export const getProduct = (id) => api.get(`/products/${id}`);

// --- Orders ---
export const getOrders = () => api.get("/orders");
export const createOrder = (data) => api.post("/orders", data);

// --- Analytics ---
export const getTopProducts = (years = 5) =>
  api.get(`/analytics/top-products?years=${years}`);

// Export axios instance (in case you need custom calls)
export default api;
