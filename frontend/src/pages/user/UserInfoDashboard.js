import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import UploadResume from "../../component/UploadResume";
import {
  userProfileAction,
  userUploadResumeAction,
} from "../../redux/actions/userAction";
import ResumeViewer from "../../component/ResumeViewer";

const UserInfoDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userProfile);
  const theme = useTheme();
  const navigate = useNavigate();

  const [showViewer, setShowViewer] = useState(false);
  const [resumePath, setResumePath] = useState(null); // Local state for the resume path

  const baseURL = "https://opportunet-8gnv.onrender.com";

  useEffect(() => {
    dispatch(userProfileAction()); // Fetch user data on component load
  }, [dispatch]);

  useEffect(() => {
    if (user?.resume) {
      // Set the initial resume path when user data is loaded
      // setResumePath(`${baseURL}/${user.resume.replace(/\\/g, '/')}`);
      const normalizedResumePath = user.resume.replace(/\\/g, "/");
      setResumePath(`${baseURL}${normalizedResumePath}`);
    }
  }, [user?.resume]);

  const handleEditClick = () => {
    if (user && user._id) {
      navigate(`/user/edit/${user._id}`);
    }
  };

  const handleResumeUpload = async (resumeFile) => {
    const result = await dispatch(userUploadResumeAction(user._id, resumeFile));
    if (result && result.resume) {
        const updatedResumePath = `${baseURL}${result.resume.replace(/\\/g, '/')}`;
        setResumePath(updatedResumePath); // Update state with the new path
    }
  };

  const openResumeViewer = () => setShowViewer(true);

  const closeResumeViewer = () => setShowViewer(false);

  return (
    <div>
      <h3
        style={{
          
          fontWeight: "600",
          color: "#219ff2",
          marginBottom: "15px",
          textAlign: "left",
          marginTop: "20px",
          marginLeft: "0px",
        }}
      >
        My Profile
      </h3>

      <div
        style={{
          fontSize: "16px",
          backgroundColor:
            theme.palette.mode === "dark" ? "#3C3D37" : "#ffffff",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "left",
        }}
      >
        <div style={{ marginBottom: "12px" }}>
          <strong>First Name:</strong> <span>{user?.firstName}</span>
        </div>
        <div style={{ marginBottom: "12px" }}>
          <strong>Last Name:</strong> <span>{user?.lastName}</span>
        </div>
        <div style={{ marginBottom: "12px" }}>
          <strong>Email:</strong> <span>{user?.email}</span>
        </div>
        <div style={{ marginBottom: "12px" }}>
          <strong>Status:</strong>{" "}
          <span
            style={{
              color: user?.role === 0 ? "#FF5722" : "#4CAF50",
              fontWeight: "600",
            }}
          >
            {user?.role === 0 ? "Regular User" : "Admin"}
          </span>
        </div>
        <div style={{ marginBottom: "12px" }}>
          <strong>Education:</strong> <span>{user?.education}</span>
        </div>
        <div style={{ marginBottom: "12px" }}>
          <strong>Percentage:</strong> <span>{user?.percentage}</span>
        </div>
        <div style={{ marginBottom: "12px" }}>
          <strong>Address:</strong> <span>{user?.address}</span>
        </div>
        <div style={{ marginBottom: "12px" }}>
          <strong>Phone no.:</strong> <span>{user?.phone}</span>
        </div>

        {resumePath && (
          <div style={{ marginBottom: "12px" }}>
            <strong>Resume:</strong>{" "}
            <a
              onClick={openResumeViewer}
              style={{
                color: "#007BFF",
                textDecoration: "underline",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              View Resume
            </a>
          </div>
        )}

        {user && (
          <UploadResume userId={user._id} onResumeUpload={handleResumeUpload} />
        )}

        <div style={{ marginTop: "20px" }}>
          <button
            style={{
              backgroundColor: theme.palette.primary.main,
              color: "#ffffff",
              padding: "8px 20px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "14px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s ease, background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.palette.primary.dark;
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = theme.palette.primary.main;
              e.target.style.transform = "scale(1)";
            }}
            onClick={handleEditClick}
          >
            Edit Information
          </button>
        </div>
      </div>

      {showViewer && (
        <ResumeViewer resumePath={resumePath} onClose={closeResumeViewer} />
      )}
    </div>
  );
};

export default UserInfoDashboard;
