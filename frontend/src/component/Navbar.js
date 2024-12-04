import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogoutAction } from "../redux/actions/userAction";
import { toggleActionTheme } from '../redux/actions/themeAction';
import { DarkMode, LightMode, Person, Work } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import logoDashboard from "../images/job_16664310.gif";
const Navbar = () => {
  const { mode } = useSelector((state) => state.mode);
  const { userInfo } = useSelector((state) => state.signIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(false);

  const handleOpenNavMenu = () => {
    setAnchorElNav(!anchorElNav);
  };

  const handleOpenUserMenu = () => {
    setAnchorElUser(!anchorElUser);
  };

  const logOutUser = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const toggleTheme = () => {
    dispatch(toggleActionTheme());
  };

  return (
    <header
      style={{
        position: "fixed",
        backgroundColor: mode === "light" ? "#7E60BF" : "#333",
        padding: "8px 14px",
        display: "flex",
         width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        zIndex: 1000,
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", alignItems: "center",gap:"10px" }}>
      <img
            style={{
             width:"30px",
              textAlign: "center",
              borderRadius: "50%",
              transition: "all ease-out .5s",
              
            }}
            src={logoDashboard}
            alt="logo dashboard"
          />
        <h1 style={{ fontSize: "19px", fontWeight: "bold", margin: 0 }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            OpportuNet
          </Link>
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={toggleTheme} style={{ color: "white" }}>
          {mode === "light" ? <LightMode />:<DarkMode /> }
        </IconButton>

        <IconButton onClick={handleOpenUserMenu} style={{ color: "white", marginLeft: "10px" }}>
          <Person />
        </IconButton>

        <div
          style={{
            display: anchorElUser ? "block" : "none",
            backgroundColor: "white",
            position: "absolute",
            top: "50px",
            right: "50px",
            padding: "10px",
            borderRadius: "8px",
            
          }}
        >

          {!userInfo ? (
            <>
              <div style={{ padding: "10px 0"}}>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  Log In
                </Link>
              </div>
              <div style={{ padding: "10px 0" }}>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  Sign Up
                </Link>
              </div>
            </>
          ) : (
            <div
              style={{ padding: "10px 0", cursor: "pointer" }}
              onClick={logOutUser}
            >
              <span style={{ textDecoration: "none", color: "#1976d2" }}>
                Log Out
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;


