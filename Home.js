// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Spinner from '../components/Spinner';
// import './Home.css'; // Import the new CSS file

// function Home() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchName, setSearchName] = useState('');
//   const [searchCourse, setSearchCourse] = useState('');
//   const [address, setAddress] = useState('');
//   const [gender, setGender] = useState('');

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get('http://localhost:5010/students')
//       .then((res) => {
//         setProducts(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className='home-container'>
//       <div className='container'>
//         <h2 className='text-center my-4'>Student List</h2>
//         <div className='filter-section'>
//           <div className='filter-item'>
//             <label htmlFor='name-search'>Search by Name</label>
//             <input
//               id='name-search'
//               type='text'
//               onChange={(e) => setSearchName(e.target.value)}
//               placeholder='Enter name'
//               className='form-control'
//             />
//           </div>

//           <div className='filter-item'>
//             <label htmlFor='address-filter'>Filter by Address</label>
//             <input
//               id='address-filter'
//               type='text'
//               onChange={(e) => setAddress(e.target.value)}
//               placeholder='Enter address'
//               className='form-control'
//             />
//           </div>

//           <div className='filter-item'>
//             <label htmlFor='gender-filter'>Filter by Gender</label>
//             <select
//               id='gender-filter'
//               onChange={(e) => setGender(e.target.value)}
//               className='form-select'
//             >
//               <option value=''>All Genders</option>
//               <option value='Male'>Male</option>
//               <option value='Female'>Female</option>
//               <option value='Other'>Other</option>
//             </select>
//           </div>

//           <div className='filter-item'>
//             <label htmlFor='course-filter'>Filter by Course Code</label>
//             <input
//               id='course-filter'
//               type='text'
//               onChange={(e) => setSearchCourse(e.target.value)}
//               placeholder='Enter course code'
//               className='form-control'
//             />
//           </div>

//           <div className='filter-item add-button'>
//             <Link to={'/products/create'} className='btn btn-primary'>
//               <i className='bi bi-plus-square me-2'></i> Add Student
//             </Link>
//           </div>
//         </div>

//         {loading ? (
//           <div className='spinner-container'>
//             <Spinner />
//           </div>
//         ) : (
//           <div className='table-responsive'>
//             <table className='table table-striped table-hover'>
//               <thead className='table-dark'>
//                 <tr>
//                   <th>No</th>
//                   <th>Name</th>
//                   <th>Qualification</th>
//                   <th>Age</th>
//                   <th>Address</th>
//                   <th>Courses</th>
//                   <th>Gender</th>
//                   <th>Operations</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products
//                   .filter((item) =>
//                     item.name.toLowerCase().includes(searchName.toLowerCase())
//                   )
//                   .filter((item) =>
//                     item.address.toLowerCase().includes(address.toLowerCase())
//                   )
//                   .filter((item) =>
//                     item.courses
//                       .toLowerCase()
//                       .includes(searchCourse.toLowerCase())
//                   )
//                   .filter((item) => gender === '' || item.gender === gender)
//                   .map((product, index) => {
//                     return (
//                       <tr key={product._id}>
//                         <td>{index + 1}</td>
//                         <td>{product.name}</td>
//                         <td>{product.qualification}</td>
//                         <td>{product.age}</td>
//                         <td>{product.address}</td>
//                         <td>{product.courses}</td>
//                         <td>{product.gender}</td>
//                         <td>
//                           <div className='operation-icons'>
//                             <Link
//                               to={`/products/showDetails/${product._id}`}
//                               className='text-info me-3'
//                             >
//                               <i className='bi bi-info-circle-fill'></i>
//                             </Link>
//                             <Link
//                               to={`/products/edit/${product._id}`}
//                               className='text-warning me-3'
//                             >
//                               <i className='bi bi-pencil-square'></i>
//                             </Link>
//                             <Link
//                               to={`/products/delete/${product._id}`}
//                               className='text-danger'
//                             >
//                               <i className='bi bi-trash-fill'></i>
//                             </Link>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Home;








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchCourse, setSearchCourse] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5010/students')
      .then((res) => {
        setProducts(res.data);
        const uniqueCourses = [...new Set(res.data.map(item => item.courses))];
        setCourses(uniqueCourses);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesAddress = item.address.toLowerCase().includes(address.toLowerCase());
    const matchesCourse = searchCourse === '' || item.courses.toLowerCase() === searchCourse.toLowerCase();
    const matchesGender = gender === '' || item.gender === gender;

    return matchesName && matchesAddress && matchesCourse && matchesGender;
  });

  return (
    
    
    <div className='home-container py-5'>
      <img
          className="shadow-lg  mx-auto d-block mb-4 img-fluid"
          style={{ height: '250px', width: '450px' }}
          src="https://valistus.in/wp-content/uploads/2024/01/Valistus-8-1080x675.jpg"
          alt="Banner"
        />
      <div className='container'>
        <h2 className='text-center my-4 text-primary'>Student List</h2>
        
        <div className='row g-3 mb-4'>
          <div className='col-md-3'>
            <label htmlFor='name-search' className='form-label'>Search by Name</label>
            <input
              id='name-search'
              type='text'
              onChange={(e) => setSearchName(e.target.value)}
              placeholder='Enter name'
              className='form-control'
            />
          </div>

          <div className='col-md-3'>
            <label htmlFor='address-filter' className='form-label'>Filter by Address</label>
            <input
              id='address-filter'
              type='text'
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Enter address'
              className='form-control'
            />
          </div>

          <div className='col-md-3'>
            <label htmlFor='gender-filter' className='form-label'>Filter by Gender</label>
            <select
              id='gender-filter'
              onChange={(e) => setGender(e.target.value)}
              className='form-select'
            >
              <option value=''>All Genders</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
          </div>

          <div className='col-md-3'>
            <label htmlFor='course-filter' className='form-label'>Filter by Course</label>
            <select
              id='course-filter'
              onChange={(e) => setSearchCourse(e.target.value)}
              className='form-select'
            >
              <option value=''>All Courses</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))}
            </select>
          </div>

          <div className='col-md-3'>
            <Link to={'/products/create'} className='btn btn-primary w-100 mt-3'>
              <i className='bi bi-plus-square me-2'></i> Add Student
            </Link>
          </div>
        </div>

        {loading ? (
          <div className='d-flex justify-content-center my-5'>
            <Spinner />
          </div>
        ) : (
          <div className='table-responsive'>
            <table className='table table-striped table-hover'>
              <thead className='table-dark'>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Qualification</th>
                  <th>Age</th>
                  <th>Address</th>
                  <th>Courses</th>
                  <th>Gender</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.qualification}</td>
                    <td>{product.age}</td>
                    <td>{product.address}</td>
                    <td>{product.courses}</td>
                    <td>{product.gender}</td>
                    <td>
                      <div className='d-flex'>
                        <Link to={`/products/showDetails/${product._id}`} className='btn btn-info btn-sm me-2'>
                          <i className='bi bi-info-circle-fill'></i> Details
                        </Link>
                        <Link to={`/products/edit/${product._id}`} className='btn btn-warning btn-sm me-2'>
                          <i className='bi bi-pencil-square'></i> Edit
                        </Link>
                        <Link to={`/products/delete/${product._id}`} className='btn btn-danger btn-sm'>
                          <i className='bi bi-trash-fill'></i> Delete
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className='d-flex justify-content-end mt-4 rounded '>
          <Link to="/" className="btn btn-primary text-white ">
          <i class="bi bi-power"></i>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

