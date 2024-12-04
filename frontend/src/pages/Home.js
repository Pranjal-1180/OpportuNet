
import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
import Footer from "../component/Footer";
import CardElement from "../component/CardElement";
import LoadingBox from "../component/LoadingBox";
import SelectComponent from "../component/SelectComponent";
import { jobLoadAction } from "../redux/actions/jobAction";
import { jobTypeLoadAction } from "../redux/actions/jobTypeAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTheme } from "@mui/material/styles";
import "../styles/Home.css";

const Home = () => {
  const { jobs, setUniqueLocation, pages, loading } = useSelector(
    (state) => state.loadJobs
  );
  const dispatch = useDispatch();
  const { keyword, location } = useParams();
  const theme = useTheme(); // Access the Material UI theme

  const [page, setPage] = useState(1);
  const [cat, setCat] = useState("");

  useEffect(() => {
    dispatch(jobLoadAction(page, keyword, cat, location));
  }, [page, keyword, cat, location]);

  useEffect(() => {
    dispatch(jobTypeLoadAction());
  }, []);

  const handleChangeCategory = (e) => {
    setCat(e.target.value);
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundColor: theme.palette.background.default, // Use theme color
      }}
    >
      <Navbar />
      <Header />

      <div className="main-content">
        {/* Filters Section */}
        <div className="filter-section">
          {/* Category Filter */}
          <div
            className="filter-card"
            style={{
              backgroundColor: theme.palette.background.paper, // Card background
              color:  theme.palette.mode === "dark" ? "white" : theme.palette.text.primary, // Text color
              padding: "16px",
            }}
          >
            <h4 style={{
              color: theme.palette.text.primary, fontSize: "16px", marginBottom: "8px", 
            }}className="filter-heading">Filter job by category</h4>
            <SelectComponent
              handleChangeCategory={handleChangeCategory}
              cat={cat}
            />
          </div>

          {/* Location Filter */}
          <div
            className="filter-card"
            style={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              padding: "16px", 
            }}
          >
            <h4 style={{
              color: theme.palette.text.primary,fontSize: "16px", marginBottom: "8px",
            }} className="filter-heading">Filter job by location</h4>
            <ul className="location-list">
              {setUniqueLocation &&
                setUniqueLocation.map((location, i) => (
                  <li key={i} style={{ marginBottom: "8px" }}>
                    <LocationOnIcon
                      className="location-icon"
                      style={{ color:theme.palette.mode === "dark"? "#2196f3":theme.palette.primary.main,fontSize: "18px", marginRight: "6px",}}
                    />
                    <Link
                      to={`/search/location/${location}`}
                      style={{ color:theme.palette.mode === "dark"? "#2196f3":theme.palette.primary.main,fontSize: "14px",  }}
                    >
                      {location}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="jobs-section">
          {loading ? (
            <LoadingBox />
          ) : jobs && jobs.length === 0 ? (
            <div
              className="no-result"
              style={{ color: theme.palette.text.secondary }}
            >
              <h2>No result found!</h2>
            </div>
          ) : (
            jobs &&
            jobs.map((job, i) => (
              <CardElement
                key={i}
                id={job._id}
                jobTitle={job.title}
                description={job.description}
                category={job.jobType ? job.jobType.jobTypeName : "No category"}
                location={job.location}
              />
            ))
          )}
          {/* Pagination */}
          <div className="pagination">
            <button
              className="pagination-button"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            >
              Previous
            </button>
            <span style={{ color: theme.palette.text.primary }}>{page}</span>
            <button
              className="pagination-button"
              onClick={() => setPage(page + 1)}
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
