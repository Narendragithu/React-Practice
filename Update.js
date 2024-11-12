import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';
import BackButton from '../components/BackButton';

function Update() {
  var { id } = useParams();
  var navigate = useNavigate();
  var { enqueueSnackbar } = useSnackbar();

  var [name, setName] = useState('');
  var [qualification, setQualification] = useState('');
  var [age, setAge] = useState('');
  var [address, setAddress] = useState('');
  var [loading, setLoading] = useState(false);
  var [gender, setGender] = useState('');
  var [courses, setCourses] = useState(''); // holds the selected course
  var [availableCourses, setAvailableCourses] = useState(['HTML','CSS','BOOTSTRAP','REACT']); // holds available course options

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5010/students/${id}`)
      .then((res) => {
        console.log(res);
        setName(res.data.name);
        setQualification(res.data.qualification);
        setAge(res.data.age);
        setAddress(res.data.address);
        setGender(res.data.gender);
        setCourses(res.data.courses);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    // Fetch available courses (example API call)
    axios
      .get('http://localhost:5010/courses') // endpoint for fetching course options
      .then((res) => {
        setAvailableCourses(res.data); // assuming the response data contains a list of courses
      })
      .catch((error) => console.error('Error fetching courses:', error));
  }, [id]);

  var submitHandler = (e) => {
    e.preventDefault();
    var data = {
      name,
      qualification,
      age,
      address,
      gender,
      courses, // include the selected course in the data
    };
    setLoading(true);
    axios
      .put(`http://localhost:5010/students/${id}`, data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        enqueueSnackbar('Student updated successfully', { variant: 'success' });
        navigate('/products/home');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
      });
  };

  return (
    <div>
      <div className='text-start ms-4 mt-4'>
        <BackButton />
      </div>
      <div className='w-50 m-auto'>
        <div className='row my-5 border border-2 border-info p-4 bg-light text-dark'>
          {loading ? <Spinner /> : ''}
          <div className='col-6 m-auto'>
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor=''>Student Name</label>
                <input
                  type='text'
                  className='form-control border border-2 border-dark'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor=''>Student Qualification</label>
                <input
                  type='text'
                  className='form-control border border-2 border-dark'
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor=''>Student Age</label>
                <input
                  type='text'
                  className='form-control border border-2 border-dark'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor=''>Student Address</label>
                <textarea
                  className='form-control border border-2 border-dark'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor=''>Student Courses</label>
                <select
                  className='form-control border border-2 border-dark'
                  value={courses}
                  onChange={(e) => setCourses(e.target.value)}
                >
                  <option value='{courses}'>Select a Course</option>
                  {availableCourses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor=''>Student Gender</label>
                <div className='d-flex m-3'>
                  <label htmlFor=''>Gender:</label>
                  <div className='d-flex'>
                    <div className='form-check me-3'>
                      <input
                        className='form-check-input p-1'
                        type='radio'
                        name='gender'
                        id='male'
                        value='Male'
                        checked={gender === 'Male'}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label className='form-check-label' htmlFor='male'>
                        MALE
                      </label>
                    </div>
                    <div className='form-check me-3'>
                      <input
                        className='form-check-input p-1'
                        type='radio'
                        name='gender'
                        id='female'
                        value='Female'
                        checked={gender === 'Female'}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label className='form-check-label' htmlFor='female'>
                        FEMALE
                      </label>
                    </div>

                    <div className='form-check'>
                      <input
                        className='form-check-input p-1'
                        type='radio'
                        name='gender'
                        id='others'
                        value='Others'
                        checked={gender === 'Others'}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label className='form-check-label' htmlFor='others'>
                        others
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <button type='submit' className='btn btn-primary mt-3 fw-bold'>
                Save Student
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;
