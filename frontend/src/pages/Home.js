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
import "../styles/Home.css";

const Home = () => {
  const { jobs, setUniqueLocation, pages, loading } = useSelector(
    (state) => state.loadJobs
  );
  const dispatch = useDispatch();
  const { keyword, location } = useParams();

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

  // Custom colors
  const bgColor = "#fafafa"; // Light background color
  const cardBgColor = "#fff"; // White card background
  const headingColor = "#333"; // Dark text color for headings
  const primaryColor = "#1976d2"; // Blue color for links
  const noResultColor = "#333"; // Dark color for "No result found" message

  return (
    <div className="home-container" style={{ backgroundColor: bgColor }}>
      <Navbar />
      <Header />

      <div className="main-content">
        <div
          className="filter-section"
          style={{ transition: "transform 0.3s ease" }}
          onMouseEnter={(e) => {e.target.style = "scale(1.02)"}}
          onMouseLeave={(e) => {e.target.style.transform = "scale(1)"; 
          }}
        >
          {/* Category Filter */}
          <div className="filter-card" style={{ backgroundColor: cardBgColor }}>
            <h4 className="filter-heading" style={{ color: headingColor }}>
              Filter job by category
            </h4>
            <SelectComponent
              handleChangeCategory={handleChangeCategory}
              cat={cat}
            />
          </div>

          {/* Location Filter */}
          <div className="filter-card" style={{ backgroundColor: cardBgColor }}>
            <h4 className="filter-heading" style={{ color: headingColor }}>
              Filter job by location
            </h4>
            <ul className="location-list">
              {setUniqueLocation &&
                setUniqueLocation.map((location, i) => (
                  <li key={i}>
                    <LocationOnIcon className="location-icon" />
                    <Link
                      to={`/search/location/${location}`}
                      style={{ color: primaryColor }}
                    >
                      {location}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="jobs-section">
          {loading ? (
            <LoadingBox />
          ) : jobs && jobs.length === 0 ? (
            <div className="no-result">
              <h2 style={{ color: noResultColor }}>No result found!</h2>
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
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <span>{page}</span>
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

// import React, { useEffect, useState } from 'react';
// import Navbar from '../component/Navbar';
// import Header from '../component/Header';
// import Footer from '../component/Footer';
// import CardElement from '../component/CardElement';
// import LoadingBox from '../component/LoadingBox';
// import SelectComponent from '../component/SelectComponent';
// import { jobLoadAction } from '../redux/actions/jobAction';
// import { jobTypeLoadAction } from '../redux/actions/jobTypeAction';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
// import LocationOnIcon from '@mui/icons-material/LocationOn'; // You can create your own icon or SVG if needed
// import '../styles/Home.css'; // Import your custom CSS

// const Home = () => {
//     const { jobs, setUniqueLocation, pages, loading } = useSelector(state => state.loadJobs);
//     const dispatch = useDispatch();
//     const { keyword, location } = useParams();

//     const [page, setPage] = useState(1);
//     const [cat, setCat] = useState('');

//     useEffect(() => {
//         dispatch(jobLoadAction(page, keyword, cat, location));
//     }, [page, keyword, cat, location]);

//     useEffect(() => {
//         dispatch(jobTypeLoadAction());
//     }, []);

//     const handleChangeCategory = (e) => {
//         setCat(e.target.value);
//     };

//     return (
//         <div className="home-container">
//             <Navbar />
//             <Header />

//             <div className="main-content">
//                 <div className="filter-section">
//                     {/* Category Filter */}
//                     <div className="filter-card">
//                         <h4 className="filter-heading">Filter job by category</h4>
//                         <SelectComponent handleChangeCategory={handleChangeCategory} cat={cat} />
//                     </div>

//                     {/* Location Filter */}
//                     <div className="filter-card">
//                         <h4 className="filter-heading">Filter job by location</h4>
//                         <ul className="location-list">
//                             {setUniqueLocation && setUniqueLocation.map((location, i) => (
//                                 <li key={i}>
//                                     <LocationOnIcon className="location-icon" />
//                                     <Link to={`/search/location/${location}`}>{location}</Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>

//                 <div className="jobs-section">
//                     {loading ? (
//                         <LoadingBox />
//                     ) : jobs && jobs.length === 0 ? (
//                         <div className="no-result">
//                             <h2>No result found!</h2>
//                         </div>
//                     ) : (
//                         jobs && jobs.map((job, i) => (
//                             <CardElement
//                                 key={i}
//                                 id={job._id}
//                                 jobTitle={job.title}
//                                 description={job.description}
//                                 category={job.jobType ? job.jobType.jobTypeName : "No category"}
//                                 location={job.location}
//                             />
//                         ))
//                     )}
//                     <div className="pagination">
//                         {/* Add your custom pagination logic here */}
//                         {/* Example pagination component */}
//                         <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
//                         <span>{page}</span>
//                         <button onClick={() => setPage(page + 1)}>Next</button>
//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// };

// export default Home;
