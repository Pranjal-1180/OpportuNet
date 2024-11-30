import { useState } from "react";
import { useDispatch } from "react-redux";
import { userSignUpAction } from "../redux/actions/userAction";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100px",
    marginBottom: "100px",
    backgroundColor: "#f5f5f5",
    minHeight: "calc(100vh - 200px)",
  },
  form: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    width: "800px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  icon: {
    fontSize: "40px",
    marginBottom: "10px",
    color: "#3f51b5",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "18px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "18px",
  },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "18px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3f51b5",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "20px",
  },
  linkButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#3f51b5",
    cursor: "pointer",
    fontSize: "18px",
    textDecoration: "underline",
  },
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60px",
    backgroundColor: "#3f51b5",
    zIndex: 1000,
  },
  errorText: {
    color: "red",
    fontSize: "12px",
  },
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        </form>
      </div>
      <div style={styles.footer}>
        <Footer />
      </div>
    </>
  );
};

export default Register;

