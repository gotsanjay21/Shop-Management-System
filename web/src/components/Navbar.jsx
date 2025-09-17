import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ProductApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {token ? (
            <>
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/analytics">
                    Analytics
                  </Link>
                </li>
              </ul>
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login <CiLogin/>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li> */}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
