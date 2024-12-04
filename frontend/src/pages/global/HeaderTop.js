import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaBars } from "react-icons/fa";
import { DarkMode, LightMode } from "@mui/icons-material";
import { toggleActionTheme } from "../../redux/actions/themeAction";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";

const HeaderTop = ({ onSidebarToggle, isSidebarCollapsed }) => {
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const theme = useTheme();

  const toggleTheme = () => {
    dispatch(toggleActionTheme());
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.mode==="light"?"#7e60bf":theme.palette.background.default, 
        padding: "10px 16px",
        color: theme.palette.mode === "light" ? "white" : theme.palette.text.primary,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "50px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: isSidebarCollapsed ? "120px" : "160px",
        transition: "padding-left 0.3s ease",
      }}
    >
      {/* Left Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <button
          onClick={onSidebarToggle}
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            fontSize: "24px",
            cursor: "pointer",
            marginRight: "16px",
          }}
        >
          <FaBars />
        </button>
        <h1 style={{ fontSize: "24px", margin: 0 }}>OpportuNet</h1>
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={toggleTheme}
          style={{
            color: theme.palette.mode === "light" ? "white" : theme.palette.text.primary,
          }}
        >
          {theme.palette.mode === "light" ? <LightMode /> : <DarkMode />}
        </IconButton>
        <Link
          to="/"
          style={{
            color: theme.palette.mode === "light" ? "white" : theme.palette.text.primary,
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: "500",
            transition: "color 0.3s ease",
            marginRight: "16px",
          }}
          onMouseEnter={(e) =>
            (e.target.style.color = theme.palette.secondary.main)
          }
          onMouseLeave={(e) =>
            (e.target.style.color =
              theme.palette.mode === "light" ? "white" : theme.palette.text.primary)
          }
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default HeaderTop;




