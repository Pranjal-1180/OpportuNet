import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jobTypeLoadAction } from "../../redux/actions/jobTypeAction";
import {
  editSingleJobAction,
  jobLoadSingleAction,
} from "../../redux/actions/jobAction";
import { useNavigate, useParams } from "react-router-dom";
import { EDIT_JOB_RESET } from "../../redux/constants/jobconstant";
import { useTheme } from "@mui/material/styles";

// Static styles that don't depend on the theme
const baseStyles = {
  formContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "3rem",
    backgroundColor: "#f9f9f9",
  },
  formTitle: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#1976d2",
    marginBottom: "1.5rem",
  },
  formField: {
    width: "100%",
    padding: "12px",
    marginBottom: "1.2rem",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    backgroundColor: "#fefefe",
    boxShadow: "inset 0px 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "border-color 0.3s ease",
  },
  formButton: {
    padding: "12px 20px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    transition: "background-color 0.3s ease",
    marginTop: "1rem",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    marginBottom: "1rem",
  },
};

const DashEditJob = () => {
  const theme = useTheme(); // Access the theme object
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    available: "",
    jobType: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const { jobType } = useSelector((state) => state.jobTypeAll);
  const { singleJob } = useSelector((state) => state.singleJob);
  const { success } = useSelector((state) => state.updateJob);

  // Dynamic styles based on the theme
  const dynamicStyles = {
    formStyle: {
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "800px",
      backgroundColor: theme.palette.mode === "dark" ? "#333" : "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  };

  useEffect(() => {
    dispatch(jobTypeLoadAction());
    if (id) {
      dispatch(jobLoadSingleAction(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singleJob) {
      setFormValues({
        _id: singleJob._id,
        title: singleJob.title,
        description: singleJob.description,
        salary: singleJob.salary,
        location: singleJob.location,
        available: singleJob.available,
        jobType: singleJob.jobType ? singleJob.jobType._id : "",
      });
    }
  }, [singleJob]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: EDIT_JOB_RESET });
        navigate("/admin/jobs");
      }, 800);
    }
  }, [success, dispatch, navigate]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.title) errors.title = "Title is required";
    if (!formValues.description) errors.description = "Description is required";
    if (!formValues.salary) errors.salary = "Salary is required";
    if (!formValues.location) errors.location = "Location is required";
    if (!formValues.available) errors.available = "Availability is required";
    if (!formValues.jobType) errors.jobType = "Job type is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(editSingleJobAction(formValues));
    }
  };

  return (
    <div style={baseStyles.formContainer}>
      <form onSubmit={handleSubmit} style={dynamicStyles.formStyle}>
        <h2
          style={{
            ...baseStyles.formTitle,
            textAlign: "center",
            width: "100%",
          }}
        >
          Edit Job
        </h2>

        <div style={{ width: "100%" }}>
          <label
            htmlFor="title"
            style={{
              fontWeight: "bold",
              marginBottom: "0.5rem",
              display: "block",
              textAlign: "left",
            }}
          >
            Title:
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            style={baseStyles.formField}
            value={formValues.title}
            onChange={handleChange}
          />
          {formErrors.title && (
            <div style={baseStyles.errorText}>{formErrors.title}</div>
          )}

          <label
            htmlFor="description"
            style={{
              fontWeight: "bold",
              marginBottom: "0.5rem",
              display: "block",
              textAlign: "left",
            }}
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            style={{ ...baseStyles.formField, height: "150px" }}
            value={formValues.description}
            onChange={handleChange}
          />
          {formErrors.description && (
            <div style={baseStyles.errorText}>{formErrors.description}</div>
          )}

          <label
            htmlFor="salary"
            style={{
              fontWeight: "bold",
              marginBottom: "0.5rem",
              display: "block",
              textAlign: "left",
            }}
          >
            Salary:
          </label>
          <input
            id="salary"
            type="text"
            name="salary"
            placeholder="Salary"
            style={baseStyles.formField}
            value={formValues.salary}
            onChange={handleChange}
          />
          {formErrors.salary && (
            <div style={baseStyles.errorText}>{formErrors.salary}</div>
          )}

          <label
            htmlFor="location"
            style={{
              fontWeight: "bold",
              marginBottom: "0.5rem",
              display: "block",
              textAlign: "left",
            }}
          >
            Location:
          </label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Location"
            style={baseStyles.formField}
            value={formValues.location}
            onChange={handleChange}
          />
          {formErrors.location && (
            <div style={baseStyles.errorText}>{formErrors.location}</div>
          )}

          <label
            htmlFor="available"
            style={{
              fontWeight: "bold",
              marginBottom: "0.5rem",
              display: "block",
              textAlign: "left",
            }}
          >
            Available:
          </label>
          <input
            id="available"
            type="text"
            name="available"
            placeholder="Available (true/false)"
            style={baseStyles.formField}
            value={formValues.available}
            onChange={handleChange}
          />
          {formErrors.available && (
            <div style={baseStyles.errorText}>{formErrors.available}</div>
          )}

          <label
            htmlFor="jobType"
            style={{
              fontWeight: "bold",
              marginBottom: "0.5rem",
              display: "block",
              textAlign: "left",
            }}
          >
            Job Type:
          </label>
          <select
            id="jobType"
            name="jobType"
            style={baseStyles.formField}
            value={formValues.jobType}
            onChange={handleChange}
          >
            <option value="">Select Job Type</option>
            {jobType &&
              jobType.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.jobTypeName}
                </option>
              ))}
          </select>
          {formErrors.jobType && (
            <div style={baseStyles.errorText}>{formErrors.jobType}</div>
          )}
        </div>

        <button
          type="submit"
          style={{ ...baseStyles.formButton, marginTop: "2rem" }}
        >
          Edit Job
        </button>
      </form>
    </div>
  );
};

export default DashEditJob;
