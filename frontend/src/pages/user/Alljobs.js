import React, { useEffect, useState } from "react";
import Navbar from '../../component/Navbar';
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
  const bgColor = theme.palette.mode === "light" ? "#fafafa" : "#303030";
  const cardBgColor = theme.palette.mode === "light" ? "#fff" : "#424242";
  const headingColor = theme.palette.mode === "light" ? "#333" : "#ddd";

  return (
    <div style={{ backgroundColor: bgColor }}>
      {/* <Navbar /> */}

      <div style={{ padding: '20px' }}> {/* Add padding or styles directly here */}
        <h2 style={{ color: headingColor }}>All Job Listings</h2>
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
                style={{ backgroundColor: cardBgColor }} // Use a different background for cards
              />
            ))
          )}
        </div>
        <div style={{ marginTop: '20px' }}> {/* Add margin for pagination */}
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>{page}</span>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllJobs;

