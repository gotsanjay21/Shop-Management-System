import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoSignIn } from "react-icons/go";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", form);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <div className="mt-4" >
              <center><p>if you don't have a account <Link style={{textDecoration:'none'}} to="/register">Register <GoSignIn/></Link> </p>
</center>
            </div>
          </div>
          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
