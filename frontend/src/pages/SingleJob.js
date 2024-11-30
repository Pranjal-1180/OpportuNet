
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import Footer from "../component/Footer";
import LoadingBox from "../component/LoadingBox";
import Navbar from "../component/Navbar";
import { jobLoadSingleAction, fetchJobApplicants } from "../redux/actions/jobAction";
import { userApplyJobAction } from "../redux/actions/userAction";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const SingleJob = () => {
  const dispatch = useDispatch();
  const { singleJob, loading } = useSelector((state) => state.singleJob);
  const { users: applicants, loading: applicantsLoading } = useSelector((state) => state.allUsers);
  const { userInfo } = useSelector((state) => state.signIn);
  const { id } = useParams();
  const theme = useTheme();
  const location = useLocation();
  const fromDashJobs = location.state?.fromDashJobs || false;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(jobLoadSingleAction(id));
    if (userInfo?.role === 1) { // Fetch applicants only if the user is an admin
      dispatch(fetchJobApplicants(id));
    }
  }, [dispatch, id, userInfo]);

  const applyForAJob = () => {
    if (!userInfo) {
      alert("You must be logged in to apply for this job.");
      navigate("/login");
      return;
    }
    if (!singleJob) {
      console.error("No job data available to apply for.");
      return;
    }
    const jobToApply = {
      jobId: singleJob._id,
      title: singleJob.title,
      description: singleJob.description,
      salary: singleJob.salary,
      location: singleJob.location,
    };
    dispatch(userApplyJobAction(jobToApply));
  };

  const bgColor = theme.palette.mode === "light" ? "#fafafa" : "#303030";
  const borderColor = theme.palette.mode === "light" ? "#ccc" : "#555";
  const buttonBgColor = theme.palette.primary.main;
  const buttonTextColor = theme.palette.getContrastText(buttonBgColor);
  const textColor = theme.palette.mode === "light" ? "#000" : "#ddd";
  const cardBgColor = theme.palette.background.paper;

  return (
    <div style={{ backgroundColor: bgColor, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flex: 1, padding: "30px", display: "flex", gap: "30px", justifyContent: "center" }}>
        {loading ? (
          <LoadingBox />
        ) : (
          <>
            {/* Main job details section */}
            <div style={{ flex: 3, padding: "20px", backgroundColor: cardBgColor, borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
              <h3 style={{ color: textColor, fontSize: "1.8rem", marginBottom: "15px" }}>{singleJob?.title}</h3>
              <p style={{ color: textColor, fontSize: "1.1rem" }}>
                <strong>Salary:</strong> ${singleJob?.salary}
              </p>
              <p style={{ color: textColor, fontSize: "1.1rem" }}>
                <strong>Category:</strong> {singleJob?.jobType?.jobTypeName || "No category"}
              </p>
              <p style={{ color: textColor, fontSize: "1.1rem" }}>
                <strong>Location:</strong> {singleJob?.location}
              </p>
              <p style={{ color: textColor, fontSize: "1.2rem", marginTop: "15px" }}>
                {singleJob?.description}
              </p>
              
              {!fromDashJobs && userInfo?.role === 0 && (
                <button
                  onClick={applyForAJob}
                  style={{
                    fontSize: "14px",
                    padding: "12px 25px",
                    backgroundColor: buttonBgColor,
                    color: buttonTextColor,
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "20px",
                    transition: "background-color 0.3s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#3578e5")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = buttonBgColor)}
                >
                  Apply for this Job
                </button>
              )}
            </div>

            {/* Applicants card section */}
            {userInfo?.role === 1 && (
              <div style={{ flex: 1, padding: "20px", borderLeft: `1px solid ${borderColor}`, backgroundColor: cardBgColor, borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                <h4 style={{ color: textColor, marginBottom: "20px", fontSize: "1.5rem" }}>Applicants</h4>
                {applicantsLoading ? (
                  <LoadingBox />
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    {applicants.length > 0 ? (
                      applicants.map((applicant) => (
                        <div
                          key={applicant._id}
                          style={{
                            padding: "15px",
                            borderRadius: "8px",
                            backgroundColor: cardBgColor,
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.03)";
                            e.currentTarget.style.boxShadow = "0px 6px 12px rgba(0, 0, 0, 0.15)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
                          }}
                        >
                          <Link
                            to={`/admin/user/profile/${applicant._id}`}
                            style={{ textDecoration: "none", color: theme.palette.primary.main }}
                          >
                            <h5 style={{ margin: 0, fontSize: "1.1rem" }}>
                              {applicant.firstName} {applicant.lastName}
                            </h5>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: textColor }}>No applicants yet.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <Footer style={{ marginTop: "auto" }} /> {/* This ensures the footer sticks to the bottom */}
    </div>
  );
};

export default SingleJob;



