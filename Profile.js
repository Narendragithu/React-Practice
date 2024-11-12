import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  let [data, setData] = useState("");

  let token = window.localStorage.getItem("jwt-token");
  console.log(token);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5010/profile", {
        headers: {
          myToken: token,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  let logout = () => {
    localStorage.removeItem("jwt-token");
    navigate("/home");
  };

  if (!token) {
    return navigate("/");
  }

  return (
    <div className="container-fluid bg-dark text-white vh-100 pt-5">
      <Link to="/dashboard">
        <p className="text-info">Go to Dashboard</p>
      </Link>

      <h2 className="text-center">My Profile</h2>
      <div className="row">
        <div className="col-6 m-auto bg-warning p-4 text-dark fs-3">
          <p>Name:{data.username}</p>
          <p>Email:{data.email}</p>
        </div>
        <div className="col-12 text-center mt-3">
          <button className="btn btn-danger fs-5 " onClick={logout}>
            logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;