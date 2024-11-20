
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
    <div style={{ backgroundColor: bgColor }}>
      <Navbar />
      <div style={{ height: "85vh", padding: "30px", display: "flex", gap: "20px" }}>
        {loading ? (
          <LoadingBox />
        ) : (
          <>
            {/* Main job details section */}
            <div style={{ flex: 3, padding: "20px" }}>
              <div style={{ border: `1px solid ${borderColor}`, padding: "20px" }}>
                <h3 style={{ color: textColor }}>{singleJob && singleJob.title}</h3>
                <p style={{ color: textColor }}>
                  <strong>Salary:</strong> ${singleJob && singleJob.salary}
                </p>
                <p style={{ color: textColor }}>
                  <strong>Category:</strong> {singleJob?.jobType?.jobTypeName || "No category"}
                </p>
                <p style={{ color: textColor }}>
                  <strong>Location:</strong> {singleJob && singleJob.location}
                </p>
                <p style={{ color: textColor }}>{singleJob && singleJob.description}</p>
                
                {!fromDashJobs && (
                  <button
                    onClick={applyForAJob}
                    style={{
                      fontSize: "13px",
                      padding: "10px",
                      backgroundColor: buttonBgColor,
                      color: buttonTextColor,
                      border: "none",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                  >
                    Apply for this Job
                  </button>
                )}
              </div>
            </div>

            {/* Applicants card section */}
            {userInfo?.role === 1 && (
              <div style={{ flex: 1, padding: "20px", borderLeft: `1px solid ${borderColor}` }}>
                <h4 style={{ color: textColor, marginBottom: "10px" }}>Applicants</h4>
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
                            transition: "transform 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        >
                          <Link
                            to={`/admin/user/profile/${applicant._id}`}
                            style={{ textDecoration: "none", color: theme.palette.primary.main }}
                          >
                            <h5 style={{ margin: 0, fontSize: "1rem" }}>
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
      <Footer />
    </div>
  );
};

export default SingleJob;