import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import BackButton from './BackButton';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function CreateProduct() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [k, setK] = useState({
    name: '',
    qualification: '',
    age: '',
    address: '',
    courses: '',
    gender: '',
  });

  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name: k.name,
      qualification: k.qualification,
      age: k.age,
      address: k.address,
      courses: k.courses,
      gender: k.gender,
    };
    setLoading(true);
    axios
      .post('http://localhost:5010/students', data)
      .then((res) => {
        setLoading(false);
        enqueueSnackbar('Student added successfully!', { variant: 'success' });
        navigate('/products/home');
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar('Error occurred!', { variant: 'error' });
      });
  };

  return (
    <div className="bg-light vh-100 d-flex justify-content-center align-items-center">
      <div className="container w-50 shadow-lg rounded bg-white p-4">
        <div className="text-start mb-4">
          <BackButton />
        </div>

        <div className="p-5 border border-2 border-info rounded-3 bg-light text-dark">
          {loading && <Spinner />}

          <h3 className="text-center mb-4 fw-bold text-primary">Student Registration Form</h3>

          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">Student Name</label>
              <input
                type="text"
                id="name"
                className="form-control border-primary"
                value={k.name}
                onChange={(e) => setK({ ...k, name: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="qualification">Qualification</label>
              <input
                type="text"
                id="qualification"
                className="form-control border-primary"
                value={k.qualification}
                onChange={(e) => setK({ ...k, qualification: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                className="form-control border-primary"
                value={k.age}
                onChange={(e) => setK({ ...k, age: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="address">Address</label>
              <textarea
                cols={10}
                rows={5}
                id="address"
                className="form-control border-primary"
                value={k.address}
                onChange={(e) => setK({ ...k, address: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="courses">Courses</label>
              <select
                id="courses"
                className="form-select border-primary"
                onChange={(e) => setK({ ...k, courses: e.target.value })}
              >
                <option value="" disabled selected>Choose a course</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="BOOTSTRAP">BOOTSTRAP</option>
                <option value="REACT">REACT</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Gender</label>
              <div className="d-flex">
                <div className="form-check me-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    value="Male"
                    onChange={(e) => setK({ ...k, gender: e.target.value })}
                  />
                  <label className="form-check-label" htmlFor="male">Male</label>
                </div>
                <div className="form-check me-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="Female"
                    onChange={(e) => setK({ ...k, gender: e.target.value })}
                  />
                  <label className="form-check-label" htmlFor="female">Female</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="others"
                    value="Others"
                    onChange={(e) => setK({ ...k, gender: e.target.value })}
                  />
                  <label className="form-check-label" htmlFor="others">Others</label>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-outline-primary mt-3 px-5 fw-bold">
                Save Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
