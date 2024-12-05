import { useState } from "react";
import { useDispatch } from "react-redux";
import { userSignUpAction } from "../redux/actions/userAction";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    education: "",
    percentage: "",
    address: "",
    phone: "",
    userType: "",
    resume: null,
  });

  const styles = {
    navbar : {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000,
      backgroundColor: theme.palette.mode === "dark" ? "#424242" : "#ffffff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "40px",
      // marginBottom: "80px",
      backgroundColor: theme.palette.mode === "dark" ? "#3a3b39" : "#edeff0",
      color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
      minHeight: "calc(100vh - 160px)",
    },
    form: {
      backgroundColor: theme.palette.mode === "dark" ? "#424242" : "#FFFFFF",
      color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
      padding: "20px",
      borderRadius: "6px",
      boxShadow: theme.palette.mode === "dark"
        ? "0px 0px 8px rgba(255, 255, 255, 0.2)"
        : "0px 0px 8px rgba(0, 0, 0, 0.1)",
      width: "600px",
      marginTop:"60px"
    },
    label: {
      color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
      marginBottom: "6px",
      // marginTop:"10px",
      fontSize: "14px",
    },
    input: {
      backgroundColor: theme.palette.mode === "dark" ? "#555555" : "#FFFFFF",
      color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
      border: theme.palette.mode === "dark" ? "1px solid #777777" : "1px solid #ccc",
      padding: "8px",
      borderRadius: "4px",
      width: "100%",
      fontSize: "14px",
    },
    button: {
      backgroundColor: theme.palette.mode === "dark" ? "#2196f3" : "#3f51b5",
      color: theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF",
      border: "none",
      padding: "10px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      width: "100%",
      marginBottom: "10px",
    },
    header : {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px", 
      marginTop:"10px"
    },
    errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "4px",
  },
    
  };

 
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First Name is required";
    if (!formData.lastName) tempErrors.lastName = "Last Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";
    if (!formData.phone) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (!formData.address) tempErrors.address = "Address is required";
    if (!formData.userType) tempErrors.userType = "User type is required";

    if (formData.userType === "jobSeeker") {
      if (!formData.education)
        tempErrors.education = "Education is required for job seekers";
      if (!formData.percentage)
        tempErrors.percentage = "Percentage is required for job seekers";
      if (!formData.resume)
        tempErrors.resume = "Resume upload is required for job seekers";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResumeChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const userData = {
        ...formData,
        role: formData.userType === "jobSeeker" ? 0 : 1,
      };
      dispatch(userSignUpAction(userData));
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        education: "",
        percentage: "",
        address: "",
        phone: "",
        userType: "",
        resume: null,
      });
      navigate("/");
    }
  };

  return (
    <>
      <div style={styles.navbar}>
        <Navbar />
      </div>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.header}>
            <div style={styles.icon}>🔒</div>
            <h2>Register</h2>
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="userType" style={styles.label}>
              Are you seeking a job or searching for a candidate?
            </label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Select an option</option>
              <option value="jobSeeker">Seeking a Job</option>
              <option value="employer">Searching for Candidate</option>
            </select>
            {errors.userType && (
              <span style={styles.errorText}>{errors.userType}</span>
            )}
          </div>
          {formData.userType === "jobSeeker" && (
            <>
              <div style={styles.inputGroup}>
                <label htmlFor="education" style={styles.label}>
                  Education
                </label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.education && (
                  <span style={styles.errorText}>{errors.education}</span>
                )}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="percentage" style={styles.label}>
                  Percentage (%)
                </label>
                <input
                  type="number"
                  id="percentage"
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.percentage && (
                  <span style={styles.errorText}>{errors.percentage}</span>
                )}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="resume" style={styles.label}>
                  Upload Resume
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleResumeChange}
                  style={styles.input}
                />
                {errors.resume && (
                  <span style={styles.errorText}>{errors.resume}</span>
                )}
              </div>
            </>
          )}

          <div style={styles.inputGroup}>
            <label htmlFor="firstName" style={styles.label}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.firstName && (
              <span style={styles.errorText}>{errors.firstName}</span>
            )}
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="lastName" style={styles.label}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.lastName && (
              <span style={styles.errorText}>{errors.lastName}</span>
            )}
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.email && (
              <span style={styles.errorText}>{errors.email}</span>
            )}
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.password && (
              <span style={styles.errorText}>{errors.password}</span>
            )}
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="phone" style={styles.label}>
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.phone && (
              <span style={styles.errorText}>{errors.phone}</span>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="address" style={styles.label}>
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={{ ...styles.input, height: "100px" }}
            />
            {errors.address && (
              <span style={styles.errorText}>{errors.address}</span>
            )}
          </div>
          <button type="submit" style={styles.button}>
            Register
          </button>
          <div style={{textAlign: "center",fontSize:"14px",}}>
                Already registered?{' '}
                <span 
                    onClick={() => navigate('/login')} 
                    style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    Login
                </span>
            
          </div>
        </form>
      </div>
      <div style={styles.footer}>
        <Footer />
      </div>
    </>
  );
};

export default Register;
