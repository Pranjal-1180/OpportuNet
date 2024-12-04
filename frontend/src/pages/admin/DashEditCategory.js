
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jobTypeUpdateAction } from "../../redux/actions/jobTypeAction";
import { useTheme } from "@mui/material/styles";

const DashEditCategory = () => {
  const [jobTypeName, setJobTypeName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();

  // Select state from Redux
  const updateJobType = useSelector((state) => state.updateJobType);
  const { loading, error } = updateJobType;

  const {
    signIn: { userInfo },
  } = useSelector((state) => state);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(jobTypeUpdateAction(id, jobTypeName));
    navigate("/admin/category");
  };

  useEffect(() => {
    if (error) {
      console.error("Error updating job type:", error);
    }
  }, [error]);

  // Styles using `theme` for dynamic mode handling
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: theme.palette.mode === "dark" ? "black" : "#edeff0",
      // padding: "20px",
      justifyContent: "flex-start",
    },
    header: {
      color: "#127ce6",
      fontSize: "1.3rem",
      fontWeight: "bold",
      marginBottom: "24px",
      alignSelf: "flex-start",
    },
    form: {
      backgroundColor: "#ffffff",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "600px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    label: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#333",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "0.8rem",
      outline: "none",
      transition: "border-color 0.3s",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      alignItems: "flex-start",
    },
    button: {
      padding: "10px 18px",
      backgroundColor: "#2ecc71",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "0.8rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    loading: {
      color: "#3498db",
      fontSize: "1rem",
      fontWeight: "bold",
    },
    error: {
      color: "#e74c3c",
      fontSize: "1rem",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Edit Job Category</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Category Name:</label>
          <input
            type="text"
            value={jobTypeName}
            onChange={(e) => setJobTypeName(e.target.value)}
            style={styles.input}
            placeholder="Enter category name"
          />
        </div>
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>
            Update
          </button>
          {loading && <p style={styles.loading}>Updating...</p>}
          {error && <p style={styles.error}>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default DashEditCategory;
