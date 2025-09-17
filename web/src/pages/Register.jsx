import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../lib/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(e.target.value)
}
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ ...form});
      alert("Registration successful!");
      // console.log(res);
      localStorage.setItem("token", JSON.stringify(res.data.user));
      navigate("/products");
    } catch (err) {
      alert("Registration failed.");
      console.log(`Error : ${err}`)
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
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
          </div>
          <button className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
}
