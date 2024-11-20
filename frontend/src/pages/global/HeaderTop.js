import React from "react";
import { FaBars, FaSearch } from "react-icons/fa"; // Using Font Awesome for icons

const HeaderTop = ({ onSidebarToggle }) => {
  return (
    <div
      style={{
        flexGrow: 1,
        backgroundColor: "#7E60BF",
        padding: "10px 0",
        color: "white",
        position: "fixed",
        width: "100%", 
        zIndex: 1000, 
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", padding: "0 16px" }}>
        <button
          onClick={onSidebarToggle}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "24px",
            cursor: "pointer",
            marginRight: "16px",
          }}
        >
          <FaBars />
        </button>
        <h1 style={{ flexGrow: 1, fontSize: "24px", margin: 0 }}>OpportuNet</h1>
       
      </div>
    </div>
  );
};

export default HeaderTop;
