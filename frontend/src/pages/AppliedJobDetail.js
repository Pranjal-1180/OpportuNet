import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../component/Footer";
import LoadingBox from "../component/LoadingBox";
import { jobLoadSingleAction } from "../redux/actions/jobAction";
import { useTheme } from "@mui/material/styles";

const AppliedJobDetail = () => {
  const dispatch = useDispatch();
  const { singleJob, loading } = useSelector((state) => state.singleJob);
  const { id } = useParams();
  const theme = useTheme(); 

  useEffect(() => {
    dispatch(jobLoadSingleAction(id));
  }, [id]);

  // Dynamic styles based on theme mode
  const bgColor = theme.palette.mode === "light" ? "#fafafa" : "#303030";
  const borderColor = theme.palette.mode === "light" ? "#ccc" : "#555";
  const textColor = theme.palette.mode === "light" ? "#000" : "#ddd";

  return (
    <div style={{ backgroundColor: bgColor }}>
      {/* <Navbar /> */}
      <div style={{ height: "85vh", padding: "20px" }}>
        {loading ? (
          <LoadingBox />
        ) : (
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <div style={{ flex: 4, padding: "20px" }}>
             
                <h3 style={{ color: textColor }}>
                  {singleJob && singleJob.title}
                </h3>
                <p style={{ color: textColor }}>
                  <strong>Salary:</strong> ${singleJob && singleJob.salary}
                </p>
                <p style={{ color: textColor }}>
                  <strong>Category:</strong>{" "}
                  {singleJob && singleJob.jobType
                    ? singleJob.jobType.jobTypeName
                    : "No category"}
                </p>
                <p style={{ color: textColor }}>
                  <strong>Location:</strong> {singleJob && singleJob.location}
                </p>
                <p style={{ color: textColor }}>
                  {singleJob && singleJob.description}
                </p>
              </div>
            </div>
        )}
      </div>
      {/* <Footer /> */}
     
    </div>
  );
};

export default AppliedJobDetail;
