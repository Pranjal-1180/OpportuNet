
import React from "react";
import { useTheme } from "@mui/material/styles";
const StatComponent = ({ value, icon, description, money }) => {
  const theme = useTheme();
  return (
    <div
      style={{
        backgroundColor: theme.palette.mode==="dark"?"black":"#ffffff",
        width: "100%",
        maxWidth: "500px",
        height: "200px", 
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        margin: "0 auto", 
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
          backgroundColor: "#f0f0f0",
          padding: "12px",
          borderRadius: "50%",
        }}
      >
        <span style={{ fontSize: "24px", color: "#34495e" }}>{icon}</span>
      </div>
      <h4 style={{ color: "#2c3e50", marginBottom: "4px", fontWeight: "700" }}>
        {money !== "" ? money + value : value}
      </h4>
      <p style={{ color: "#7f8c8d", marginBottom: "0" }}>{description}</p>
    </div>
  );
};

export default StatComponent;

