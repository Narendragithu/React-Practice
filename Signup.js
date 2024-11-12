import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 4) newErrors.password = "Password must be at least 6 characters long";
    if (password !== confirmpassword) newErrors.confirmpassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = { username, email, password, confirmpassword };

    axios.post("http://localhost:5010/signup", data)
      .then((res) => {
        alert('your Registration successfully') // Show success modal on successful registration
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/"); // Redirect to login or another page
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <h2 className="text-center text-primary mb-4">Sign Up</h2>
        <div className="col-md-6 col-lg-4 bg-light p-4 rounded shadow">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">User name</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <div className="text-danger">{errors.username}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
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
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
              {errors.confirmpassword && <div className="text-danger">{errors.confirmpassword}</div>}
            </div>
            <button type="submit" className="btn btn-primary w-100 fs-5 fw-medium mt-3">Register</button>
          </form>
          <p className="pt-3">
            Already have an account? &nbsp;
            <Link to="/" className="text-warning fs-5 fw-medium">Login Here</Link>
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {/* {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registration Successful</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>Your registration was successful! You can now log in with your new account.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={closeModal}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Signup;
