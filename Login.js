import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // Email validation
    if (!email) {
      formIsValid = false;
      alert('Email is required is invalid credentials ')
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      alert('invalid email format')
      errors.email = "Invalid email format";
    }

    // Password validation
    if (!password) {
      formIsValid = false;
      alert("password is required")
      errors.password = "Password is required";
    } else if (password.length < 4) {
      formIsValid = false;
      alert('password must be at least 4 characters')
      errors.password = "Password must be at least 4 characters";
    }

    setErrors(errors);
    return formIsValid;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const data = {
        email,
        password,
      };
      axios
        .post("http://localhost:5010/login", data)
        .then((res) => {
          console.log(res.data.token);
          window.localStorage.setItem("jwt-token", res.data.token);
          setToken(localStorage.getItem("jwt-token"));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  if (token) {
    return navigate("/products/home");
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <h2 className="text-center text-primary mb-4">Login</h2>
        <div className="col-md-6 col-lg-4 bg-light p-4 rounded shadow">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 fs-5 fw-medium mt-3 shadow-sm"
            >
              Login
            </button>
          </form>
          <p className="pt-3 text-center">
            Don't have an account?
            <Link to="/signup" className="text-decoration-none text-warning fw-medium ms-2">
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
