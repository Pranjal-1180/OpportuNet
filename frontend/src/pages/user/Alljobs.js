import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import CardElement from "../../component/CardElement";
import LoadingBox from "../../component/LoadingBox";
import { jobLoadAction } from "../../redux/actions/jobAction";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
const AllJobs = () => {
  const { jobs, loading } = useSelector((state) => state.loadJobs);
  const dispatch = useDispatch();
  const theme = useTheme(); // Get the theme palette

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(jobLoadAction(page));
  }, [page]);

  // Apply conditional theme-based styles
  const bgColor = theme.palette.mode === "light" ? "#edeff0" : "#303030";
  const cardBgColor = theme.palette.mode === "light" ? "#fff" : "#424242";
  const headingColor = theme.palette.mode === "light" ? "#219ff2" : "#ddd";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: bgColor,
      }}
    >
      <div style={{ flex: "1" }}>
        <h2 style={{ color: headingColor, marginTop:"20px",marginLeft:"0px",fontSize: "26px", }}>All Job Listings</h2>
        <div>
          {loading ? (
            <LoadingBox />
          ) : jobs && jobs.length === 0 ? (
            <div>
              <h2 style={{ color: headingColor }}>No jobs available!</h2>
            </div>
          ) : (
            jobs.map((job, i) => (
              <CardElement
                key={i}
                id={job._id}
                jobTitle={job.title}
                description={job.description}
                category={job.jobType ? job.jobType.jobTypeName : "No category"}
                location={job.location}
                style={{ backgroundColor: cardBgColor }}
              />
            ))
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              padding: "10px 20px",
              margin: "0 5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: page === 1 ? "#f5f5f5" : "#007bff",
              color: page === 1 ? "#888" : "#fff",
              cursor: page === 1 ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
            }}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span
            style={{
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              margin: "0 10px",
            }}
          >
            {page}
          </span>
          <button
            style={{
              padding: "10px 20px",
              margin: "0 5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AllJobs;
