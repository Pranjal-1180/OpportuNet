
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userSignUpAction } from '../redux/actions/userAction';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    education: '',
    percentage: '',
    address: '',
    phone:'',
    userType: '' , // New field for user type
    resume: null
  });

  // State for errors
  const [errors, setErrors] = useState({});

  // Form validation
  const validate = () => {
    let tempErrors = {};

    if (!formData.firstName || formData.firstName.length < 3) {
      tempErrors.firstName = 'First Name should be at least 3 characters long';
    }
    if (!formData.lastName || formData.lastName.length < 3) {
      tempErrors.lastName = 'Last Name should be at least 3 characters long';
    }
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      tempErrors.email = 'Enter a valid email';
    }
    if (!formData.password || formData.password.length < 8) {
      tempErrors.password = 'Password should be at least 8 characters long';
    }
    if (!formData.education) {
      tempErrors.education = 'Education is required';
    }
    if (!formData.percentage || isNaN(formData.percentage)) {
      tempErrors.percentage = 'Enter a valid percentage';
    }
    if (!formData.address || formData.address.length < 5) {
      tempErrors.address = 'Address should be at least 5 characters long';
    }
    if (!formData.phone || formData.phone.length < 10) {
      tempErrors.phone = 'Phone number should be 10 digits';
    }
    if (!formData.userType) {
      tempErrors.userType = 'Please select if you are seeking a job or searching for an employee';
    }
    if (formData.userType === "jobSeeker" && !formData.resume) {
      tempErrors.resume = 'Please upload your resume';
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0; // Return true if no errors
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

   // Handle resume file change
   const handleResumeChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]  // Set the selected resume file
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const userData = { ...formData, role: formData.userType === "jobSeeker" ? 0 : 1 }; // Assign role
      dispatch(userSignUpAction(userData));
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        education: '',
        percentage: '',
        address: '',
        phone:'',
         userType: '',
         resume: null 
      });
      navigate('/');
    }
  };

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000 // Ensure navbar stays above other content
      }}>
        <Navbar />
      </div>
      
      <div style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: '100px', // Space from the navbar
        marginBottom: '100px', // Space before the footer
        backgroundColor: '#f5f5f5',
        minHeight: 'calc(100vh - 200px)' // Full height minus navbar and footer height
      }}>
        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          width: '800px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              fontSize: '40px',
              marginBottom: '10px',
              color: '#3f51b5'
            }}>🔒</div> 
            <h2>Register</h2>
          </div>

          {/* Job Seeker or Employer Dropdown */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="userType" style={{ display: 'block', marginBottom: '5px' }}>Are you seeking a job or searching for an employee?</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            >
              <option value="">Select an option</option>
              <option value="jobSeeker">Seeking a Job</option>
              <option value="employer">Searching for Employee</option>
            </select>
            {errors.userType && <span style={{ color: 'red', fontSize: '12px' }}>{errors.userType}</span>}
          </div>

          {/* Conditional Resume Upload */}
          {formData.userType === "jobSeeker" && (
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="resume" style={{ display: 'block', marginBottom: '5px' }}>Upload Resume</label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleResumeChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="firstName" style={{ display: 'block', marginBottom: '5px' }}>First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            {errors.firstName && <span style={{ color: 'red', fontSize: '12px' }}>{errors.firstName}</span>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="lastName" style={{ display: 'block', marginBottom: '5px' }}>Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            {errors.lastName && <span style={{ color: 'red', fontSize: '12px' }}>{errors.lastName}</span>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="education" style={{ display: 'block', marginBottom: '5px' }}>Education</label>
            <input
              type="text"
              id="education"
              name="education"
              placeholder="Education"
              value={formData.education}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            {errors.education && <span style={{ color: 'red', fontSize: '12px' }}>{errors.education}</span>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="percentage" style={{ display: 'block', marginBottom: '5px' }}>Percentage</label>
            <input
              type="text"
              id="percentage"
              name="percentage"
              placeholder="Percentage"
              value={formData.percentage}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            {errors.percentage && <span style={{ color: 'red', fontSize: '12px' }}>{errors.percentage}</span>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="address" style={{ display: 'block', marginBottom: '5px' }}>Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            {errors.address && <span style={{ color: 'red', fontSize: '12px' }}>{errors.address}</span>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px' }}>Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            {errors.phone && <span style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</span>}
          </div>

           

          <button type="submit" style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#3f51b5',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            Register
          </button>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button type="button" style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#3f51b5',
              cursor: 'pointer',
              fontSize: '14px',
              textDecoration: 'underline'
            }} onClick={() => navigate('/login')}>
              Already have an account? Log in
            </button>
          </div>
        </form>
      </div>
      
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: '#3f51b5',
        zIndex: 1000
      }}>
        <Footer />
      </div>
    </>
  );
};

export default Register;
