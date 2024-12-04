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
        width: isCollapsed ? "120px" : "160px",
        backgroundColor: theme.palette.mode === "dark" ? "black" : "#7E60BF",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "hidden", 
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
              width: isCollapsed ? "60px" : "80px",
              height: isCollapsed ? "60px" : "80px",
              textAlign: "center",
              borderRadius: "50%",
              transition: "all ease-out .5s",
            }}
            src={logoDashboard}
            alt="logo dashboard"
          />
        </div>

        <ul
          style={{
            listStyle: "none",
            paddingLeft: isCollapsed ? "8px" : "27px",
          }}
        >
          {userInfo && userInfo.role === 1 ? (
            <>
              <li
                style={{
                  padding: "10px",
                  color: "#fafafa",
                  fontSize: isCollapsed ? "12px" : "16px",
                }}
              >
                <Link
                  to="/admin/dashboard"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i
                    className="fa-solid fa-table-columns"
                    style={{ fontSize: isCollapsed ? "14px" : "18px" }}
                  ></i>{" "}
                  Dashboard
                </Link>
              </li>
              <li
                style={{
                  padding: "10px",
                  color: "#fafafa",
                  fontSize: isCollapsed ? "12px" : "16px",
                }}
              >
                <Link
                  to="/admin/users"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i
                    className="fas fa-users"
                    style={{ fontSize: isCollapsed ? "14px" : "18px" }}
                  ></i>{" "}
                  Users
                </Link>
              </li>
              <li
                style={{
                  padding: "10px",
                  color: "#fafafa",
                  fontSize: isCollapsed ? "12px" : "16px",
                }}
              >
                <Link
                  to="/admin/jobs"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i
                    className="fas fa-briefcase"
                    style={{ fontSize: isCollapsed ? "14px" : "18px" }}
                  ></i>{" "}
                  Jobs
                </Link>
              </li>
              <li
                style={{
                  padding: "10px",
                  color: "#fafafa",
                  fontSize: isCollapsed ? "12px" : "16px",
                }}
              >
                <Link
                  to="/admin/category"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i
                    className="fas fa-list-alt"
                    style={{ fontSize: isCollapsed ? "14px" : "18px" }}
                  ></i>{" "}
                  Category
                </Link>
              </li>
            </>
          ) : (
            <>
              <li
                style={{
                  padding: "10px",
                  color: "#fafafa",
                  fontSize: isCollapsed ? "12px" : "16px",
                }}
              >
                <Link
                  to="/user/dashboard"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i
                    className="fa-solid fa-table-columns"
                    style={{ fontSize: isCollapsed ? "14px" : "18px" }}
                  ></i>{" "}
                  Dashboard
                </Link>
              </li>
              <li
                style={{
                  padding: "10px",
                  color: "#fafafa",
                  fontSize: isCollapsed ? "12px" : "16px",
                }}
              >
                <Link
                  to="/alljobs"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i
                    className="fas fa-briefcase"
                    style={{ fontSize: isCollapsed ? "14px" : "18px" }}
                  ></i>{" "}
                  All Jobs
                </Link>
              </li>
              <li
                style={{
                  padding: "10px",
                  color: "#fafafa",
                  fontSize: isCollapsed ? "12px" : "16px",
                }}
              >
                <Link
                  to="/user/jobs"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i
                    className="fas fa-history"
                    style={{ fontSize: isCollapsed ? "14px" : "18px" }}
                  ></i>{" "}
                  Applied Jobs
                </Link>
              </li>
              <li
                style={{
                  padding: "10px",
                  color: "#fafafa",
                  fontSize: isCollapsed ? "12px" : "16px",
                }}
              >
                <Link
                  to="/user/info"
                  style={{ color: "#fafafa", textDecoration: "none" }}
                >
                  <i
                    className="fas fa-user"
                    style={{ fontSize: isCollapsed ? "14px" : "18px" }}
                  ></i>{" "}
                  Personal Info
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div style={{ paddingBottom: "20px" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: "10px", color: "#fafafa",fontSize: isCollapsed ? "12px" : "16px", }}>
            <span
              onClick={logOut}
              style={{ cursor: "pointer", color: "#fafafa" }}
            >
              <i className="fas fa-sign-out-alt" style={{ fontSize: isCollapsed ? "14px" : "18px" }}></i> Log out
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarAdm;
