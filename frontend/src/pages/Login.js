import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { userSignInAction } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userInfo } = useSelector((state) => state.signIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      if (userInfo.role === 1) {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }
  }, [isAuthenticated, navigate, userInfo]);

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Enter a valid email";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password should be of minimum 8 characters length";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(userSignInAction({ email, password }));
    setEmail("");
    setPassword("");
    setErrors({});
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "500px",
            height: "380px",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ textAlign: "center", fontSize: "26px" }}>Log In</h2>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              marginBottom: "15px",
              padding: "10px",
              width: "100%",
              height: "40px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize:"16px"
            }}
          />
          {errors.email && (
            <span style={{ color: "red", marginBottom: "10px" }}>
              {errors.email}
            </span>
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              marginBottom: "15px",
              padding: "10px",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "4px",
              height: "40px",
              fontSize:"16px"
            }}
          />
          {errors.password && (
            <span style={{ color: "red", marginBottom: "10px" }}>
              {errors.password}
            </span>
          )}
          <button
            type="submit"
            style={{
              padding: "10px 15px",
              backgroundColor: "#3f51b5",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "15px",
              marginTop: "15px",
              fontSize: "18px",
            }}
          >
            Log In
          </button>

          {/* New User Registration Option */}
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "18px" }}>New User? </span>
            <button
              type="button"
              onClick={() => navigate("/register")}
              style={{
                background: "none",
                border: "none",
                color: "#3f51b5",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "18px",
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LogIn;
