
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  userLogoutAction,
  userProfileAction,
} from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import logoDashboard from "../../images/job_16664310.gif";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useTheme } from "@mui/material/styles";
const SidebarAdm = ({ isCollapsed }) => {
  const { userInfo } = useSelector((state) => state.signIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    dispatch(userProfileAction());
  }, []);

  // Log out
  const logOut = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div
      style={{
        width: isCollapsed ? "150px" : "250px",
        backgroundColor:theme.palette.mode==="dark"?"black":"#7E60BF",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "fixed", 
        top: 0, 
        left: 0, 
        overflowY: "hidden", // Prevent scrolling inside the sidebar
        zIndex: 2000,
        transition: "width 0.3s ease", 
        
      }}
    >
      <div>
        <div
          style={{
            paddingTop: "20px",
            paddingBottom: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              width: isCollapsed ? "60px" : "100px", // Adjust logo size dynamically
              height: isCollapsed ? "60px" : "100px",
              textAlign: "center",
              borderRadius: "50%",
              transition: "all ease-out .5s",
              
            }}
            src={logoDashboard}
            alt="logo dashboard"
          />
        </div>

        <ul style={{ listStyle: "none", paddingLeft: isCollapsed ? "10px" : "30px" }}>
          {userInfo && userInfo.role === 1 ? (
            <>
              <li style={{ padding: "10px", color: "#fafafa" }}>
                <Link
                  to="/admin/dashboard"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i className="fa-solid fa-table-columns"></i> Dashboard
                </Link>
              </li>
              <li style={{ padding: "10px", color: "#fafafa" }}>
                <Link
                  to="/admin/users"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i className="fas fa-users"></i> Users
                </Link>
              </li>
              <li style={{ padding: "10px", color: "#fafafa" }}>
                <Link
                  to="/admin/jobs"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i className="fas fa-briefcase"></i> Jobs
                </Link>
              </li>
              <li style={{ padding: "10px", color: "#fafafa" }}>
                <Link
                  to="/admin/category"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i className="fas fa-list-alt"></i> Category
                </Link>
              </li>
            </>
          ) : (
            <>
              <li style={{ padding: "10px", color: "#fafafa" }}>
                <Link
                  to="/user/dashboard"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i className="fa-solid fa-table-columns"></i> Dashboard
                </Link>
              </li>
              <li style={{ padding: "10px", color: "#fafafa" }}>
                <Link
                  to="/alljobs" // Add this link for AllJobs
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i className="fas fa-briefcase"></i> All Jobs
                </Link>
              </li>
              <li style={{ padding: "10px", color: "#fafafa" }}>
                <Link
                  to="/user/jobs"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i className="fas fa-history"></i> Applied Jobs
                </Link>
              </li>
              <li style={{ padding: "10px", color: "#fafafa" }}>
                <Link
                  to="/user/info"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i className="fas fa-user"></i> Personal Info
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div style={{ paddingBottom: "20px" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: "10px", color: "#fafafa" }}>
            <span
              onClick={logOut}
              style={{ cursor: "pointer", color: "#fafafa" }}
            >
              <i className="fas fa-sign-out-alt"></i> Log out
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarAdm;
